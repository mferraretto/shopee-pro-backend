import { auth, db } from './firebase-init.js';
import { addDoc, collection, Timestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

let uid = "";
onAuthStateChanged(auth, (user) => {
  if (!user) return window.location.href = "index.html";
  uid = user.uid;
});

window.registrarAnalise = async function () {
  const input = document.getElementById("input-anuncio").value;
  if (!input || !uid) return;

  await addDoc(collection(db, "analises"), {
    anuncio: input,
    usuarioId: uid,
    data: Timestamp.now()
  });

  document.getElementById("resposta").innerText = "Análise registrada!";
}