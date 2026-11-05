import http from 'node:http';
import { appendFile, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';

const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.ttf': 'font/ttf' };
export async function createApp({ production = false, leadsDir = process.env.LEADS_DIR || path.join(root, '.data') } = {}) {
  const vite = production ? null : await (await import('vite')).createServer({ root, server: { middlewareMode: true }, appType: 'spa' });
  const attempts = new Map();
  const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/health' && req.method === 'GET') return json(res, 200, { status: 'ok' });
    if (url.pathname === '/api/demo') {
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Método não permitido.' }); }
      if (!req.headers['content-type']?.includes('application/json')) return json(res, 415, { error: 'Formato inválido.' });
      // Browser requests must originate from this site. Do not trust X-Forwarded-For.
      if (req.headers.origin) {
        try { if (new URL(req.headers.origin).host !== req.headers.host) return json(res, 403, { error: 'Origem não permitida.' }); }
        catch { return json(res, 403, { error: 'Origem não permitida.' }); }
      }
      const now = Date.now();
      for (const [key, entry] of attempts) if (now - entry.since > 600_000) attempts.delete(key);
      const ip = req.socket.remoteAddress;
      const entry = attempts.get(ip) || { since: now, count: 0 };
      if (++entry.count > 10) return json(res, 429, { error: 'Muitas tentativas. Tente novamente em alguns minutos.' });
      attempts.set(ip, entry);
      let raw = '';
      try {
        for await (const chunk of req) {
          raw += chunk.toString('utf8');
          if (Buffer.byteLength(raw) > 12_000) return json(res, 413, { error: 'Solicitação muito grande.' });
        }
        let data;
        try { data = JSON.parse(raw); } catch { return json(res, 400, { error: 'Solicitação inválida.' }); }
        if (!data || typeof data !== 'object' || Array.isArray(data)) return json(res, 400, { error: 'Solicitação inválida.' });
        if (data.website) return json(res, 200, { success: true });
        const clean = key => typeof data[key] === 'string' ? data[key].trim() : '';
        const name = clean('name'), agency = clean('agency'), email = clean('email'), phone = clean('phone');
        if (name.length < 2 || name.length > 120 || agency.length < 2 || agency.length > 160 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+?[\d\s().-]{10,24}$/.test(phone) || phone.replace(/\D/g, '').length < 10 || data.consent !== true) {
          return json(res, 400, { error: 'Confira os campos e autorize o contato sobre a demonstração.' });
        }
        const record = { id: randomUUID(), createdAt: new Date().toISOString(), name, agency, email, phone, consent: true, consentVersion: 'demo-contact-v1' };
        await mkdir(leadsDir, { recursive: true, mode: 0o700 });
        await appendFile(path.join(leadsDir, 'leads.jsonl'), JSON.stringify(record) + '\n', { mode: 0o600 });
        const number = (process.env.DEMO_WHATSAPP || '').replace(/\D/g, '');
        const whatsappUrl = /^\d{12,15}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(`Olá! Sou ${name}, da ${agency}. Quero conhecer o Orbi Travel e solicitar uma demonstração.`)}` : null;
        return json(res, 201, { success: true, whatsappUrl });
      } catch (error) {
        console.error('Falha ao registrar solicitação:', error.code || error.name);
        return json(res, 500, { error: 'Não foi possível registrar agora. Tente novamente.' });
      }
    }
    if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Rota não encontrada.' });
    if (vite) return vite.middlewares(req, res, () => { res.writeHead(404); res.end('Não encontrado'); });
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
    try {
      const dist = path.join(root, 'dist');
      const relative = decodeURIComponent(url.pathname);
      let file = path.resolve(dist, '.' + relative);
      if (!file.startsWith(dist + path.sep) && file !== dist) { res.writeHead(403); return res.end(); }
      if (relative === '/') file = path.join(dist, 'index.html');
      const info = await stat(file);
      if (!info.isFile()) throw new Error('Not a file');
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': file.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : await readFile(file));
    } catch { res.writeHead(404); res.end('Página não encontrada'); }
  });
  server.on('close', () => { vite?.close(); });
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const server = await createApp({ production: process.argv.includes('--production') });
  const port = Number(process.env.PORT || 3000);
  server.listen(port, '0.0.0.0', () => console.log(`Orbi Travel disponível na porta ${port}`));
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => { server.close(); server.closeAllConnections(); });
}
