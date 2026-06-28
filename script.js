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

let dadosCasais = {
    "lucas_camila": { orcamentoTotal: 40000, qtdConvidados: 150, dataCasamento: "", fornecedores: [], convidados: [] },
    "gabriel_joice": { orcamentoTotal: 25000, qtdConvidados: 80, dataCasamento: "", fornecedores: [], convidados: [] },
    "aline_carlos": { orcamentoTotal: 60000, qtdConvidados: 200, dataCasamento: "", fornecedores: [], convidados: [] },
    "guilherme_junior": { orcamentoTotal: 30000, qtdConvidados: 100, dataCasamento: "", fornecedores: [], convidados: [] },
    "brenda_camila": { orcamentoTotal: 45000, qtdConvidados: 120, dataCasamento: "", fornecedores: [], convidados: [] }
};

let casalAtual = "lucas_camila";

window.onload = function() {
    carregarDadosDoCasal();
};

// ==========================================
// MÁSCARA E FORMATAÇÃO DE MOEDA
// ==========================================
function aplicarMascaraMoeda(event) {
    let valor = event.target.value.replace(/\D/g, '');
    if(valor === "") { event.target.value = ""; return; }
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    event.target.value = "R$ " + valor;
}

function reverterMascaraParaNumero(valorApresentado) {
    if(!valorApresentado) return 0;
    let semLetras = valorApresentado.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
    return parseFloat(semLetras) || 0;
}

// ==========================================
// NAVEGAÇÃO E PERFIS
// ==========================================
function abrirAba(evento, nomeAba) {
    let abas = document.getElementsByClassName("aba");
    for (let i = 0; i < abas.length; i++) abas[i].style.display = "none";
    let botoes = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botoes.length; i++) botoes[i].className = botoes[i].className.replace(" active", "");
    document.getElementById(nomeAba).style.display = "block";
    evento.currentTarget.className += " active";
}

function mudarProjeto() {
    casalAtual = document.getElementById("projetoAtual").value;
    document.getElementById("resultadosBusca").innerHTML = ""; 
    carregarDadosDoCasal();
}

function adicionarNovoCasal() {
    let nome = prompt("Digite o nome dos noivos (Ex: João e Maria):");
    if(nome) criarPerfilCasal(nome);
}

function modoNoivos() {
    criarPerfilCasal("Meu Casamento (Noivos)");
}

function criarPerfilCasal(nomeFormatado) {
    let idGerado = nomeFormatado.toLowerCase().replace(/[^a-z0-9]/g, "_");
    
    // Evita duplicidade
    if(!dadosCasais[idGerado]) {
        dadosCasais[idGerado] = { orcamentoTotal: 0, qtdConvidados: 0, dataCasamento: "", fornecedores: [], convidados: [] };
        
        let select = document.getElementById("projetoAtual");
        let option = document.createElement("option");
        option.text = nomeFormatado;
        option.value = idGerado;
        select.add(option);
    }
    
    document.getElementById("projetoAtual").value = idGerado;
    mudarProjeto();
}

function carregarDadosDoCasal() {
    let dados = dadosCasais[casalAtual];
    document.getElementById("inputOrcamentoTotal").value = dados.orcamentoTotal || "";
    document.getElementById("inputQtdConvidados").value = dados.qtdConvidados || "";
    
    // Preenche campo de data no Início
    document.getElementById("dataCasamento").value = dados.dataCasamento || "";
    
    atualizarPainelOrcamento();
    atualizarTabelaConvidados();
}

function salvarDataCasamento() {
    dadosCasais[casalAtual].dataCasamento = document.getElementById("dataCasamento").value;
}

function salvarConfiguracoesCasal() {
    let orcamento = document.getElementById("inputOrcamentoTotal").value;
    let qtd = document.getElementById("inputQtdConvidados").value;
    dadosCasais[casalAtual].orcamentoTotal = parseFloat(orcamento) || 0;
    dadosCasais[casalAtual].qtdConvidados = parseInt(qtd) || 0;
    atualizarPainelOrcamento();
}

// ==========================================
// ABA BUSCA / INÍCIO
// ==========================================
function buscarFornecedores() {
    let inputOrcamento = document.getElementById("orcamentoBusca").value;
    let maxBusca = reverterMascaraParaNumero(inputOrcamento);
    let divResultados = document.getElementById("resultadosBusca");
    
    let checkboxes = document.querySelectorAll(".check-categoria:checked");
    let categoriasSelecionadas = Array.from(checkboxes).map(cb => cb.value);

    if (maxBusca <= 0 || categoriasSelecionadas.length === 0) {
        alert("Preencha um orçamento válido e selecione pelo menos um serviço.");
        return;
    }

    let resultados = bancoFornecedores.filter(forn => 
        categoriasSelecionadas.includes(forn.categoria) && forn.preco <= maxBusca
    );

    divResultados.innerHTML = ""; 
    if (resultados.length === 0) {
        divResultados.innerHTML = "<p>Nenhum fornecedor compatível com este valor e filtro.</p>";
        return;
    }

    resultados.forEach(forn => {
        divResultados.innerHTML += `
            <div class="card-fornecedor">
                <span class="categoria">${forn.categoria}</span>
                <h4>${forn.nome}</h4>
                <div class="preco">R$ ${forn.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <div class="contato">📞 ${forn.contato}</div>
                <button class="btn-acao" style="padding: 8px 15px; font-size:0.85rem;" onclick="adicionarAoOrcamento(${forn.id})">Adicionar Projeto</button>
            </div>
        `;
    });
}

function adicionarAoOrcamento(idFornecedor) {
    let fornecedor = bancoFornecedores.find(f => f.id === idFornecedor);
    if(dadosCasais[casalAtual].fornecedores.find(f => f.id === idFornecedor)) {
        alert("Fornecedor já cadastrado no orçamento deste casal!");
        return;
    }
    dadosCasais[casalAtual].fornecedores.push(fornecedor);
    alert(fornecedor.nome + " salvo com sucesso!");
    atualizarPainelOrcamento();
}

function removerDoOrcamento(index) {
    dadosCasais[casalAtual].fornecedores.splice(index, 1);
    atualizarPainelOrcamento();
}

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
                <td><button class="btn-remover" onclick="removerDoOrcamento(${index})">Remover</button></td>
            </tr>
        `;
    });
}

// ==========================================
// ABA CONVIDADOS (Pendente, Confirmado, Ausente)
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
        // Cores com base no novo status
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