# Apresentação comercial — Orbi Travel

Objetivo definido por Paulo: **apoio institucional, aproximação com agências e avaliação de indicação do sistema**. O material não presume parceria ou indicação já aprovada.

## Entregas

- Página navegável em `/apresentacao` ou `/apresentacao/`.
- [PDF](../public/apresentacao/orbi-travel-apresentacao.pdf): 29 slides, em proporção 16:9, com texto selecionável.
- [PowerPoint](../public/apresentacao/orbi-travel-apresentacao.pptx): 29 slides com caixas de texto editáveis e notas do apresentador. Usa Aptos/Aptos Display, com substituição pela fonte disponível no leitor quando necessário.
- [Roteiro de fala](../public/apresentacao/roteiro-comercial.md): contexto, fala, responsável e ponte ao próximo slide.

25 slides compõem a sequência principal, com aproximadamente 25 minutos de fala. Quatro slides de apoio aprofundam cálculos, operação, objeções e fontes. Reserve tempo adicional às perguntas. O roteiro evita colocar todos os detalhes no mesmo slide.

## Encadeamento

1. **O negócio:** produto, comprador, assinatura, origem, pessoas e público inicial.
2. **O problema:** um dia ilustrativo da agência, gargalos e distinção de venda, recebimento e custo.
3. **A solução:** viagem como contexto, atendimento, reservas, operação, resultado, caixa e relacionamento.
4. **Viabilidade:** modelo comercial, entrada em Sergipe, diferenciação a validar, estágio técnico e etapas de evolução.
5. **A proposta:** pedidos ao Sebrae, sugestão de piloto, medição, responsabilidades e próxima decisão.
6. **Apoio:** regras financeiras, pré-requisitos, respostas comerciais e base documental.

## Apresentar

Use as setas ou os botões inferiores. `F` ativa tela cheia quando o navegador permitir; `N` abre o roteiro ao lado do slide. O índice e os capítulos dão acesso direto aos assuntos. O endereço inclui o identificador do slide e pode ser compartilhado. No celular, o conteúdo usa um layout de leitura com texto grande em vez de reduzir o slide inteiro.

Os downloads funcionam sem depender do protótipo externo. As referências internas do produto vêm do documento de contexto e das 18 imagens fornecidas por Paulo. Os fluxos autenticados não foram auditados. Os números são exemplos do protótipo; não representam desempenho do Orbi ou de clientes reais. Cinco agências e 60 dias permanecem uma sugestão sujeita a acordo.

## Editar e regenerar

O conteúdo compartilhado está em `slides.json`. Ajuste o texto e as notas ali; `main.js` e `style.css` definem a página. A landing page mantém sua entrada e seus estilos próprios.

Com o servidor local rodando:

```sh
python -m pip install -r scripts/requirements-presentation.txt
python scripts/export-presentation.py --url http://127.0.0.1:3000
npm run build
```

Execute esses comandos na raiz do repositório. O script usa `/usr/bin/chromium` por padrão; `--chromium /caminho/do/browser` seleciona outro executável. Ele gera PDF, PowerPoint, roteiro e a prévia `docs/apresentacao-preview.png`. O build seguinte copia os novos arquivos de download à distribuição.

Antes de reutilizar, confirme destinatário, condições comerciais, estágio do produto e versão do roteiro. Nenhuma mensagem é enviada a terceiros pela apresentação.
