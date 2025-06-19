// firebase-init.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do projeto no Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpeLLtMasPdbWcffrDZQ0a_G-CtBhkbVk",
  authDomain: "shopee-pro-v2.firebaseapp.com",
  projectId: "shopee-pro-v2",
  storageBucket: "shopee-pro-v2.appspot.com",
  messagingSenderId: "627773073455",
  appId: "1:627773073455:web:ba85fbd1f3a2661f267eda"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta autenticação e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
