const express = require('express');
const cors = require('cors');
const { auditarAnuncio } = require('./auditoria');

const app = express();

// Habilita CORS com configurações padrão
app.use(cors());

// Permite receber JSON no corpo das requisições
app.use(express.json());

// Rota principal para auditoria de anúncio Shopee
app.post('/auditar', async (req, res) => {
  const { url } = req.body;

  // Validação básica da URL
  if (!url || !/^https:\/\/shopee\.com\.br\/.+/.test(url)) {
    return res.status(400).json({ erro: "URL inválida. Envie uma URL completa da Shopee." });
  }

  try {
    const resultado = await auditarAnuncio(url);
    res.json(resultado);
  } catch (err) {
    console.error("❌ Erro na auditoria:", err.message || err);
    res.status(500).json({ erro: "Erro interno ao processar auditoria." });
  }
});

// Porta configurável via variáveis de ambiente (ex: Render) ou 3000 local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
