import { auth, db } from './firebase-init.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) return window.location.href = "index.html";

  const uid = user.uid;
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);
  const dados = snap.exists() ? snap.data() : { plano: "Gratuito", limite: 3, nome: "Usuário", renovacao: "-" };

  document.getElementById("dados-usuario").innerHTML = `
    <p>👤 <strong>${dados.nome}</strong></p>
    <p><strong>Plano:</strong> ${dados.plano}</p>
    <p><strong>Limite de análises hoje:</strong> ${dados.limite}</p>
    <p><strong>Próxima renovação:</strong> ${dados.renovacao}</p>
    <p><a href="planos.html">Fazer Upgrade</a></p>
  `;
});