// ===============================================
// Função "cardapio" -> responde em /api/cardapio
// Devolve a lista de itens da cafeteria (dados fictícios)
// ===============================================
const { app } = require("@azure/functions");

const ITENS = [
  { id: "expresso",   emoji: "☕", nome: "Expresso",        descricao: "Curto, forte e cheiroso.",            preco: 6.5 },
  { id: "capuccino",  emoji: "🥛", nome: "Capuccino",       descricao: "Café, leite vaporizado e canela.",    preco: 11.0 },
  { id: "pao-queijo", emoji: "🧀", nome: "Pão de queijo",   descricao: "Quentinho, saído do forno.",          preco: 5.0 },
  { id: "bolo-fuba",  emoji: "🍰", nome: "Bolo de fubá",    descricao: "Receita da vó, com goiabada.",        preco: 8.0 },
  { id: "cha-gelado", emoji: "🧊", nome: "Chá gelado",      descricao: "Hibisco com limão, sem açúcar.",      preco: 7.5 }
];

app.http("cardapio", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log("Alguém pediu o cardápio!");
    return { jsonBody: { itens: ITENS } };
  }
});

module.exports = { ITENS };
