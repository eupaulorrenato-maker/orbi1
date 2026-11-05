# Orbi Travel

Landing page em português brasileiro, baseada no texto comercial e nas referências visuais do projeto. Paleta verde, areia e dourado; fontes Outfit e Plus Jakarta Sans servidas localmente.

Leitura revisada: descrições com 16–18 px, controles e rótulos ampliados, texto verde-escuro e fundos suaves em verde-claro. A tipografia e o contraste estão concentrados em `src/readability.css`, preservando a composição visual original.

![Prévia da landing page](docs/landing-preview.png)

## Executar

Requer Node.js 22 ou superior (validado com Node.js 24).

```sh
npm ci
npm run dev
```

O servidor usa a porta 3000 por padrão. `PORT` permite selecionar outra porta.

## Produção

```sh
npm ci
npm run build
npm start
```

Publique em uma hospedagem com suporte a Node.js, HTTPS e volume persistente. O mesmo servidor entrega os arquivos de `dist/` e a API do formulário. Publicar somente `dist/` em GitHub Pages ou outra hospedagem estática não disponibiliza a API: nesse caso, configure um backend separado e atualize o destino do formulário.

### Pedidos de demonstração

- `POST /api/demo` valida o pedido e registra nome, agência, WhatsApp, e-mail, data e consentimento em `.data/leads.jsonl`.
- `LEADS_DIR` seleciona outro diretório. Em produção, aponte a variável a um volume persistente privado e mantenha backup e rotina de exclusão de dados.
- Os pedidos **não são enviados automaticamente por e-mail**. A equipe precisa consultar os registros no servidor. O diretório e os registros não são servidos pela API ou pelo site e estão excluídos do Git.
- Opcional: configure `DEMO_WHATSAPP=5579999999999` com o número real da equipe (exemplo fictício). Depois de registrar o pedido, o formulário oferece um link de conversa no WhatsApp. O usuário decide abrir o link; nenhuma mensagem é enviada automaticamente.
- `GET /api/health` verifica a disponibilidade do processo. A gravação dos pedidos é verificada pelos testes da API.
- As variáveis são lidas do ambiente do processo. `.env.example` documenta as opções; arquivos `.env` não são carregados automaticamente. Se usar um arquivo local, execute `node --env-file=.env server.mjs` (ou acrescente `--production` após o nome do script).
- Há validação no servidor, consentimento explícito, limite de tamanho e frequência, campo antispam e verificação de origem. Atrás de proxy, o limite usa o endereço da conexão; configure proteção adicional no provedor conforme o tráfego. A limitação é por processo e reinicia com ele.

O aviso de privacidade descreve o contato deste formulário. Antes de uma operação comercial pública, identifique o responsável pelo atendimento e ajuste os canais de privacidade e a retenção à operação real.

## Interações

- Mapa vetorial do Brasil com limites estaduais, rota pontilhada e marcadores vermelhos. Seis destinos ilustrativos, selecionáveis por clique ou teclado.
- Prévia de viagem com abas Resumo, Reservas e Financeiro; navegação com setas, Home e End.
- Amostras de quatro temas que alteram as cores da prévia interativa.
- FAQ expansível, menu mobile e aviso de privacidade em diálogo acessível.
- Formulário com estados reais de envio, sucesso e erro; sem confirmação fictícia.

Os painéis, nomes, destinos e valores são exemplos visuais, sem conexão ao produto autenticado. Não representam clientes ou resultados reais.

## Verificações

```sh
npm run build
npm test
```

Os sete testes da API exercitam gravação real em diretório temporário, consentimento e campos inválidos, antispam, métodos e formatos, origem, tamanho, frequência, falha de armazenamento e health check.

Verificação visual e funcional com Chromium: larguras de 320, 375, 390, 700, 768, 950, 1024, 1280, 1440 e 1920 pixels, sem rolagem horizontal. Mapa, abas, diálogo de privacidade e menu mobile foram reconferidos após a revisão de legibilidade. Os textos principais medidos nas seções claras apresentam contraste superior a 6:1. O formulário e os demais controles foram validados na implementação inicial; nenhum erro JavaScript foi observado.

## Estrutura

```text
src/main.js          Conteúdo e interações
src/style.css        Layout e responsividade
src/readability.css  Escala de leitura, contraste e ajustes responsivos
src/brazil-map.svg   Mapa vetorial local
public/             Fontes, imagens, favicon e licenças
server.mjs          Servidor HTTP, arquivos de produção e API
test/               Testes da API
```

## Créditos

Consulte [THIRD_PARTY.md](THIRD_PARTY.md) e `public/licenses/`.

Enviar o código ao GitHub não publica a página em um domínio. A hospedagem e o armazenamento persistente são configurações separadas.
