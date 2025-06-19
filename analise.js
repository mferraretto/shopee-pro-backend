
import { db, auth } from './firebase-init.js';
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

window.analisar = async () => {
  const descricao = document.getElementById("descricao").value.trim();
  const resposta = document.getElementById("resposta");

  if (!descricao) return resposta.innerText = "Cole a descrição para analisar.";

  resposta.innerText = "Analisando com IA...";

  // Simulação de análise
  const resultado = "✅ Otimização necessária em: título, imagem principal e prova social.";

  const user = auth.currentUser;
  if (user) {
    await addDoc(collection(db, "analises"), {
      uid: user.uid,
      descricao,
      resultado,
      data: new Date().toISOString()
    });
  }

  resposta.innerText = resultado;
};
