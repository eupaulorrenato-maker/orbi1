import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../server.mjs';

const valid = { name: 'Pessoa de Teste', agency: 'Agência Exemplo', email: 'teste@example.com', phone: '(79) 99999-9999', consent: true };
async function fixture(t, options = {}) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'orbi-api-'));
  const server = await createApp({ production: true, leadsDir: directory, ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(directory, { recursive: true, force: true }); });
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (data, extra = {}) => fetch(url + '/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json', ...extra }, body: JSON.stringify(data) });
  return { directory, url, post };
}
test('valid submission is durably recorded without exposing the record', async t => {
  const { directory, post, url } = await fixture(t);
  const response = await post(valid);
  assert.equal(response.status, 201);
  assert.equal((await response.json()).success, true);
  const record = JSON.parse((await readFile(path.join(directory, 'leads.jsonl'), 'utf8')).trim());
  assert.equal(record.email, valid.email);
  assert.equal(record.consent, true);
  assert.ok(record.id && record.createdAt && record.consentVersion);
  assert.equal((await fetch(url + '/.data/leads.jsonl')).status, 404);
});
test('invalid fields and absent consent are rejected without writing leads', async t => {
  const { directory, post } = await fixture(t);
  for (const data of [{ ...valid, consent: false }, { ...valid, email: 'invalid' }, { ...valid, name: 'A' }, { ...valid, phone: '000' }, null]) {
    assert.equal((await post(data)).status, 400);
  }
  await assert.rejects(readFile(path.join(directory, 'leads.jsonl')), { code: 'ENOENT' });
});
test('honeypot submissions are not stored', async t => {
  const { directory, post } = await fixture(t);
  assert.equal((await post({ ...valid, website: 'spam' })).status, 200);
  await assert.rejects(readFile(path.join(directory, 'leads.jsonl')), { code: 'ENOENT' });
});
test('API rejects wrong methods, content types, malformed JSON and cross-origin requests', async t => {
  const { url, post } = await fixture(t);
  assert.equal((await fetch(url + '/api/demo')).status, 405);
  assert.equal((await post(valid, { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await post(valid, { Origin: 'https://other.example' })).status, 403);
  assert.equal((await fetch(url + '/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 400);
});
test('oversized payloads and excessive requests are rejected', async t => {
  const { post } = await fixture(t);
  assert.equal((await post({ ...valid, name: 'a'.repeat(13000) })).status, 413);
  for (let i = 0; i < 9; i++) assert.equal((await post({ website: 'spam' })).status, 200);
  assert.equal((await post(valid)).status, 429);
});
test('storage failure is reported as a failure instead of a fake success', async t => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'orbi-storage-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const file = path.join(directory, 'not-a-directory');
  await writeFile(file, 'test');
  const { post } = await fixture(t, { leadsDir: file });
  assert.equal((await post(valid)).status, 500);
});
test('health check responds successfully', async t => {
  const { url } = await fixture(t);
  const response = await fetch(url + '/api/health');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('presentation routes and downloadable files work in production alongside the landing page', async t => {
  const { url } = await fixture(t);
  const home = await fetch(url + '/');
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Gestão de agências de viagens/);
  for (const route of ['/apresentacao', '/apresentacao/']) {
    const response = await fetch(url + route);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /Apresentação comercial/);
  }
  const pdf = await fetch(url + '/apresentacao/orbi-travel-apresentacao.pdf');
  assert.equal(pdf.status, 200);
  assert.equal(pdf.headers.get('content-type'), 'application/pdf');
  assert.equal((await pdf.text()).slice(0, 5), '%PDF-');
  const pptx = await fetch(url + '/apresentacao/orbi-travel-apresentacao.pptx');
  assert.equal(pptx.status, 200);
  assert.match(pptx.headers.get('content-type'), /presentationml.presentation/);
});
