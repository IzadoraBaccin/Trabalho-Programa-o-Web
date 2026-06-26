function abrirAba(evento, nomeAba) {
  let abas = document.getElementsByClassName("aba");
  for (let i = 0; i < abas.length; i++) abas[i].style.display = "none";

  let botoes = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < botoes.length; i++)
    botoes[i].className = botoes[i].className.replace(" active", "");

  document.getElementById(nomeAba).style.display = "block";
  evento.currentTarget.className += " active";
}

// banco de dados empresas
const bancoFornecedores = [
  {
    id: 1,
    nome: "Buffet Sabor Nobre",
    categoria: "Buffet",
    preco: 8500,
    contato: "(11) 98888-1111",
  },
  {
    id: 2,
    nome: "Palácio das Festas",
    categoria: "Salão de Festa",
    preco: 5000,
    contato: "(11) 98888-2222",
  },
  {
    id: 3,
    nome: "Chácara Pôr do Sol",
    categoria: "Chácara",
    preco: 3500,
    contato: "(11) 98888-3333",
  },
  {
    id: 4,
    nome: "Florescer Decorações",
    categoria: "Decoração",
    preco: 4000,
    contato: "(11) 98888-4444",
  },
  {
    id: 5,
    nome: "Ana Silva Eventos",
    categoria: "Cerimonialista",
    preco: 2500,
    contato: "(11) 98888-5555",
  },
  {
    id: 6,
    nome: "Studio Bella",
    categoria: "Beleza",
    preco: 800,
    contato: "(11) 98888-6666",
  },
  {
    id: 7,
    nome: "Noiva Perfeita Aluguéis",
    categoria: "Vestido",
    preco: 2000,
    contato: "(11) 98888-7777",
  },
  {
    id: 8,
    nome: "Doce Encanto",
    categoria: "Doceria",
    preco: 1500,
    contato: "(11) 98888-8888",
  },
  {
    id: 9,
    nome: "Cheers Bar",
    categoria: "Drinks",
    preco: 1800,
    contato: "(11) 98888-9999",
  },
  {
    id: 10,
    nome: "Focus Fotografia",
    categoria: "Fotografia",
    preco: 3000,
    contato: "(11) 98888-0000",
  },
  {
    id: 11,
    nome: "Buffet Econômico",
    categoria: "Buffet",
    preco: 4500,
    contato: "(11) 97777-1111",
  },
  {
    id: 12,
    nome: "Chácara Recanto",
    categoria: "Chácara",
    preco: 1800,
    contato: "(11) 97777-2222",
  },
];

let fornecedoresEscolhidos = [];
let orcamentoTotal = 0;

// funcao de busca
function buscarFornecedores() {
  let max = document.getElementById("orcamentoMax").value;
  let divResultados = document.getElementById("resultadosBusca");

  // Pega as categorias selecionadas
  let checkboxes = document.querySelectorAll(".check-categoria:checked");
  let categoriasSelecionadas = Array.from(checkboxes).map((cb) => cb.value);

  if (max === "" || categoriasSelecionadas.length === 0) {
    alert(
      "Por favor, preencha o orçamento máximo e selecione pelo menos um serviço.",
    );
    return;
  }

  // salva o orcamento para a aba de calculos
  orcamentoTotal = parseFloat(max);
  atualizarPainelOrcamento();

  // filtra o banco de dados
  let resultados = bancoFornecedores.filter(
    (forn) =>
      categoriasSelecionadas.includes(forn.categoria) &&
      forn.preco <= orcamentoTotal,
  );

  divResultados.innerHTML = ""; // Limpa resultados anteriores

  if (resultados.length === 0) {
    divResultados.innerHTML =
      "<p>Nenhum fornecedor encontrado nesse valor para as categorias selecionadas.</p>";
    return;
  }

  // monta os cards
  resultados.forEach((forn) => {
    divResultados.innerHTML += `
            <div class="card-fornecedor">
                <span class="categoria">${forn.categoria}</span>
                <h4>${forn.nome}</h4>
                <div class="preco">R$ ${forn.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                <div class="contato">📞 ${forn.contato}</div>
                <button class="btn-acao" onclick="adicionarAoOrcamento(${forn.id})">Adicionar</button>
            </div>
        `;
  });
}

// adiciona fornecedor ao carrinho/orçamento
function adicionarAoOrcamento(id) {
  let fornecedor = bancoFornecedores.find((f) => f.id === id);

  // Verifica se já não foi adicionado
  if (fornecedoresEscolhidos.find((f) => f.id === id)) {
    alert("Este fornecedor já foi adicionado!");
    return;
  }

  fornecedoresEscolhidos.push(fornecedor);
  alert(fornecedor.nome + " adicionado ao seu orçamento!");
  atualizarPainelOrcamento();
}

// atualizar a tela de Orçamento
function atualizarPainelOrcamento() {
  // Calcula o total gasto
  let totalGasto = fornecedoresEscolhidos.reduce(
    (soma, forn) => soma + forn.preco,
    0,
  );
  let saldo = orcamentoTotal - totalGasto;

  // atualiza os textos no topo
  document.getElementById("displayOrcamentoMax").innerText =
    `R$ ${orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  document.getElementById("displayTotalGasto").innerText =
    `R$ ${totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  let displaySaldo = document.getElementById("displaySaldo");
  displaySaldo.innerText = `R$ ${saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  if (saldo < 0) {
    displaySaldo.className = "saldo-negativo";
  } else {
    displaySaldo.className = "saldo-positivo";
  }

  // atualiza a tabela
  let lista = document.getElementById("listaOrcamento");
  lista.innerHTML = "";

  fornecedoresEscolhidos.forEach((forn, index) => {
    lista.innerHTML += `
            <tr>
                <td>${forn.categoria}</td>
                <td>${forn.nome}</td>
                <td>R$ ${forn.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                <td><button class="btn-remover" onclick="removerDoOrcamento(${index})">Remover</button></td>
            </tr>
        `;
  });
}

function removerDoOrcamento(index) {
  fornecedoresEscolhidos.splice(index, 1);
  atualizarPainelOrcamento();
}

// Aba de convidados (mantida como estava)
function adicionarConvidado() {
  let nome = document.getElementById("nomeConvidado").value;
  let grupo = document.getElementById("grupoConvidado").value;
  if (nome === "") return alert("Digite o nome.");

  let tabela = document
    .getElementById("tabelaConvidados")
    .getElementsByTagName("tbody")[0];
  let novaLinha = tabela.insertRow();
  novaLinha.insertCell(0).innerHTML = nome;
  novaLinha.insertCell(1).innerHTML = grupo;
  novaLinha.insertCell(2).innerHTML =
    '<span class="status pendente">Pendente</span>';
  document.getElementById("nomeConvidado").value = "";
}