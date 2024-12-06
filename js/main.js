import { addData } from './database.js';
import { carregarPratos, carregarPratosT } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    carregarPratosT();
    carregarPratos();

    document.getElementById("adicionarPratoBtn").addEventListener("click", () => {
        const input = document.getElementById("nomePrato");
        const nomePrato = input.value.trim();
        if (nomePrato) {
            addData("pratos", { name: nomePrato });
            input.value = "";
        } else {
            alert("Por favor, insira o nome do prato.");
        }
    });
});
 