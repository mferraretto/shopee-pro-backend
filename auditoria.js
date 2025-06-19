const { chromium } = require("playwright");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function auditarAnuncio(url) {
  // Inicia o navegador em modo headless
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Acessa a URL e espera o carregamento do DOM
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  // Coleta título e HTML da página
  const titulo = await page.title();
  const conteudo = await page.content();

  await browser.close();

  // Cria o prompt para o modelo da OpenAI
  const prompt = `Analise o seguinte anúncio Shopee e dê uma nota de 0 a 10, com sugestões para melhorar:
Título: ${titulo}
Conteúdo HTML: ${conteudo.slice(0, 4000)}`;

  // Envia o prompt para o ChatGPT (API da OpenAI)
  const resposta = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  // Retorna o resultado
  return {
    nota: "🔎 IA processou",
    feedback: resposta.choices[0].message.content.trim(),
  };
}

module.exports = { auditarAnuncio };
