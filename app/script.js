// ===============================================
// Café da Vila - lógica da página
// Este arquivo conversa com a API (pasta /api)
// ===============================================

const listaCardapio = document.getElementById("lista-cardapio");
const selectItem = document.getElementById("item");
const formPedido = document.getElementById("form-pedido");
const respostaPedido = document.getElementById("resposta-pedido");

// 1) Busca o cardápio na API e mostra na tela
async function carregarCardapio() {
  try {
    const resposta = await fetch("/api/cardapio");
    if (!resposta.ok) throw new Error("A API respondeu com erro " + resposta.status);
    const dados = await resposta.json();

    listaCardapio.innerHTML = "";
    dados.itens.forEach((item) => {
      // Cartão visual do item
      const cartao = document.createElement("div");
      cartao.className = "item";
      cartao.innerHTML = `
        <div class="emoji">${item.emoji}</div>
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <p class="preco">R$ ${item.preco.toFixed(2).replace(".", ",")}</p>`;
      listaCardapio.appendChild(cartao);

      // Opção no formulário de pedido
      const opcao = document.createElement("option");
      opcao.value = item.id;
      opcao.textContent = `${item.emoji} ${item.nome}`;
      selectItem.appendChild(opcao);
    });
  } catch (erro) {
    listaCardapio.innerHTML =
      `<p class="resposta erro">😕 Não consegui falar com a API. ` +
      `Ela está ligada? Detalhe: ${erro.message}</p>`;
  }
}

// 2) Envia o pedido para a API
formPedido.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // impede a página de recarregar

  const pedido = {
    nome: document.getElementById("nome").value,
    item: selectItem.value,
    quantidade: Number(document.getElementById("quantidade").value),
  };

  try {
    const resposta = await fetch("/api/pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });
    const dados = await resposta.json();

    respostaPedido.hidden = false;
    respostaPedido.className = resposta.ok ? "resposta" : "resposta erro";
    respostaPedido.textContent = dados.mensagem;
    if (resposta.ok) formPedido.reset();
  } catch (erro) {
    respostaPedido.hidden = false;
    respostaPedido.className = "resposta erro";
    respostaPedido.textContent = "Não foi possível enviar o pedido: " + erro.message;
  }
});

carregarCardapio();
