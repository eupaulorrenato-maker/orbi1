import './style.css';
import brazilMap from './brazil-map.svg?raw';

const paths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  up: '<path d="M7 17 17 7M7 7h10v10"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 11h18m-13 4h2m4 0h2"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3a4 4 0 0 1 0 8"/><circle cx="9" cy="7" r="4"/>',
  wallet: '<path d="M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6m18 7h-5v4h5m-3-2h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18"/>',
  home: '<path d="m3 10 9-7 9 7v10H3Zm6 10v-7h6v7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8m4-10v12"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  settings: '<path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',
  db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevron: '<path d="m8 5 7 7-7 7"/>',
  play: '<path d="m9 5 11 7-11 7Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  layers: '<path d="m12 3 10 6-10 6L2 9Zm-10 9 10 6 10-6M2 17l10 6 10-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.globe}</svg>`;
const orbit = `<svg class="orbit-mark" viewBox="0 0 56 42" fill="none" aria-hidden="true"><ellipse cx="27" cy="23" rx="24" ry="11" transform="rotate(-27 27 23)" stroke="currentColor" stroke-width="2"/><circle cx="47" cy="11" r="4" fill="currentColor"/></svg>`;
const logo = `<a class="brand" href="#" aria-label="Orbi Travel — início">${orbit}<span>orbi<span class="brand-travel">travel</span><span class="brand-dot">.</span></span></a>`;
const cta = (text = 'Quero conhecer o Orbi Travel', cls = '') => `<a class="button button-primary ${cls}" href="#demonstracao">${text}${icon('up')}</a>`;
const mockNav = ['Visão geral', 'Viagens', 'Clientes', 'Financeiro', 'Cadastros'];

function dashboard() {
  return `<div class="product-window" aria-label="Prévia ilustrativa do painel Orbi Travel">
    <aside class="mock-sidebar"><div class="mock-brand">${orbit}<strong>orbi<span>travel.</span></strong></div><div class="mock-agency">SUA AGÊNCIA, NO SEU RITMO</div><div class="mock-navigation">${mockNav.map((label, i) => `<div class="mock-nav ${i === 0 ? 'is-active' : ''}">${icon(['home', 'globe', 'people', 'wallet', 'db'][i])}<span>${label}</span></div>`).join('')}</div><div class="mock-user"><span class="avatar">M</span><span>Marina Valença<small>Administradora</small></span></div></aside>
    <div class="mock-main"><div class="mock-topbar"><span>${icon('search')} Buscar na sua agência...</span>${icon('bell')}</div><div class="mock-heading"><div><small>UM NOVO DIA, TUDO NO LUGAR</small><h3>Visão geral<span>☀</span></h3></div><span class="mock-new">${icon('plus')} Nova viagem</span></div>
    <div class="mock-kpis"><div>${icon('calendar')}<span>Próximas viagens<strong>24</strong></span></div><div>${icon('people')}<span>Vagas disponíveis<strong>486</strong></span></div><div>${icon('coin')}<span>A receber · 30 dias<strong>R$ 486.750<span>,00</span></strong></span></div></div>
    <div class="mock-body"><article class="trip-card"><div class="trip-art"><img src="/images/brasilia.svg" width="640" height="380" alt="Ilustração do Congresso Nacional em Brasília"/><span>${icon('pin')} BRASÍLIA, DF</span></div><div class="trip-info"><div class="trip-title"><h4>Brasília Cultural</h4><span class="status">Aberta</span></div><p>${icon('calendar')} 12 a 15 de fevereiro de 2027</p><div class="occupancy"><span>Ocupação</span><strong>144 de 180 <small>(80%)</small></strong></div><div class="progress"><span></span></div><div class="trip-bottom"><span>A próxima memória começa aqui.</span>${icon('arrow')}</div></div></article>
    <section class="mock-payments"><div class="mock-card-title">${icon('clock')} Próximos compromissos</div>${[['18 NOV', 'Viação Rota Dourada', 'Transporte · parcela 1/2', '44.000'], ['12 DEZ', 'Cartão Corporativo', 'Fatura · final 4826', '31.000'], ['18 DEZ', 'Viação Rota Dourada', 'Transporte · parcela 2/2', '44.000']].map(([date, name, desc, value]) => `<div class="payment"><span class="payment-date">${date.split(' ')[0]}<small>${date.split(' ')[1]}</small></span><span class="payment-name">${name}<small>${desc}</small></span><strong>R$ ${value}</strong></div>`).join('')}<div class="payment-footer">Seu financeiro, sem perder o horizonte ${icon('arrow')}</div></section></div><div class="mock-footnote"><span class="live-dot"></span> Uma visão clara da sua operação <span>Dados ilustrativos</span></div>
    </div></div>`;
}
const features = [
  ['people', 'Vagas à vista. Atendimento seguro.', 'Acompanhe a ocupação, consulte os passageiros confirmados e identifique reservas aguardando pagamento.'],
  ['wallet', 'Quem pagou? Quanto ainda falta?', 'Consulte os pagamentos registrados, os saldos a receber e as previsões de parcelas Pix e repasses de cartão.'],
  ['layers', 'A operação sem refazer listas.', 'Transporte, hospedagem e guia ligados à viagem. Organize quartos e selecione os campos do manifesto, com opções de PDF e CSV.'],
  ['coin', 'O resultado com os custos na conta.', 'Visualize vendas confirmadas, custos registrados, resultado estimado e margem antes de tomar a próxima decisão.'],
];
const faqs = [
  ['Minha agência é pequena. Faz sentido conhecer?', 'Sim. O Orbi Travel tem foco em pequenas e médias agências que precisam organizar clientes, viagens, reservas e financeiro, com uma visão clara da operação.'],
  ['O sistema mostra o resultado da viagem?', 'A área financeira apresenta vendas confirmadas, custos, resultado estimado e margem, conforme os registros feitos pela agência.'],
  ['Consigo separar reservas confirmadas e pagamentos pendentes?', 'A interface organiza as reservas por situação e permite acompanhar os pagamentos registrados, mantendo passageiros e valores no contexto da viagem.'],
  ['O sistema envia mensagens de aniversário pelo WhatsApp?', 'Os avisos de aniversário são internos. Esse recurso não envia mensagens externas automáticas de WhatsApp ou e-mail. A equipe decide como retomar o contato.'],
  ['O saldo é conectado à minha conta bancária?', 'O controle considera saldos iniciais e lançamentos registrados no Orbi Travel. O saldo não é verificado pelo banco e não representa uma conciliação bancária automática.'],
  ['Quanto custa o Orbi Travel?', 'Solicite uma demonstração e consulte as condições de assinatura disponíveis. O preço final e os limites do plano ainda estão em definição.'],
];

document.querySelector('#app').innerHTML = `
<header class="site-header"><div class="container header-inner">${logo}<nav class="desktop-nav" aria-label="Menu principal"><a href="#solucao">A solução</a><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav><div class="header-actions"><a href="#demonstracao" class="button button-small">Conhecer o Orbi ${icon('up')}</a><button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">${icon('menu')}</button></div></div><nav id="mobile-menu" class="mobile-nav" aria-label="Menu mobile" hidden><a href="#solucao">A solução</a><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a><a href="#demonstracao">Solicitar demonstração ${icon('arrow')}</a></nav></header>
<main id="conteudo">
  <section class="hero"><div class="hero-texture"></div><div class="container hero-grid"><div class="hero-copy"><div class="eyebrow eyebrow-light"><span></span> SUA AGÊNCIA. UMA NOVA VISÃO.</div><h1>Saiba quem confirmou,<br>quanto falta receber<br>e <em>o que sua agência<br class="desktop-break"> tem a pagar.</em></h1><p>Clientes, reservas, passageiros e financeiro no mesmo sistema. A gestão acompanha a viagem. Você acompanha o que importa.</p><div class="hero-actions">${cta()}<a class="text-link light" href="#recursos">${icon('play')} Veja por dentro</a></div><div class="hero-note">${icon('check')} Feito com a rotina das pequenas e médias agências em mente.</div></div><div class="hero-preview">${dashboard()}<div class="preview-caption"><span>${icon('globe')} DO PRIMEIRO CONTATO À VOLTA DA VIAGEM</span><span>Uma prévia do seu próximo controle.</span></div></div></div><div class="hero-bottom"><div class="container"><span>Seu próximo destino: <strong>uma gestão mais clara.</strong></span><a href="#solucao" aria-label="Conheça a solução">ROLE E DESCUBRA <span>↓</span></a></div></div></section>
  <div class="scope-strip"><div class="container"><span>Uma visão completa.<br><strong>Sem informação espalhada.</strong></span>${[['people', 'Clientes e passageiros'], ['globe', 'Viagens e reservas'], ['wallet', 'Financeiro da agência'], ['db', 'Fornecedores e equipe']].map(([i, t]) => `<div>${icon(i)}${t}</div>`).join('')}</div></div>
  <section class="section problem" id="solucao"><div class="container problem-grid"><div><div class="eyebrow">MENOS PONTAS SOLTAS</div><h2>A viagem está vendendo.<br>Mas <span class="serif-text">quanto vai sobrar?</span></h2></div><div class="problem-copy"><p>O grupo está crescendo, os pagamentos estão chegando e o hotel já cobrou a próxima parcela.</p><p>Na correria, falta tempo de conferir quem pagou, atualizar a lista de passageiros e descobrir se o dinheiro disponível cobre os compromissos.</p><p class="problem-emphasis">Uma reserva esquecida vira retrabalho.<br>Um custo fora da conta reduz o resultado.</p></div></div><div class="container"><div class="clarity-note">${icon('sun')}<p>O Orbi Travel reúne essas informações e ajuda você a enxergar <strong>o que precisa de atenção.</strong></p><span>Mais clareza. Melhores decisões.</span></div></div></section>
  <section class="section features" id="recursos"><div class="container"><div class="section-heading"><div><div class="eyebrow">CADA VIAGEM, UM CONTEXTO COMPLETO</div><h2>Abra a viagem.<br><span class="serif-text">Encontre o que precisa.</span></h2></div><p>Datas, capacidade, preço, passageiros, fornecedores e financeiro. Tudo organizado dentro da viagem.</p></div><div class="feature-layout"><div class="interactive-preview"><div class="demo-bar"><span class="live-dot"></span> EXPLORE UMA PRÉVIA <span>Dados ilustrativos</span></div><div class="demo-trip-header"><span class="demo-destination">${icon('pin')} BRASÍLIA, DF</span><h3>Brasília Cultural</h3><p>12 a 15 de fevereiro de 2027</p></div><div class="demo-tabs" role="tablist" aria-label="Áreas da viagem"><button role="tab" id="tab-summary" aria-controls="demo-panel" aria-selected="true" data-tab="summary">Resumo</button><button role="tab" id="tab-bookings" aria-controls="demo-panel" aria-selected="false" tabindex="-1" data-tab="bookings">Reservas</button><button role="tab" id="tab-finance" aria-controls="demo-panel" aria-selected="false" tabindex="-1" data-tab="finance">Financeiro</button></div><div id="demo-panel" class="demo-panel" role="tabpanel" aria-labelledby="tab-summary" tabindex="0"></div><div class="demo-bottom">Uma prévia visual. Conheça o fluxo completo na demonstração. ${icon('up')}</div></div><div class="feature-list">${features.map(([i, title, desc], n) => `<article class="feature-item"><span class="feature-icon">${icon(i)}</span><div><span class="feature-number">0${n + 1}</span><h3>${title}</h3><p>${desc}</p></div></article>`).join('')}</div></div></div></section>
  <section class="finance-section"><div class="container finance-grid"><div class="finance-copy"><div class="eyebrow eyebrow-light">O FINANCEIRO NÃO TERMINA NA VENDA</div><h2>O dinheiro entrou.<br><span class="serif-text">Os compromissos<br>continuam.</span></h2><p>Hotel, transporte, guia, parcelas de cartão e valores com vencimentos diferentes. Enxergue os compromissos antes que virem uma surpresa no caixa.</p><ul class="check-list">${['Contas a receber e a pagar', 'Cartões da agência e suas faturas', 'Previsões de recebimentos e saldo projetado', 'Resultado financeiro das viagens'].map(x => `<li>${icon('check')}${x}</li>`).join('')}</ul>${cta('Quero ter essa visão', 'button-gold')}<small>O controle considera os dados registrados. O saldo não é verificado pelo banco.</small></div><div class="finance-visual"><div class="finance-card"><div class="finance-card-top"><span>${icon('wallet')} Sua agência em perspectiva</span><span class="pill">PREVISÃO</span></div><div class="balance"><span>Saldo projetado</span><strong>R$ 42.850<span>,00</span></strong><span>Conforme os lançamentos registrados</span></div><div class="cash-summary"><div><span>↙</span><p>Entradas previstas<strong>R$ 28.400,00</strong></p></div><div><span>↗</span><p>Saídas previstas<strong>R$ 12.750,00</strong></p></div></div><div class="chart" aria-label="Gráfico ilustrativo da evolução do saldo projetado"><div class="chart-lines"><span>45 mil</span><span>30 mil</span><span>15 mil</span></div><svg viewBox="0 0 460 180" role="img" aria-label="Projeção ilustrativa de saldo crescente"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#2d7656" stop-opacity=".22"/><stop offset="1" stop-color="#2d7656" stop-opacity="0"/></linearGradient></defs><path d="M0 155C35 150 37 127 77 128S120 100 160 105 211 125 245 87 295 98 325 63 368 68 402 34 434 30 460 12V180H0Z" fill="url(#chart-fill)"/><path d="M0 155C35 150 37 127 77 128S120 100 160 105 211 125 245 87 295 98 325 63 368 68 402 34 434 30 460 12" fill="none" stroke="#286849" stroke-width="3"/><circle cx="455" cy="14" r="5" fill="#cda052" stroke="#fff" stroke-width="3"/></svg></div><div class="chart-dates"><span>SEMANA 01</span><span>SEMANA 02</span><span>SEMANA 03</span><span>SEMANA 04</span></div><div class="finance-disclaimer">Saldo inicial: R$ 27.200,00 · Valores ilustrativos</div></div><div class="floating-note">${icon('check')} O próximo vencimento já está no seu radar.</div><div class="orbit-decoration" aria-hidden="true"></div></div></div></section>
  <section class="section relationship"><div class="container relationship-grid"><div class="clients-visual"><div class="clients-top"><span class="feature-icon">${icon('people')}</span><div><h3>Conexões que continuam.</h3><p>Seu cadastro de clientes, sempre por perto.</p></div><span class="client-dots">•••</span></div><div class="client-row"><span class="client-avatar">AC</span><div><strong>Ana Costa</strong><small>Já viajou com sua agência</small></div><span class="client-label">CLIENTE</span></div><div class="client-row"><span class="client-avatar lavender">RM</span><div><strong>Rafael Martins</strong><small>Dados prontos na próxima reserva</small></div><span class="client-label">CLIENTE</span></div><div class="birthday-note">${icon('calendar')}<div><strong>Tem aniversário chegando.</strong><p>Um bom motivo de retomar o contato.</p></div><span>✦</span></div><div class="clients-footnote">Exemplo ilustrativo de cadastro e aviso interno.</div></div><div class="relationship-copy"><div class="eyebrow">RELACIONAMENTO ALÉM DO DESTINO</div><h2>Seu cliente voltou.<br><span class="serif-text">O cadastro continua<br>com você.</span></h2><p>Nome, contato, documentos e aniversário em um cadastro reutilizável nas próximas viagens. Menos pedidos repetidos de informação. Mais contexto no atendimento.</p><p>Os alertas internos de aniversário ajudam sua equipe a identificar oportunidades de retomar o contato.</p><a class="text-link green" href="#demonstracao">A relação não precisa acabar na volta ${icon('arrow')}</a></div></div></section>
  <section class="team-section"><div class="container"><div class="team-heading"><div><div class="eyebrow">DO SEU JEITO, COM A SUA EQUIPE</div><h2>Uma casa organizada<br><span class="serif-text">pra sua operação.</span></h2></div><p>Fornecedores reutilizáveis, acesso definido e a identidade da sua agência em um só lugar.</p></div><div class="team-cards"><article>${icon('db')}<h3>Fornecedores no lugar</h3><p>Hotéis, transportadoras, guias e restaurantes cadastrados e disponíveis nas próximas viagens.</p><div class="tag-list"><span>Hotéis</span><span>Transporte</span><span>Guias</span></div></article><article>${icon('shield')}<h3>Equipe com acesso definido</h3><p>Convide membros e defina o acesso ao financeiro. Cada pessoa com o contexto do seu trabalho.</p><div class="member-preview"><span class="avatar">M</span><span class="avatar pale">R</span><span class="avatar gold">A</span><span>Sua equipe, conectada.</span></div></article><article>${icon('sun')}<h3>Com a cara da sua agência</h3><p>Seu nome, seu logotipo e quatro temas visuais. Uma identidade compartilhada pela equipe.</p><div class="theme-options" role="group" aria-label="Experimentar cores dos quatro temas">${[['forest', 'Floresta e Areia'], ['beach', 'Praia e Azul'], ['earth', 'Terra e Oliva'], ['nature', 'Natureza e Carvão']].map(([id, label], i) => `<button class="theme-swatch ${id} ${i === 0 ? 'selected' : ''}" aria-label="${label}" aria-pressed="${i === 0}" data-theme="${id}"></button>`).join('')}<span id="theme-name">Floresta & Areia</span></div></article></div></div></section>
  <section class="section steps-section" id="como-funciona"><div class="container"><div class="center-heading"><div class="eyebrow">O PRÓXIMO PASSO É SIMPLES</div><h2>Veja como o Orbi Travel<br><span class="serif-text">se encaixa na sua rotina.</span></h2></div><div class="steps">${[['01', 'Conheça a visão geral', 'Consulte os indicadores e os próximos compromissos da agência.'], ['02', 'Explore uma viagem', 'Veja reservas, passageiros, fornecedores e financeiro no mesmo contexto.'], ['03', 'Avalie na sua agência', 'Tire dúvidas sobre os recursos e as condições de contratação.']].map(([n, title, desc]) => `<article><div class="step-line"><span>${n}</span><div></div></div><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div><div class="center-cta">${cta('Vamos conhecer?')}</div></div></section>
  <section class="section faq-section" id="duvidas"><div class="container faq-grid"><div><div class="eyebrow">SEM PONTAS SOLTAS</div><h2>Algumas dúvidas.<br><span class="serif-text">Respostas diretas.</span></h2><p>Quer conversar sobre a rotina da sua agência? A demonstração é um bom começo.</p><a class="text-link green" href="#demonstracao">Quero conversar ${icon('arrow')}</a></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}<span class="faq-plus">${icon('plus')}</span></summary><p>${a}</p></details>`).join('')}</div></div></section>
  <section class="contact-section" id="demonstracao"><div class="container contact-grid"><div class="contact-copy"><div class="eyebrow eyebrow-light">SUA PRÓXIMA VIAGEM JÁ EXIGE ATENÇÃO</div><h2>A gestão precisa<br><span class="serif-text">acompanhar.</span></h2><p>Veja como reunir clientes, reservas, passageiros e compromissos financeiros no Orbi Travel.</p><div class="contact-promise">${icon('globe')}<span>Uma conversa sobre a sua operação.<br><strong>Um novo olhar sobre a sua agência.</strong></span></div><div class="contact-orbit" aria-hidden="true">${orbit}</div></div><div class="contact-form-card"><div class="form-title"><span class="feature-icon">${icon('calendar')}</span><div><h3>Conheça o Orbi Travel</h3><p>Solicite uma demonstração.</p></div></div><form id="demo-form"><div class="form-row"><label>Seu nome<input name="name" autocomplete="name" placeholder="Como podemos chamar você?" required minlength="2" maxlength="120" /></label><label>Nome da agência<input name="agency" autocomplete="organization" placeholder="Sua agência de viagens" required minlength="2" maxlength="160" /></label></div><label>WhatsApp com DDD<input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="(79) 99999-9999" required minlength="10" maxlength="24" /></label><label>E-mail<input name="email" type="email" autocomplete="email" placeholder="voce@suaagencia.com.br" required maxlength="254" /></label><div class="honeypot" aria-hidden="true"><label>Site pessoal<input name="website" tabindex="-1" autocomplete="off" /></label></div><label class="consent"><input name="consent" type="checkbox" required /><span>Autorizo o contato da equipe Orbi Travel sobre a demonstração. <button type="button" class="privacy-link">Como meus dados serão usados?</button></span></label><button type="submit" class="button button-primary form-submit">Quero conhecer o Orbi Travel ${icon('up')}</button><p class="form-message" role="status" aria-live="polite"></p><p class="form-note">Uma conversa inicial, sem compromisso de contratação.</p></form></div></div></section>
</main><footer class="site-footer"><div class="container footer-top">${logo}<p>Gestão que acompanha<br>a viagem da sua agência.</p><nav aria-label="Rodapé"><a href="#solucao">A solução</a><a href="#recursos">Recursos</a><a href="#duvidas">Dúvidas</a><button class="privacy-link" type="button">Privacidade</button></nav><a class="back-top" href="#" aria-label="Voltar ao início">↑</a></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Orbi Travel. Todos os direitos reservados.</span><span>Feito de olho na sua próxima viagem. ${icon('globe')}</span></div></footer>
<dialog id="privacy-dialog" aria-labelledby="privacy-title"><button class="dialog-close" aria-label="Fechar aviso de privacidade">${icon('close')}</button><div class="eyebrow">SEUS DADOS</div><h2 id="privacy-title">Privacidade no contato</h2><p>Ao solicitar uma demonstração, você compartilha nome, agência, WhatsApp e e-mail com a equipe Orbi Travel. Esses dados são usados no atendimento do seu pedido e ficam registrados no servidor do site.</p><p>Não solicitamos documentos pessoais ou dados de cartão neste formulário. O envio não inscreve você automaticamente em campanhas de marketing.</p><p>Você pode pedir a correção ou exclusão dos dados ao responder ao contato da equipe. Caso opte por continuar no WhatsApp, os termos e as regras de privacidade desse serviço se aplicam à conversa.</p><button class="button button-primary privacy-ok">Entendi ${icon('check')}</button></dialog>
`;

const panels = {
  summary: `<div class="demo-summary"><div><span class="status">Aberta para reservas</span><span class="demo-capacity">180 passageiros</span></div><div class="summary-metrics"><div><span>Ocupação da viagem</span><strong>80<span>%</span></strong><div class="progress"><span></span></div><small>144 confirmados · 36 vagas disponíveis</small></div><div><span>Preço por passageiro</span><strong>R$ 2.450<span>,00</span></strong><small>Pix até 3× · Cartão até 8×</small></div></div><div class="supplier"><span>${icon('home')} Hospedagem</span><strong>Hotel Horizonte do Planalto</strong></div><div class="supplier"><span>${icon('globe')} Transporte</span><strong>Viação Rota Dourada</strong></div><div class="supplier"><span>${icon('people')} Guia</span><strong>Caio Noronha</strong></div></div>`,
  bookings: `<div class="booking-panel"><div class="panel-section-title"><strong>Reservas confirmadas</strong><span class="status">144 passageiros</span></div>${[['RM', 'Rafael Monteiro'], ['CD', 'Camila Duarte'], ['FV', 'Felipe Vasconcelos']].map(([a, n]) => `<div class="booking-row"><span class="avatar pale">${a}</span><div><strong>${n}</strong><small>1 passageiro · Reserva confirmada</small></div><span class="status">Pago</span></div>`).join('')}<div class="booking-note">${icon('people')} Exibindo 3 de 144 passageiros · Exemplo ilustrativo</div></div>`,
  finance: `<div class="demo-finance-grid">${[['Vendas confirmadas', '352.800'], ['Saldo a receber', '32.400'], ['Custos registrados', '220.600'], ['Resultado estimado', '132.200']].map(([l, v]) => `<div><span>${l}</span><strong>R$ ${v}<small>,00</small></strong></div>`).join('')}</div><div class="margin-note"><span>${icon('coin')} Margem estimada</span><strong>37,5%</strong></div><p class="demo-finance-note">Resultado estimado = vendas confirmadas − custos registrados. Esse valor não representa dinheiro disponível em caixa.</p>`,
};
function activateTab(tab, focus = false) {
  document.querySelectorAll('[role="tab"]').forEach(b => { const selected = b === tab; b.setAttribute('aria-selected', selected); b.tabIndex = selected ? 0 : -1; });
  const panel = document.querySelector('#demo-panel');
  panel.innerHTML = panels[tab.dataset.tab];
  panel.setAttribute('aria-labelledby', tab.id);
  if (focus) tab.focus();
}
const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach((b, i) => {
  b.addEventListener('click', () => activateTab(b));
  b.addEventListener('keydown', e => {
    let target;
    if (e.key === 'ArrowRight') target = tabs[(i + 1) % tabs.length];
    if (e.key === 'ArrowLeft') target = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === 'Home') target = tabs[0];
    if (e.key === 'End') target = tabs.at(-1);
    if (target) { e.preventDefault(); activateTab(target, true); }
  });
});
activateTab(tabs[0]);

const toggle = document.querySelector('.menu-toggle'), mobileNav = document.querySelector('#mobile-menu');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); mobileNav.hidden = true; toggle.innerHTML = icon('menu'); }
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); mobileNav.hidden = !open; toggle.innerHTML = icon(open ? 'close' : 'menu');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileNav.hidden) { closeMenu(); toggle.focus(); } });

const themes = { forest: 'Floresta & Areia', beach: 'Praia & Azul', earth: 'Terra & Oliva', nature: 'Natureza & Carvão' };
document.querySelectorAll('.theme-swatch').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.theme-swatch').forEach(s => { const selected = s === b; s.classList.toggle('selected', selected); s.setAttribute('aria-pressed', selected); });
  document.querySelector('.interactive-preview').dataset.theme = b.dataset.theme;
  document.querySelector('#theme-name').textContent = themes[b.dataset.theme];
}));

const privacy = document.querySelector('#privacy-dialog');
document.querySelectorAll('.privacy-link').forEach(b => b.addEventListener('click', () => privacy.showModal()));
document.querySelectorAll('.dialog-close, .privacy-ok').forEach(b => b.addEventListener('click', () => privacy.close()));
privacy.addEventListener('click', e => { if (e.target === privacy) { const r = privacy.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) privacy.close(); } });

const form = document.querySelector('#demo-form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const button = form.querySelector('[type="submit"]'), message = form.querySelector('.form-message');
  const original = button.innerHTML;
  button.disabled = true; button.textContent = 'Enviando solicitação…'; message.textContent = ''; message.classList.remove('error');
  const values = Object.fromEntries(new FormData(form));
  values.consent = form.elements.consent.checked;
  try {
    const response = await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values), signal: AbortSignal.timeout(15000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Não foi possível enviar. Tente novamente.');
    message.textContent = 'Solicitação recebida! Seus dados foram registrados. A equipe Orbi Travel poderá entrar em contato sobre a demonstração.';
    if (data.whatsappUrl) { const a = document.createElement('a'); a.href = data.whatsappUrl; a.className = 'whatsapp-link'; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = 'Continuar a conversa no WhatsApp ↗'; message.append(document.createElement('br'), a); }
    form.reset();
  } catch (error) {
    message.textContent = error.name === 'TimeoutError' ? 'O envio demorou mais que o esperado. Tente novamente.' : (error instanceof TypeError ? 'Sem conexão com o atendimento. Confira sua conexão e tente novamente.' : error.message);
    message.classList.add('error');
  } finally { button.disabled = false; button.innerHTML = original; }
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 16), { passive: true });

const destinations = {
  brasilia: { name: 'Brasília', state: 'DISTRITO FEDERAL', type: 'Cultura & arquitetura', text: 'Da reserva ao roteiro cultural. Passageiros, guia e compromissos reunidos na mesma viagem.' },
  aracaju: { name: 'Aracaju', state: 'SERGIPE', type: 'Litoral & história', text: 'O começo pode estar perto de casa. Organize a operação e acompanhe os detalhes do grupo.' },
  chapada: { name: 'Chapada Diamantina', state: 'BAHIA', type: 'Natureza & aventura', text: 'Trilhas no roteiro, clareza na gestão. Hospedagem, transporte e guia com o contexto da viagem.' },
  rio: { name: 'Rio de Janeiro', state: 'RIO DE JANEIRO', type: 'Cidade & experiências', text: 'Muitos planos, um lugar de consulta. Reservas e passageiros organizados no mesmo contexto.' },
  gramado: { name: 'Gramado', state: 'RIO GRANDE DO SUL', type: 'Serra & gastronomia', text: 'Cuide do grupo sem perder os compromissos de vista. Fornecedores e financeiro ligados à viagem.' },
  manaus: { name: 'Manaus', state: 'AMAZONAS', type: 'Floresta & descobertas', text: 'Novos destinos, a mesma organização. Consulte os dados da operação antes do próximo embarque.' },
};
const mapSection = document.createElement('section');
mapSection.className = 'destinations-section';
mapSection.id = 'destinos';
mapSection.innerHTML = `<div class="container destinations-grid"><div class="destinations-copy"><div class="eyebrow"><span class="red-dot"></span> MUITOS DESTINOS. UMA VISÃO.</div><h2>O Brasil é grande.<br><span class="serif-text">Sua gestão não precisa<br>ficar espalhada.</span></h2><p>Da serra ao litoral, a próxima viagem começa com tudo no lugar. Sua agência cuida das experiências. O Orbi Travel ajuda a organizar os detalhes.</p><div class="destination-selector" role="group" aria-label="Escolher destino no mapa">${Object.entries(destinations).map(([key, d]) => `<button data-destination="${key}" aria-pressed="${key === 'brasilia'}" class="destination-chip ${key === 'brasilia' ? 'selected' : ''}"><span></span>${d.name}</button>`).join('')}</div><a class="text-link green" href="#demonstracao">Leve essa visão à sua agência ${icon('arrow')}</a></div><div class="map-visual"><div class="map-corner">BRASIL <span>UM PAÍS DE POSSIBILIDADES</span></div><span class="map-compass" aria-hidden="true">N<span>↑</span></span>${brazilMap}<div class="map-destination-card" aria-live="polite"><span class="map-card-pin">${icon('pin')}</span><div><span id="destination-state">DISTRITO FEDERAL</span><h3 id="destination-name">Brasília</h3><p id="destination-type">Cultura & arquitetura</p></div><span class="map-card-arrow">${icon('up')}</span></div><p class="map-caption"><span class="red-dot"></span> Clique nos pontos e descubra os destinos <span>Exemplos ilustrativos</span></p></div><p class="destination-description" id="destination-description">Da reserva ao roteiro cultural. Passageiros, guia e compromissos reunidos na mesma viagem.</p></div>`;
document.querySelector('.scope-strip').after(mapSection);
function selectDestination(key) {
  const data = destinations[key];
  mapSection.querySelectorAll('[data-destination]').forEach(el => {
    const selected = el.dataset.destination === key;
    el.classList.toggle(el.classList.contains('map-pin') ? 'active' : 'selected', selected);
    el.setAttribute('aria-pressed', selected);
  });
  document.querySelector('#destination-state').textContent = data.state;
  document.querySelector('#destination-name').textContent = data.name;
  document.querySelector('#destination-type').textContent = data.type;
  document.querySelector('#destination-description').textContent = data.text;
}
mapSection.querySelectorAll('[data-destination]').forEach(el => {
  el.addEventListener('click', () => selectDestination(el.dataset.destination));
  if (el.tagName.toLowerCase() === 'g') el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDestination(el.dataset.destination); }
  });
});
