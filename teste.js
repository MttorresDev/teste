// teste.js — comportamento do site da TwoTT Group.
// Este arquivo faz 4 coisas, nesta ordem:
//   1. Monta os links de WhatsApp (cada botão com a sua mensagem).
//   2. Guarda os DADOS das prévias (SEGMENTOS) e dos planos (PLANOS) em listas.
//   3. Transforma esses dados em HTML (funções render): é como uma fôrma de bolo,
//      os dados mudam e a fôrma continua a mesma.
//   4. Cria o ACORDEÃO: uma lista de barras que abrem e fecham ao clicar.
// Ideia central: o HTML só tem uma lista vazia; o JS a preenche. Para mudar um
// texto ou um número, edite os DADOS aqui em cima, não o HTML.
// ===== WhatsApp =====
// Número do WhatsApp: 55 = Brasil, 81 = DDD de Recife. Os href do HTML também
// têm o número, como plano B caso o JS não carregue.
var NUMERO = "5581998118079";

// Percorre os links <a class="wa"> dentro de "raiz" e monta o endereço final:
// https://wa.me/NUMERO?text=MENSAGEM
//   - data-msg é a mensagem escrita no próprio botão (sem ela, usa a padrão).
//   - encodeURIComponent converte espaços e acentos para um formato aceito na URL.
//   - target="_blank" abre em nova aba; rel="noopener" impede que a nova aba
//     controle esta página (segurança).
// Recebe "raiz" porque as prévias nascem depois: chamamos de novo só nelas.
function montarWhatsApp(raiz) {
  raiz.querySelectorAll("a.wa").forEach(function (a) {
    var msg = a.dataset.msg || "Olá! Quero agendar uma conversa com a TwoTT Group.";
    a.href = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
}
// Roda agora para os botões que já estão no HTML (topo, início, final e barra fixa).
montarWhatsApp(document);

// ===== Dados das prévias (todos fictícios) =====
// Para trocar uma prévia por captura de tela real, substitua o render do segmento
// por um <img> dentro de render() — a estrutura do acordeão não muda.
// Cada segmento é um objeto com estes campos:
//   id     nome curto, sem espaço; vira parte dos ids do HTML
//   nome   título da barra e do painel
//   desc   frase curta ao lado do nome
//   tag    (opcional) selo vermelho, ex.: "Em desenvolvimento"
//   cta    (opcional) texto do botão de WhatsApp dentro da prévia
//   msg    mensagem pré-preenchida do WhatsApp
//   res    frase que explica qual problema o sistema resolve
//   menu   abas decorativas do painel de mentira
//   kpis   cartões de números: [rótulo, valor]
//   blocos caixas do painel; "tipo" escolhe o desenho (veja BLOCOS)
var SEGMENTOS = [
  { id: "ichef", nome: "iChefLab", desc: "Gestão para restaurantes", tag: "Em desenvolvimento", cta: "Conhecer o software",
    msg: "Olá! Quero conhecer o sistema iChefLab para restaurantes.",
    res: "Pedidos, cozinha e estoque em um só painel.",
    menu: ["Painel", "Pedidos", "Estoque", "Produtos"],
    kpis: [["Pedidos hoje", "128"], ["Preparando", "7"], ["Concluídos", "114"], ["Faturamento", "R$ 6.480"]],
    blocos: [
      { t: "Quadro da cozinha", tipo: "kanban", cols: [["Novos", ["#131 · 2 itens", "#132 · 1 item"]], ["Preparando", ["#129 · 3 itens"]], ["Prontos", ["#127 · 2 itens"]]] },
      { t: "Estoque", tipo: "niveis", itens: [["Arroz", 80], ["Frango", 28, 1], ["Tomate", 55], ["Óleo", 18, 1]] },
      { t: "Produtos", tipo: "tabela", pill: 1, th: ["Prato", "Preço", "Status"], linhas: [["Feijoada", "R$ 42", "Ativo"], ["Parmegiana", "R$ 38", "Ativo"], ["Salada da casa", "R$ 24", "Pausado"]] }
    ] },
  { id: "barbearia", nome: "Barbearias", desc: "Agenda, clientes e operação",
    msg: "Olá! Quero conhecer uma solução de gestão para barbearias.",
    res: "Agenda, clientes e comissões sem planilha.",
    menu: ["Agenda", "Clientes", "Equipe", "Comissões"],
    kpis: [["Atendimentos hoje", "18"], ["Faturamento", "R$ 1.940"], ["Comissões", "R$ 582"], ["Próximo", "14:30"]],
    blocos: [
      { t: "Agenda de hoje", tipo: "tabela", pill: 1, th: ["Hora", "Cliente", "Profissional", "Status"], linhas: [["09:00", "Cliente A", "Rafael", "Concluído"], ["10:30", "Cliente B", "Diego", "Em atendimento"], ["14:30", "Cliente C", "Rafael", "Aguardando"], ["15:30", "Cliente D", "Caio", "Confirmado"]] },
      { t: "Comissões por profissional", tipo: "niveis", itens: [["Rafael", 72], ["Diego", 58], ["Caio", 40]] }
    ] },
  { id: "clinica", nome: "Clínicas", desc: "Atendimento organizado",
    msg: "Olá! Quero conversar sobre uma solução de gestão para clínicas.",
    res: "Consultas e recepção organizadas, com menos faltas.",
    menu: ["Agenda", "Pacientes", "Recepção", "Relatórios"],
    kpis: [["Consultas hoje", "24"], ["Aguardando", "5"], ["Confirmadas", "17"], ["Faltas", "2"]],
    blocos: [
      { t: "Próximos atendimentos", tipo: "tabela", pill: 1, th: ["Hora", "Paciente", "Médico(a)", "Status"], linhas: [["08:30", "Paciente A", "Dra. Silva", "Concluído"], ["09:15", "Paciente B", "Dr. Costa", "Em atendimento"], ["10:00", "Paciente C", "Dra. Silva", "Aguardando"], ["10:45", "Paciente D", "Dr. Costa", "Confirmado"]] },
      { t: "Ocupação das salas", tipo: "niveis", itens: [["Sala 1", 90], ["Sala 2", 60], ["Sala 3", 35]] }
    ] },
  { id: "posto", nome: "Postos", desc: "Gestão de caixa e estoque",
    msg: "Olá! Quero conhecer uma solução de gestão para postos.",
    res: "Caixa, turnos e estoque de combustível sob controle.",
    menu: ["Caixa", "Turnos", "Combustíveis", "Loja"],
    kpis: [["Vendas hoje", "R$ 18.450"], ["Caixa", "Aberto"], ["Turno", "2 de 3"], ["Litros", "3.120"]],
    blocos: [
      { t: "Vendas por hora", tipo: "barras", alt: "Gráfico ilustrativo de vendas por hora", vals: [30, 45, 60, 40, 75, 90, 65, 50] },
      { t: "Estoque de combustível", tipo: "niveis", itens: [["Gasolina", 72], ["Etanol", 44], ["Diesel", 21, 1]] },
      { t: "Turnos", tipo: "tabela", pill: 1, th: ["Turno", "Operador", "Caixa"], linhas: [["Manhã", "Operador A", "Fechado"], ["Tarde", "Operador B", "Aberto"]] }
    ] },
  { id: "mercado", nome: "Supermercados", desc: "Vendas e inventário",
    msg: "Olá! Quero conversar sobre uma solução para supermercados.",
    res: "Vendas, estoque e alertas de reposição no mesmo lugar.",
    menu: ["Vendas", "Produtos", "Estoque", "Caixas"],
    kpis: [["Vendas hoje", "R$ 42.300"], ["Itens vendidos", "1.860"], ["Alertas", "6"], ["Caixas ativos", "8"]],
    blocos: [
      { t: "Produtos e estoque", tipo: "tabela", pill: 1, th: ["Produto", "Estoque", "Situação"], linhas: [["Arroz 5 kg", "240", "Ok"], ["Leite integral", "36", "Repor"], ["Detergente", "120", "Ok"], ["Café 500 g", "18", "Repor"]] },
      { t: "Vendas da semana", tipo: "barras", alt: "Gráfico ilustrativo de vendas da semana", vals: [55, 60, 48, 70, 85, 95, 80] }
    ] },
  { id: "outros", nome: "Outros segmentos", desc: "Soluções personalizadas", cta: "Falar com a equipe",
    msg: "Olá! Quero conversar sobre uma solução personalizada para minha empresa.",
    res: "Um sistema sob medida para o seu tipo de negócio.",
    menu: ["Solução", "Módulos", "Painel", "Integrações"],
    kpis: [["Módulos ativos", "4"], ["Usuários", "15"], ["Integrações", "2"]],
    blocos: [
      { t: "Módulos personalizáveis", tipo: "chips", itens: ["Agenda", "Clientes", "Estoque", "Financeiro", "Relatórios", "Fidelidade"] },
      { t: "Etapas do projeto", tipo: "niveis", itens: [["Levantamento", 100], ["Protótipo", 70], ["Testes", 30]] }
    ] }
];

// ===== Renderização (textos vêm só do array acima) =====
// Cor do selo de status nas tabelas: "ok" = verde, "red" = vermelho. O que não estiver aqui fica azul.
var COR = { Ativo: "ok", Concluído: "ok", Confirmado: "ok", Aberto: "ok", Ok: "ok", Pausado: "red", Repor: "red" };

// Atalho: aplica a função f em cada item da lista e junta tudo em um só texto. Evita repetir .map(...).join("") em todo lugar.
function m(lista, f) { return lista.map(f).join(""); }

// Um "desenhista" para cada tipo de bloco. Cada função recebe o bloco (b) e
// devolve texto HTML. Os números (altura, largura) vão em data-v e, depois, a função
// abrir() os transforma na variável CSS --v. Fazemos assim para não usar style
// escrito dentro do HTML.
var BLOCOS = {
  // kanban: colunas de tickets, como o quadro da cozinha.
  kanban: function (b) {
    return '<div class="kan">' + m(b.cols, function (c) {
      return "<div><h5>" + c[0] + "</h5>" + m(c[1], function (t) { return '<div class="ticket">' + t + "</div>"; }) + "</div>";
    }) + "</div>";
  },
  // niveis: barrinhas de progresso. Cada item é [nome, porcentagem, 1 = alerta em vermelho].
  niveis: function (b) {
    return m(b.itens, function (i) {
      return '<div class="meter' + (i[2] ? " low" : "") + '"><span>' + i[0] + '</span><i data-v="' + i[1] + '"></i><b>' + i[1] + "%</b></div>";
    });
  },
  // barras: gráfico de colunas. O aria-label descreve o gráfico para leitores de tela.
  barras: function (b) {
    return '<div class="chart" role="img" aria-label="' + b.alt + '">' + m(b.vals, function (v) { return '<span data-v="' + v + '"></span>'; }) + "</div>";
  },
  // chips: etiquetas arredondadas.
  chips: function (b) {
    return '<div class="chips">' + m(b.itens, function (i) { return "<span>" + i + "</span>"; }) + "</div>";
  },
  // tabela: se "pill" estiver ligado, a última coluna vira um selo colorido (usa COR).
  // A div .scroll deixa a tabela rolar para o lado no celular, sem quebrar a página.
  tabela: function (b) {
    return '<div class="scroll"><table><thead><tr>' + m(b.th, function (x) { return "<th>" + x + "</th>"; }) +
      "</tr></thead><tbody>" + m(b.linhas, function (r) {
        return "<tr>" + m(r, function (c, i) {
          return "<td>" + (b.pill && i === r.length - 1 ? '<span class="pill ' + (COR[c] || "") + '">' + c + "</span>" : c) + "</td>";
        }) + "</tr>";
      }) + "</tbody></table></div>";
  }
};

// Monta o painel inteiro de um segmento: aviso de "prévia ilustrativa", frase de
// apoio, a "janela" do sistema (barra superior, cartões, blocos) e o botão de WhatsApp.
// Usa só textos dos dados acima (nada digitado pelo visitante); por isso é seguro
// usar innerHTML aqui.
function render(s) {
  return '<div class="pv"><span class="pv-note">Prévia ilustrativa · dados fictícios</span>' +
    '<p class="pv-res">' + s.res + "</p>" +
    '<div class="app"><div class="app-top"><b>' + s.nome + '</b><div class="app-nav">' + m(s.menu, function (x) { return "<span>" + x + "</span>"; }) +
    '</div><span class="app-search" aria-hidden="true">Buscar…</span></div><div class="app-body">' +
    '<div class="kpis">' + m(s.kpis, function (k) { return '<div class="kpi"><small>' + k[0] + "</small><strong>" + k[1] + "</strong></div>"; }) + "</div>" +
    '<div class="blocos">' + m(s.blocos, function (b) { return '<div class="bloco"><h4>' + b.t + "</h4>" + BLOCOS[b.tipo](b) + "</div>"; }) + "</div></div></div>" +
    '<div class="pv-cta"><p>Prévia conceitual: as funcionalidades dependem das necessidades de cada negócio.</p>' +
    '<a class="btn small wa" data-msg="' + s.msg + '" href="https://wa.me/' + NUMERO + '">' + (s.cta || "Conversar no WhatsApp") + "</a></div></div>";
}

// ===== Planos (exemplo ilustrativo: ajuste recursos e valores quando definir) =====
// Exemplo ilustrativo: troque recursos e preço quando definir os planos reais.
// Campos: id, nome, desc (frase ao lado do nome), preco, recursos (lista de textos).
var PLANOS = [
  { id: "start", nome: "Start", desc: "Para começar a organizar", preco: "Sob consulta",
    recursos: ["Cardápio e produtos", "Pedidos em quadro kanban"] },
  { id: "pro", nome: "Pro", desc: "Para o dia a dia da operação", preco: "Sob consulta",
    recursos: ["Tudo do Start", "Controle de estoque", "Relatórios de vendas"] },
  { id: "business", nome: "Business", desc: "Para operações maiores", preco: "Sob consulta",
    recursos: ["Tudo do Pro", "Mais usuários e permissões", "Indicadores de desempenho"] },
  { id: "franquia", nome: "Franquia", desc: "Para redes e várias unidades", preco: "Sob consulta",
    recursos: ["Tudo do Business", "Várias unidades no mesmo painel", "Visão consolidada da rede"] }
];

// Monta o cartão de um plano: nome, preço, lista de recursos e botão de WhatsApp com o nome do plano.
function renderPlano(p) {
  return '<div class="pv"><span class="pv-note">Exemplo ilustrativo · recursos e valores a definir</span>' +
    '<div class="plano"><div class="plano-top"><b>' + p.nome + '</b><span class="plano-preco">' + p.preco + "</span></div>" +
    '<div class="recursos">' + m(p.recursos, function (r) { return "<p>" + r + "</p>"; }) + "</div></div>" +
    '<div class="pv-cta"><p>Conte como é a sua operação e indicamos o plano ideal.</p>' +
    '<a class="btn small wa" data-msg="Olá! Quero saber mais sobre o plano ' + p.nome + ' do iChefLab." href="https://wa.me/' + NUMERO + '">Conversar sobre o plano</a></div></div>';
}

// ===== Acordeão (usado em Soluções e em Planos) =====
// Pergunta ao navegador se a pessoa aceita animações. Quem pediu "reduzir movimento" no sistema recebe rolagem sem efeito.
var suave = function () { return window.matchMedia("(prefers-reduced-motion: no-preference)").matches; };

// Cria uma lista de barras clicáveis (acordeão) dentro de uma <ul>.
//   ul       lista vazia que está no HTML
//   itens    os dados (SEGMENTOS ou PLANOS)
//   render   função que desenha o conteúdo de um item
//   prefixo  evita ids repetidos entre as duas listas
//   destaque posição do item com fundo avermelhado (-1 = nenhum)
// É usada duas vezes no fim do arquivo: Soluções e Planos.
function acordeao(ul, itens, render, prefixo, destaque) {
  itens.forEach(function (s, n) {
    var li = document.createElement("li");
    if (n === destaque) li.className = "hot";
    // Guarda a posição do item no próprio <li>; é assim que o clique descobre quais dados abrir.
    li.dataset.i = n;
    // Cada <li> tem um botão (a barra) e uma "gaveta" vazia onde o conteúdo vai aparecer.
    // Acessibilidade: aria-expanded diz ao leitor de tela se a barra está aberta;
    // aria-controls liga o botão à gaveta; role="region" + aria-labelledby dão nome à gaveta.
    li.innerHTML =
      '<button class="svc" type="button" id="btn-' + prefixo + s.id + '" aria-expanded="false" aria-controls="drawer-' + prefixo + s.id + '">' +
      '<span class="num">0' + (n + 1) + '</span><span class="info"><span class="name">' + s.nome + '</span><span class="desc">' + s.desc + "</span>" +
      (s.tag ? '<span class="tag">' + s.tag + "</span>" : "") + '</span><span class="more">Explorar</span><span class="chev" aria-hidden="true"></span></button>' +
      '<div class="drawer" id="drawer-' + prefixo + s.id + '" role="region" aria-labelledby="btn-' + prefixo + s.id + '"><div class="drawer-in"></div></div>';
    ul.appendChild(li);
  });

  // Devolve o <li> aberto agora (ou null). É o que garante "só um aberto por vez".
  function aberto() { return ul.querySelector("li.open"); }

  // Tira a classe "open" (o CSS anima a gaveta encolhendo) e avisa o leitor de tela.
  // Depois de 260 ms, quando a animação já terminou, apaga o conteúdo. O if protege o
  // caso de a pessoa ter reaberto a barra nesse meio tempo.
  function fechar(li) {
    var area = li.querySelector(".drawer-in");
    li.classList.remove("open");
    li.querySelector(".svc").setAttribute("aria-expanded", "false");
    setTimeout(function () { if (!li.classList.contains("open")) area.replaceChildren(); }, 260);
  }

  // Desenha o conteúdo, aplica as larguras das barrinhas (--v), ativa os links de
  // WhatsApp novos, marca "open" e aria-expanded. No fim, rola a página até a barra
  // ficar visível (útil quando a barra anterior fechou e empurrou o layout).
  function abrir(li) {
    var area = li.querySelector(".drawer-in");
    area.innerHTML = render(itens[li.dataset.i]);
    area.querySelectorAll("[data-v]").forEach(function (e) { e.style.setProperty("--v", e.dataset.v + "%"); });
    montarWhatsApp(area);
    li.classList.add("open");
    li.querySelector(".svc").setAttribute("aria-expanded", "true");
    setTimeout(function () {
      li.querySelector(".svc").scrollIntoView({ behavior: suave() ? "smooth" : "auto", block: "nearest" });
    }, 270);
  }

  // Um único ouvinte para a lista inteira (delegação de eventos): funciona para
  // qualquer barra, inclusive as criadas pelo JS. A lógica é: fecha o que estiver aberto;
  // se a barra clicada não era a aberta, abre. Resultado: clicar de novo fecha,
  // clicar em outra troca, e nunca há duas abertas.
  ul.addEventListener("click", function (e) {
    var b = e.target.closest(".svc");
    if (!b) return;
    var li = b.parentElement, atual = aberto();
    if (atual) fechar(atual);
    if (atual !== li) abrir(li);
  });

  // Tecla Esc fecha a barra aberta e devolve o foco ao botão, para quem usa teclado não se perder.
  document.addEventListener("keydown", function (e) {
    var atual = aberto();
    if (e.key === "Escape" && atual) {
      fechar(atual);
      atual.querySelector(".svc").focus();
    }
  });
}

// Liga tudo: preenche a lista de Soluções (item 0 em destaque) e a lista de Planos.
acordeao(document.getElementById("menu"), SEGMENTOS, render, "", 0);
acordeao(document.getElementById("menu-planos"), PLANOS, renderPlano, "plano-", -1);