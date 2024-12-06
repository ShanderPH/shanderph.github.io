import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { db } from "./firebaseConfig.js";

// Função para carregar dados em tempo real
export function getData(path, callback) {
    const dataRef = ref(db, path);
    onValue(dataRef, callback);
}

// Função para adicionar dados ao banco
export async function addData(path, data) {
    const dataRef = ref(db, path);
    return await push(dataRef, data);
}

// Função para excluir dados
export async function deleteData(path) {
    const dataRef = ref(db, path);
    return await remove(dataRef);
}
