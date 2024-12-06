import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnvSpOqkZ3hpkHzEweb5gj-fELySXvIqo",
    authDomain: "ceia-de-natal-b95c5.firebaseapp.com",
    projectId: "ceia-de-natal-b95c5",
    storageBucket: "ceia-de-natal-b95c5.firebasestorage.app",
    messagingSenderId: "498415554958",
    appId: "1:498415554958:web:ab6081cf302f6f8bb014df",
    measurementId: "G-K3M9D1P9MD",
    databaseURL: "https://ceia-de-natal-b95c5-default-rtdb.firebaseio.com/"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
