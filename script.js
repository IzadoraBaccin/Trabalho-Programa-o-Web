// Base de dados simulada
const bancoFornecedores = [
    { id: 1, nome: "Buffet Sabor Nobre", categoria: "Buffet", preco: 8500, contato: "(11) 98888-1111" },
    { id: 2, nome: "Palácio das Festas", categoria: "Salão de Festa", preco: 5000, contato: "(11) 98888-2222" },
    { id: 3, nome: "Chácara Pôr do Sol", categoria: "Chácara", preco: 3500, contato: "(11) 98888-3333" },
    { id: 4, nome: "Florescer Decorações", categoria: "Decoração", preco: 4000, contato: "(11) 98888-4444" },
    { id: 5, nome: "Ana Silva Eventos", categoria: "Cerimonialista", preco: 2500, contato: "(11) 98888-5555" },
    { id: 6, nome: "Studio Bella", categoria: "Beleza", preco: 800, contato: "(11) 98888-6666" },
    { id: 7, nome: "Noiva Perfeita", categoria: "Vestido", preco: 2000, contato: "(11) 98888-7777" },
    { id: 8, nome: "Doce Encanto", categoria: "Doceria", preco: 1500, contato: "(11) 98888-8888" },
    { id: 9, nome: "Cheers Bar", categoria: "Drinks", preco: 1800, contato: "(11) 98888-9999" },
    { id: 10, nome: "Focus Fotografia", categoria: "Fotografia", preco: 3000, contato: "(11) 98888-0000" }
];

let dadosCasais = {};
let casalAtual = "";
let filtrosSelecionados = [];

// ==========================================
// INICIALIZAÇÃO
// ==========================================
window.onload = function() {
    // Cria projetos padrão para o exemplo
    dadosCasais = {
        "lucas_camila": { nomeProjeto: "Lucas e Camila", orcamentoTotal: 40000, qtdConvidados: 150, dataCasamento: "", fornecedores: [], convidados: [] },
        "gabriel_joice": { nomeProjeto: "Gabriel e Joice", orcamentoTotal: 25000, qtdConvidados: 80, dataCasamento: "", fornecedores: [], convidados: [] }
    };
    atualizarSelectProjetos();
    casalAtual = "lucas_camila";
    carregarDadosDoCasal();
};

function abrirAba(evento, nomeAba) {
    let abas = document.getElementsByClassName("aba");
    for (let i = 0; i < abas.length; i++) abas[i].style.display = "none";
    let botoes = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botoes.length; i++) botoes[i].className = botoes[i].className.replace(" active", "");
    document.getElementById(nomeAba).style.display = "block";
    evento.currentTarget.className += " active";
}

// ==========================================
// ABA PERFIL E GESTÃO DE PROJETOS
// ==========================================
function alterarTipoConta() {
    let tipo = document.getElementById("perfilTipo").value;
    let boxProjetos = document.getElementById("areaGestaoProjetos");
    let boxSeletor = document.getElementById("boxSeletorProjetos");
    
    if(tipo === "noivos") {
        boxProjetos.style.display = "none";
        boxSeletor.style.display = "none";
        
        // Se for noivos, usa apenas 1 projeto interno
        dadosCasais = { "meu_casamento": { nomeProjeto: "Meu Casamento", orcamentoTotal: 0, qtdConvidados: 0, dataCasamento: "", fornecedores: [], convidados: [] }};
        casalAtual = "meu_casamento";
        carregarDadosDoCasal();
    } else {
        boxProjetos.style.display = "block";
        boxSeletor.style.display = "block";
        // Restaura projetos vazios de exemplo
        dadosCasais = {};
        atualizarSelectProjetos();
    }
}

function salvarPerfil() {
    let nome = document.getElementById("perfilNome").value;
    if(nome) alert("Perfil de " + nome + " salvo com sucesso!");
}

function criarNovoProjeto() {
    let nome = document.getElementById("novoProjetoNome").value;
    if(!nome) return;

    let idGerado = nome.toLowerCase().replace(/[^a-z0-9]/g, "_");
    if(!dadosCasais[idGerado]) {
        dadosCasais[idGerado] = { nomeProjeto: nome, orcamentoTotal: 0, qtdConvidados: 0, dataCasamento: "", fornecedores: [], convidados: [] };
        atualizarSelectProjetos();
        document.getElementById("projetoAtual").value = idGerado;
        mudarProjeto();
    }
    document.getElementById("novoProjetoNome").value = "";
    alert("Projeto criado!");
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

// ==========================================
// MÁSCARA E SINCRONIZAÇÃO DE DADOS BÁSICOS
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

function carregarDadosDoCasal() {
    let dados = dadosCasais[casalAtual];
    
    // Inputs da Aba Orçamento (Painel)
    document.getElementById("inputOrcamentoTotal").value = dados.orcamentoTotal || "";
    document.getElementById("inputQtdConvidados").value = dados.qtdConvidados || "";
    
    // Inputs da Aba Início (Sincronizados)
    let valorReais = dados.orcamentoTotal > 0 ? "R$ " + dados.orcamentoTotal.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "";
    document.getElementById("orcamentoBusca").value = valorReais;
    document.getElementById("qtdConvidadosInicio").value = dados.qtdConvidados || "";
    document.getElementById("dataCasamento").value = dados.dataCasamento || "";
    
    atualizarPainelOrcamento();
    atualizarTabelaConvidados();
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

function salvarDataCasamento() {
    dadosCasais[casalAtual].dataCasamento = document.getElementById("dataCasamento").value;
}

function salvarConfiguracoesCasalFinanceiro() {
    let orc = document.getElementById("inputOrcamentoTotal").value;
    let qtd = document.getElementById("inputQtdConvidados").value;
    
    dadosCasais[casalAtual].orcamentoTotal = parseFloat(orc) || 0;
    dadosCasais[casalAtual].qtdConvidados = parseInt(qtd) || 0;
    
    carregarDadosDoCasal(); // Força atualização dos campos na aba inicial
}

// ==========================================
// SISTEMA DE TAGS E BUSCA
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
        container.innerHTML += `
            <div class="tag-item">
                ${filtro} <span onclick="removerTagFiltro(${index})">X</span>
            </div>
        `;
    });
}

function buscarFornecedores() {
    let maxBusca = dadosCasais[casalAtual].orcamentoTotal;
    let divResultados = document.getElementById("resultadosBusca");

    if (maxBusca <= 0) {
        alert("Defina o orçamento disponível antes de buscar.");
        return;
    }

    if (filtrosSelecionados.length === 0) {
        alert("Adicione pelo menos um serviço na lista para filtrar.");
        return;
    }

    let resultados = bancoFornecedores.filter(forn => 
        filtrosSelecionados.includes(forn.categoria) && forn.preco <= maxBusca
    );

    divResultados.innerHTML = ""; 
    if (resultados.length === 0) {
        divResultados.innerHTML = "<p style='color:#666;'>Nenhum fornecedor encontrado que atenda a este orçamento e filtros.</p>";
        return;
    }

    // Renderiza os Cards com lógica condicional Adicionar/Remover
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
    let fornecedor = bancoFornecedores.find(f => f.id === idFornecedor);
    dadosCasais[casalAtual].fornecedores.push(fornecedor);
    atualizarPainelOrcamento();
    buscarFornecedores(); // Recarrega os botões da busca
}

function removerDoOrcamentoPeloCard(idFornecedor) {
    let index = dadosCasais[casalAtual].fornecedores.findIndex(f => f.id === idFornecedor);
    if(index !== -1) {
        dadosCasais[casalAtual].fornecedores.splice(index, 1);
        atualizarPainelOrcamento();
        buscarFornecedores(); // Recarrega os botões da busca
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
                <td>${forn.categoria}</td>
                <td>${forn.nome}</td>
                <td>R$ ${forn.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td><button class="btn-remover" onclick="removerDoOrcamentoNaTabela(${index})">Remover</button></td>
            </tr>
        `;
    });
}

function removerDoOrcamentoNaTabela(index) {
    dadosCasais[casalAtual].fornecedores.splice(index, 1);
    atualizarPainelOrcamento();
    // Atualiza a visualização da busca caso ela esteja aberta
    let divResultados = document.getElementById("resultadosBusca");
    if(divResultados.innerHTML !== "") buscarFornecedores();
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
        let corClasse = convidado.status === "Pendente" ? "status-pendente" : 
                        convidado.status === "Confirmado" ? "status-confirmado" : "status-ausente";

        tbody.innerHTML += `
            <tr>
                <td><strong>${convidado.nome}</strong></td>
                <td>${convidado.grupo}</td>
                <td>
                    <select class="select-status ${corClasse}" onchange="mudarStatusConvidado(${index}, this.value)">
                        <option value="Pendente" ${convidado.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="Confirmado" ${convidado.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                        <option value="Ausente" ${convidado.status === 'Ausente' ? 'selected' : ''}>Ausente</option>
                    </select>
                </td>
                <td><button class="btn-remover" onclick="removerConvidado(${index})">Deletar</button></td>
            </tr>
        `;
    });
}

function mudarStatusConvidado(index, novoStatus) {
    dadosCasais[casalAtual].convidados[index].status = novoStatus;
    atualizarTabelaConvidados(); 
}

function removerConvidado(index) {
    dadosCasais[casalAtual].convidados.splice(index, 1);
    atualizarTabelaConvidados();
}