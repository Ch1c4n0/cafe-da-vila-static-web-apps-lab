// ===============================================
// Função "pedido" -> responde em /api/pedido (POST)
// Recebe um pedido, confere se está certo e devolve um número.
// Obs.: é fictício, nada é salvo em banco de dados.
// ===============================================
const { app } = require("@azure/functions");
const { ITENS } = require("./cardapio");

app.http("pedido", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    let dados;
    try {
      dados = await request.json();
    } catch {
      return { status: 400, jsonBody: { mensagem: "Não entendi o pedido (JSON inválido)." } };
    }

    const item = ITENS.find((i) => i.id === dados.item);
    const quantidade = Number(dados.quantidade);

    if (!dados.nome || !item || !(quantidade >= 1 && quantidade <= 10)) {
      return { status: 400, jsonBody: { mensagem: "Faltou alguma informação: nome, item ou quantidade (1 a 10)." } };
    }

    const numero = Math.floor(1000 + Math.random() * 9000);
    const total = (item.preco * quantidade).toFixed(2).replace(".", ",");
    context.log(`Pedido #${numero}: ${quantidade}x ${item.nome} para ${dados.nome}`);

    return {
      jsonBody: {
        numero,
        mensagem: `✅ Obrigado, ${dados.nome}! Pedido #${numero}: ${quantidade}x ${item.emoji} ${item.nome}. Total: R$ ${total}.`
      }
    };
  }
});
