const puppeteer = require("puppeteer");
const { Configuration, OpenAIApi } = require("openai");

// Configuração da API OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function auditarAnuncio(url) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Caminho do Chrome no Windows
    headless: "new",
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  const titulo = await page.$eval("title", el => el.textContent);
  const conteudo = await page.content();

  await browser.close();

  const prompt = `Analise o seguinte anúncio Shopee e dê uma nota de 0 a 10, com sugestões para melhorar:
Título: ${titulo}
Conteúdo HTML: ${conteudo.slice(0, 4000)}`;

  const resposta = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return {
    nota: "🔎 IA processou",
    feedback: resposta.data.choices[0].message.content.trim(),
  };
}

module.exports = { auditarAnuncio };
