const express = require('express');
const cors = require('cors');
const { auditarAnuncio } = require('./auditoria');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auditar', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes("shopee.com.br/product")) {
    return res.status(400).json({ erro: "URL inválida." });
  }

  try {
    const resultado = await auditarAnuncio(url);
    res.json(resultado);
  } catch (err) {
    console.error("Erro na auditoria:", err);
    res.status(500).json({ erro: "Erro interno ao processar auditoria." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));