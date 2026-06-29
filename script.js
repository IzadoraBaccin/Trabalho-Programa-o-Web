// Banco de dados expandido (3 opções por serviço)
const bancoFornecedores = [
    { id: 1, nome: "Buffet Sabor Nobre", categoria: "Buffet", preco: 8500, contato: "(11) 98888-1111" },
    { id: 2, nome: "Buffet Real", categoria: "Buffet", preco: 12000, contato: "(11) 98888-1112" },
    { id: 3, nome: "Buffet Econômico", categoria: "Buffet", preco: 5000, contato: "(11) 98888-1113" },
    
    { id: 4, nome: "Palácio das Festas", categoria: "Salão de Festa", preco: 5000, contato: "(11) 98888-2221" },
    { id: 5, nome: "Espaço Cristal", categoria: "Salão de Festa", preco: 8000, contato: "(11) 98888-2222" },
    { id: 6, nome: "Salão Vintage", categoria: "Salão de Festa", preco: 3500, contato: "(11) 98888-2223" },
    
    { id: 7, nome: "Chácara Pôr do Sol", categoria: "Chácara", preco: 3500, contato: "(11) 98888-3331" },
    { id: 8, nome: "Fazenda Imperial", categoria: "Chácara", preco: 6000, contato: "(11) 98888-3332" },
    { id: 9, nome: "Sítio Verde", categoria: "Chácara", preco: 2500, contato: "(11) 98888-3333" },
    
    { id: 10, nome: "Florescer Decorações", categoria: "Decoração", preco: 4000, contato: "(11) 98888-4441" },
    { id: 11, nome: "ArtDecor", categoria: "Decoração", preco: 7500, contato: "(11) 98888-4442" },
    { id: 12, nome: "Simples Charme", categoria: "Decoração", preco: 2000, contato: "(11) 98888-4443" },
    
    { id: 13, nome: "Ana Silva Eventos", categoria: "Cerimonialista", preco: 2500, contato: "(11) 98888-5551" },
    { id: 14, nome: "Premium Planner", categoria: "Cerimonialista", preco: 4500, contato: "(11) 98888-5552" },
    { id: 15, nome: "Guia dos Noivos", categoria: "Cerimonialista", preco: 1800, contato: "(11) 98888-5553" },
    
    { id: 16, nome: "Studio Bella", categoria: "Beleza", preco: 800, contato: "(11) 98888-6661" },
    { id: 17, nome: "Dia da Noiva Lux", categoria: "Beleza", preco: 1500, contato: "(11) 98888-6662" },
    { id: 18, makeup: true, nome: "Glow Makeup", categoria: "Beleza", preco: 600, contato: "(11) 98888-6663" },
    
    { id: 19, nome: "Noiva Perfeita", categoria: "Vestido", preco: 2000, contato: "(11) 98888-7771" },
    { id: 20, nome: "Boutique Paris", categoria: "Vestido", preco: 5000, contato: "(11) 98888-7772" },
    { id: 21, nome: "Trajes & Cia", categoria: "Vestido", preco: 1200, contato: "(11) 98888-7773" },
    
    { id: 22, nome: "Doce Encanto", categoria: "Doceria", preco: 1500, contato: "(11) 98888-8881" },
    { id: 23, nome: "Chocolatier", categoria: "Doceria", preco: 3000, contato: "(11) 98888-8882" },
    { id: 24, nome: "Bolos da Vovó", categoria: "Doceria", preco: 800, contato: "(11) 98888-8883" },
    
    { id: 25, nome: "Cheers Bar", categoria: "Drinks", preco: 1800, contato: "(11) 98888-9991" },
    { id: 26, nome: "Neon Drinks", categoria: "Drinks", preco: 3500, contato: "(11) 98888-9992" },
    { id: 27, nome: "Festa & Copo", categoria: "Drinks", preco: 1200, contato: "(11) 98888-9993" },
    
    { id: 28, nome: "Focus Fotografia", categoria: "Fotografia", preco: 3000, contato: "(11) 98888-0001" },
    { id: 29, nome: "Luz e Arte", categoria: "Fotografia", preco: 6000, contato: "(11) 98888-0002" },
    { id: 30, nome: "Cliques Rápidos", categoria: "Fotografia", preco: 1500, contato: "(11) 98888-0003" }
];

let dadosCasais = {};
let casalAtual = "";
let filtrosSelecionados = [];

// ==========================================
// TELA DE LOGIN E PERFIL
// ==========================================
function aplicarMascaraCPF(event) {
    let v = event.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    event.target.value = v;
}

function entrarNoSistema() {
    let nome = document.getElementById("loginNome").value;
    let email = document.getElementById("loginEmail").value;
    let cpf = document.getElementById("loginCpf").value;
    let tipo = document.getElementById("loginTipo").value;

    if (!nome || !email || !cpf) return alert("Preencha todos os dados!");

    // Atualiza o Card de Perfil
    document.getElementById("displayPerfilNome").innerText = nome;
    document.getElementById("displayPerfilEmail").innerText = email;
    document.getElementById("displayPerfilCpf").innerText = cpf;
    document.getElementById("displayPerfilTipo").innerText = tipo === "noivos" ? "Noiva / Noivo" : "Cerimonialista";

    // Configura a visualização com base no tipo
    let boxProjetos = document.getElementById("areaGestaoProjetos");
    let boxSeletor = document.getElementById("boxSeletorProjetos");

    if(tipo === "noivos") {
        boxProjetos.style.display = "none";
        boxSeletor.style.display = "none";
        dadosCasais = { "meu_casamento": { nomeProjeto: "Meu Casamento", orcamentoTotal: 0, qtdConvidados: 0, dataCasamento: "", fornecedores: [], convidados: [], cronograma: [] }};
        casalAtual = "meu_casamento";
    } else {
        boxProjetos.style.display = "block";
        boxSeletor.style.display = "block";
        dadosCasais = { "exemplo_casal": { nomeProjeto: "Casal Exemplo (Editar)", orcamentoTotal: 0, qtdConvidados: 0, dataCasamento: "", fornecedores: [], convidados: [], cronograma: [] }};
        atualizarSelectProjetos();
        casalAtual = "exemplo_casal";
    }

    // Esconde Login, Mostra App
    document.getElementById("telaLogin").style.display = "none";
    document.getElementById("appPrincipal").style.display = "flex";
    carregarDadosDoCasal();
}

// NAVEGAÇÃO
function abrirAba(evento, nomeAba) {
    let abas = document.getElementsByClassName("aba");
    for (let i = 0; i < abas.length; i++) abas[i].style.display = "none";
    let botoes = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botoes.length; i++) botoes[i].className = botoes[i].className.replace(" active", "");
    document.getElementById(nomeAba).style.display = "block";
    evento.currentTarget.className += " active";
}

// GESTÃO DE PROJETOS (CERIMONIALISTA)
function criarNovoProjeto() {
    let nome = document.getElementById("novoProjetoNome").value;
    if(!nome) return;
    let idGerado = nome.toLowerCase().replace(/[^a-z0-9]/g, "_");
    if(!dadosCasais[idGerado]) {
        dadosCasais[idGerado] = { nomeProjeto: nome, orcamentoTotal: 0, qtdConvidados: 0, dataCasamento: "", fornecedores: [], convidados: [], cronograma: [] };
        atualizarSelectProjetos();
        document.getElementById("projetoAtual").value = idGerado;
        mudarProjeto();
    }
    document.getElementById("novoProjetoNome").value = "";
}

function atualizarSelectProjetos() {
    let select = document.getElementById("projetoAtual");
    select.innerHTML = "";
    for (const [id, dados] of Object.entries(dadosCasais)) {
        let opt = document.createElement("option");
        opt.value = id;
        opt.text = dados.nomeProjeto;
        select.appendChild(opt);
    }
}

function mudarProjeto() {
    casalAtual = document.getElementById("projetoAtual").value;
    document.getElementById("resultadosBusca").innerHTML = ""; 
    filtrosSelecionados = [];
    renderizarTagsFiltro();
    carregarDadosDoCasal();
}

// CARREGAR DADOS GERAIS
function carregarDadosDoCasal() {
    let dados = dadosCasais[casalAtual];
    document.getElementById("inputOrcamentoTotal").value = dados.orcamentoTotal || "";
    document.getElementById("inputQtdConvidados").value = dados.qtdConvidados || "";
    
    let valorReais = dados.orcamentoTotal > 0 ? "R$ " + dados.orcamentoTotal.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "";
    document.getElementById("orcamentoBusca").value = valorReais;
    document.getElementById("qtdConvidadosInicio").value = dados.qtdConvidados || "";
    document.getElementById("dataCasamento").value = dados.dataCasamento || "";
    
    atualizarPainelOrcamento();
    atualizarTabelaConvidados();
    renderizarCronograma();
}

// ==========================================
// MÁSCARAS E SALVAMENTOS DE CONFIGURAÇÃO
// ==========================================
function aplicarMascaraMoeda(event) {
    let valor = event.target.value.replace(/\D/g, '');
    if(valor === "") { event.target.value = ""; return; }
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    event.target.value = "R$ " + valor;
}

function reverterMoeda(valorStr) {
    if(!valorStr) return 0;
    return parseFloat(valorStr.replace("R$ ", "").replace(/\./g, "").replace(",", ".")) || 0;
}

function salvarOrcamentoInicial() {
    let val = reverterMoeda(document.getElementById("orcamentoBusca").value);
    dadosCasais[casalAtual].orcamentoTotal = val;
    document.getElementById("inputOrcamentoTotal").value = val;
    atualizarPainelOrcamento();
}

function salvarQtdConvidadosInicio() {
    let qtd = document.getElementById("qtdConvidadosInicio").value;
    dadosCasais[casalAtual].qtdConvidados = parseInt(qtd) || 0;
    document.getElementById("inputQtdConvidados").value = qtd;
    atualizarPainelOrcamento();
}

function salvarDataCasamento() { dadosCasais[casalAtual].dataCasamento = document.getElementById("dataCasamento").value; }

function salvarConfiguracoesCasalFinanceiro() {
    dadosCasais[casalAtual].orcamentoTotal = parseFloat(document.getElementById("inputOrcamentoTotal").value) || 0;
    dadosCasais[casalAtual].qtdConvidados = parseInt(document.getElementById("inputQtdConvidados").value) || 0;
    carregarDadosDoCasal(); 
}

// ==========================================
// SISTEMA DE TAGS E BUSCA DE FORNECEDORES
// ==========================================
function adicionarFiltroServico() {
    let servico = document.getElementById("inputBuscaServico").value.trim();
    if (servico !== "" && !filtrosSelecionados.includes(servico)) {
        filtrosSelecionados.push(servico);
        renderizarTagsFiltro();
    }
    document.getElementById("inputBuscaServico").value = "";
}

function removerTagFiltro(index) {
    filtrosSelecionados.splice(index, 1);
    renderizarTagsFiltro();
}

function renderizarTagsFiltro() {
    let container = document.getElementById("tagsFiltro");
    container.innerHTML = "";
    filtrosSelecionados.forEach((filtro, index) => {
        container.innerHTML += `<div class="tag-item">${filtro} <span onclick="removerTagFiltro(${index})">X</span></div>`;
    });
}

function buscarFornecedores() {
    let maxBusca = dadosCasais[casalAtual].orcamentoTotal;
    let divResultados = document.getElementById("resultadosBusca");

    if (maxBusca <= 0) return alert("Defina o orçamento disponível antes de buscar.");
    if (filtrosSelecionados.length === 0) return alert("Adicione pelo menos um serviço na lista para filtrar.");

    let resultados = bancoFornecedores.filter(forn => filtrosSelecionados.includes(forn.categoria) && forn.preco <= maxBusca);

    divResultados.innerHTML = ""; 
    if (resultados.length === 0) return divResultados.innerHTML = "<p>Nenhum fornecedor encontrado no orçamento.</p>";

    resultados.forEach(forn => {
        let jaAdicionado = dadosCasais[casalAtual].fornecedores.some(f => f.id === forn.id);
        let botaoHtml = jaAdicionado 
            ? `<button class="btn-card-remover" onclick="removerDoOrcamentoPeloCard(${forn.id})">- Remover do Projeto</button>`
            : `<button class="btn-card-adicionar" onclick="adicionarAoOrcamentoPeloCard(${forn.id})">+ Adicionar ao Projeto</button>`;

        divResultados.innerHTML += `
            <div class="card-fornecedor">
                <span class="categoria">${forn.categoria}</span>
                <h4>${forn.nome}</h4>
                <div class="preco">R$ ${forn.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <div class="contato">📞 ${forn.contato}</div>
                ${botaoHtml}
            </div>
        `;
    });
}

function adicionarAoOrcamentoPeloCard(idFornecedor) {
    dadosCasais[casalAtual].fornecedores.push(bancoFornecedores.find(f => f.id === idFornecedor));
    atualizarPainelOrcamento();
    buscarFornecedores(); 
}

function removerDoOrcamentoPeloCard(idFornecedor) {
    let index = dadosCasais[casalAtual].fornecedores.findIndex(f => f.id === idFornecedor);
    if(index !== -1) {
        dadosCasais[casalAtual].fornecedores.splice(index, 1);
        atualizarPainelOrcamento();
        buscarFornecedores(); 
    }
}

// ==========================================
// ABA ORÇAMENTO (PAINEL FINANCEIRO)
// ==========================================
function atualizarPainelOrcamento() {
    let dados = dadosCasais[casalAtual];
    let totalGasto = dados.fornecedores.reduce((soma, forn) => soma + forn.preco, 0);
    let saldo = dados.orcamentoTotal - totalGasto;
    let custoPorConvidado = dados.qtdConvidados > 0 ? (totalGasto / dados.qtdConvidados) : 0;

    document.getElementById("displayTotalGasto").innerText = `R$ ${totalGasto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    let displaySaldo = document.getElementById("displaySaldo");
    displaySaldo.innerText = `R$ ${saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    displaySaldo.className = saldo < 0 ? "saldo-negativo" : "saldo-positivo";
    document.getElementById("displayCustoPorConvidado").innerText = `R$ ${custoPorConvidado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

    let lista = document.getElementById("listaOrcamento");
    lista.innerHTML = "";
    dados.fornecedores.forEach((forn, index) => {
        lista.innerHTML += `
            <tr>
                <td>${forn.categoria}</td><td>${forn.nome}</td>
                <td>R$ ${forn.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td><button class="btn-remover" onclick="removerDoOrcamentoNaTabela(${index})">Remover</button></td>
            </tr>`;
    });
}
function removerDoOrcamentoNaTabela(index) {
    dadosCasais[casalAtual].fornecedores.splice(index, 1);
    atualizarPainelOrcamento();
    if(document.getElementById("resultadosBusca").innerHTML !== "") buscarFornecedores();
}

// ==========================================
// ABA CONVIDADOS
// ==========================================
function adicionarConvidado() {
    let nome = document.getElementById("nomeConvidado").value;
    let grupo = document.getElementById("grupoConvidado").value;
    if (nome === "") return alert("Digite o nome.");
    dadosCasais[casalAtual].convidados.push({ nome: nome, grupo: grupo, status: "Pendente" });
    document.getElementById("nomeConvidado").value = ""; 
    atualizarTabelaConvidados();
}

function atualizarTabelaConvidados() {
    let tbody = document.getElementById("listaConvidadosTabela");
    tbody.innerHTML = ""; 
    dadosCasais[casalAtual].convidados.forEach((convidado, index) => {
        let corClasse = convidado.status === "Pendente" ? "status-pendente" : convidado.status === "Confirmado" ? "status-confirmado" : "status-ausente";
        tbody.innerHTML += `
            <tr>
                <td><strong>${convidado.nome}</strong></td><td>${convidado.grupo}</td>
                <td>
                    <select class="select-status ${corClasse}" onchange="mudarStatusConvidado(${index}, this.value)">
                        <option value="Pendente" ${convidado.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="Confirmado" ${convidado.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                        <option value="Ausente" ${convidado.status === 'Ausente' ? 'selected' : ''}>Ausente</option>
                    </select>
                </td>
                <td><button class="btn-remover" onclick="removerConvidado(${index})">Deletar</button></td>
            </tr>`;
    });
}
function mudarStatusConvidado(index, novoStatus) { dadosCasais[casalAtual].convidados[index].status = novoStatus; atualizarTabelaConvidados(); }
function removerConvidado(index) { dadosCasais[casalAtual].convidados.splice(index, 1); atualizarTabelaConvidados(); }

// ==========================================
// ABA CRONOGRAMA DINÂMICO
// ==========================================
function adicionarAtividadeCronograma() {
    let hora = document.getElementById("horaCronograma").value;
    let desc = document.getElementById("descCronograma").value;
    
    if (!hora || !desc) return alert("Preencha o horário e a descrição da atividade!");
    
    dadosCasais[casalAtual].cronograma.push({ hora: hora, descricao: desc, concluido: false });
    
    // Ordena pelo horário
    dadosCasais[casalAtual].cronograma.sort((a, b) => a.hora.localeCompare(b.hora));
    
    document.getElementById("horaCronograma").value = "";
    document.getElementById("descCronograma").value = "";
    
    renderizarCronograma();
}

function renderizarCronograma() {
    let lista = document.getElementById("listaCronograma");
    lista.innerHTML = "";
    
    dadosCasais[casalAtual].cronograma.forEach((item, index) => {
        let classeConcluido = item.concluido ? "concluido" : "";
        let checkMarcado = item.concluido ? "checked" : "";
        
        lista.innerHTML += `
            <li class="${classeConcluido}">
                <input type="checkbox" class="check-cronograma" ${checkMarcado} onchange="toggleConcluidoCronograma(${index})">
                <span class="hora-cronograma">${item.hora}</span>
                <span class="desc-texto">${item.descricao}</span>
                <button class="btn-remover" onclick="removerAtividadeCronograma(${index})">Excluir</button>
            </li>
        `;
    });
}

function toggleConcluidoCronograma(index) {
    dadosCasais[casalAtual].cronograma[index].concluido = !dadosCasais[casalAtual].cronograma[index].concluido;
    renderizarCronograma();
}

function removerAtividadeCronograma(index) {
    dadosCasais[casalAtual].cronograma.splice(index, 1);
    renderizarCronograma();
}