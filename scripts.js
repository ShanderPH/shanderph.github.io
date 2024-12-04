// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função que carrega os pratos pré definidos
async function carregarPratosT() {
    const container = document.getElementById('cardapioS');

    try {
        const pratosRef = ref(db, "Tradicionais");
        onValue(pratosRef, (snapshot) => {
            container.innerHTML = ""; // Limpa o container antes de recarregar
            snapshot.forEach((childSnapshot) => {
                const prato = childSnapshot.val();
                const pratoId = childSnapshot.key; // Obtem o ID único do prato
                const novoCard = `
                    <div data-prato="${prato.name}" class="cardapio-card" id="${pratoId}">
                        <figure class="thumb">
                            <img src="${prato.url}" alt="${prato.name}">
                        </figure>
                        <div class="inner">
                            <h2>${prato.name}</h2>
                        </div>
                        <div class="user-input" style="display: none;">
                            <input type="text" placeholder="Insira seu nome" class="user-name">
                            <button>OK</button>
                        </div>
                        <p class="user-name-display" style="display: none;"></p>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', novoCard);
            });
        });
    } catch (e) {
        console.error("Erro ao carregar pratos:", e);
    }
}

// Função que carrega os pratos inseridos pelo usuário do banco de dados
async function carregarPratos() {
    const container = document.getElementById('cardapio');

    try {
        const pratosRef = ref(db, "pratos");
        onValue(pratosRef, (snapshot) => {
            container.innerHTML = ""; // Limpa o container antes de recarregar
            snapshot.forEach((childSnapshot) => {
                const prato = childSnapshot.val();
                const pratoId = childSnapshot.key; // Obtem o ID único do prato
                const novoCard = `
                    <div data-prato="${prato.name}" class="cardapio-card" id="${pratoId}">
                        <figure class="thumb">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Ne-qEvtVO9ZCPeKmXH85pBvwfwWDJRM-5g&s" alt="Opção Personalizada">
                        </figure>
                        <div class="inner">
                            <h2>${prato.name}</h2>
                            <button class="delete-btn" data-id="${pratoId}">X</button> <!-- Botão de exclusão -->
                        </div>
                        <div class="user-input" style="display: none;">
                            <input type="text" placeholder="Insira seu nome" class="user-name">
                            <button>OK</button>
                        </div>
                        <p class="user-name-display" style="display: none;"></p>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', novoCard);
            });

             // Adicionar evento de clique para todos os botões de exclusão
             document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    const pratoId = event.target.dataset.id;
                    excluirPrato(pratoId); // Chama a função de exclusão
                })});
        });
    } catch (e) {
        console.error("Erro ao carregar pratos:", e);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarPratosT();
    carregarPratos();

    const container = document.getElementById("cardapio");
    const containerT = document.getElementById("cardapioS")

    // Adiciona evento para exibir o formulário
    container.addEventListener("click", (event) => {
        const card = event.target.closest(".cardapio-card");
        if (card) {
            const form = card.querySelector(".user-input");
            if (form) form.style.display = "flex";
        }
    });

    containerT.addEventListener("click", (event) => {
        const card = event.target.closest(".cardapio-card");
        if (card) {
            const form = card.querySelector(".user-input");
            if (form) form.style.display = "flex";
        }
    });

    // Adiciona evento para salvar o nome
    containerT.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON" && event.target.textContent === "OK") {
            event.stopPropagation(); // Previne que o clique feche o formulário

            const card = event.target.closest(".cardapio-card");
            if (card) {
                const input = card.querySelector(".user-name");
                const nameDisplay = card.querySelector(".user-name-display");
                const form = card.querySelector(".user-input");

                if (input && nameDisplay && form) {
                    if (input.value.trim() !== "") {
                        nameDisplay.textContent = input.value;
                        nameDisplay.style.display = "block";
                        form.style.display = "none";
                        input.value = ""; // Limpa o campo de texto
                    }
                }
            }
        }
    });
    
    container.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON" && event.target.textContent === "OK") {
            event.stopPropagation(); // Previne que o clique feche o formulário

            const card = event.target.closest(".cardapio-card");
            if (card) {
                const input = card.querySelector(".user-name");
                const nameDisplay = card.querySelector(".user-name-display");
                const form = card.querySelector(".user-input");

                if (input && nameDisplay && form) {
                    if (input.value.trim() !== "") {
                        nameDisplay.textContent = input.value;
                        nameDisplay.style.display = "block";
                        form.style.display = "none";
                        input.value = ""; // Limpa o campo de texto
                    }
                }
            }
        }
    });

    // Adiciona evento para fechar o formulário ao clicar fora
    document.addEventListener("click", (event) => {
        const allForms = document.querySelectorAll(".user-input");
        allForms.forEach((form) => {
            if (!form.contains(event.target) && !event.target.closest(".cardapio-card")) {
                form.style.display = "none";
            }
        });
    });
});


// Função para adicionar novos pratos
async function adicionarPrato(newPlate) {
    try {
        const pratosRef = ref(db, "pratos");
        const docRef = await push(pratosRef, {
            name: newPlate
        });
        console.log("Prato adicionado com ID:", docRef.key);
    } catch (e) {
        console.error("Erro ao adicionar prato:", e);
    }
}

// Ação do botão adicionar pratos
document.getElementById('adicionarPratoBtn').addEventListener('click', () => {
    const input = document.getElementById('nomePrato');
    const nomePrato = input.value.trim();

    if (nomePrato) {
        adicionarPrato(nomePrato); // Chama a função para adicionar o prato
        input.value = ''; // Limpa o campo de entrada
    } else {
        alert('Por favor, insira o nome do prato.');
    }
});

//Função para excluir pratos adicionados

async function excluirPrato(pratoId) {
    try {
        const pratoRef = ref(db, `pratos/${pratoId}`);
        await remove(pratoRef); // Remove o prato do banco de dados
        console.log("Prato excluído com sucesso:", pratoId);
    } catch (e) {
        console.error("Erro ao excluir prato:", e);
    }
}

//Fim das funções para adicionar, carregar e excluir pratos
// Abrir o formulário ao clicar no card
document.querySelectorAll(".cardapio-card").forEach((card) => {
    card.addEventListener("click", () => {
        const form = card.querySelector(".user-input");
        form.style.display = "flex";
    });

    const button = card.querySelector("button");
    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Previne que o clique feche o formulário

        const input = card.querySelector(".user-name");
        const nameDisplay = card.querySelector(".user-name-display");

        if (input.value.trim() !== "") {
            nameDisplay.textContent = input.value;
            nameDisplay.style.display = "block";
            card.querySelector(".user-input").style.display = "none";
            input.value = ""; // Limpa o campo de texto
        }
    });
});

