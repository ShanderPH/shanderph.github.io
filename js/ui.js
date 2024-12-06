import { ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { db } from "./firebaseConfig.js";

export function addClickListener(selector, callback) {
    document.querySelectorAll(selector).forEach((element) => {
        element.addEventListener("click", callback);
    });
}

async function salvarNomeNoBanco(pratoId, nome) {
    try {
        const pratoRef = ref(db, `pratos/${pratoId}`);
        await update(pratoRef, { userName: nome }); // Atualiza ou adiciona o campo `userName`
    } catch (error) {
        console.error("Erro ao salvar nome no banco:", error);
    }
}

async function salvarNomeNoBancoT(pratoId, nome) {
    try {
        const pratoRef = ref(db, `Tradicionais/${pratoId}`);
        await update(pratoRef, { userName: nome }); // Atualiza ou adiciona o campo `userName`
    } catch (error) {
        console.error("Erro ao salvar nome no banco:", error);
    }
}

export async function carregarPratosT() {
    const container = document.getElementById('cardapioS');

    try {
        const pratosRef = ref(db, "Tradicionais");
        onValue(pratosRef, (snapshot) => {
            container.innerHTML = ""; // Limpa o container antes de recarregar
            snapshot.forEach((childSnapshot) => {
                const prato = childSnapshot.val();
                const pratoId = childSnapshot.key; // Obtem o ID único do prato
                const userName = prato.userName || ""; // Nome salvo no banco ou vazio

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
                        <p class="user-name-display" style="display: ${userName ? 'block' : 'none'};">${userName}</p>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', novoCard);
            });
        });
    } catch (e) {
        console.error("Erro ao carregar pratos:", e);
    };
}

export async function excluirPrato(pratoId) {
    try {
        const pratoRef = ref(db, `pratos/${pratoId}`);
        await remove(pratoRef); // Remove o prato do banco de dados
        console.log("Prato excluído com sucesso:", pratoId);
    } catch (e) {
        console.error("Erro ao excluir prato:", e);
    }
}


export async function carregarPratos() {
    const container = document.getElementById('cardapio');

    try {
        const pratosRef = ref(db, "pratos");
        onValue(pratosRef, (snapshot) => {
            container.innerHTML = ""; // Limpa o container antes de recarregar
            snapshot.forEach((childSnapshot) => {
                const prato = childSnapshot.val();
                const pratoId = childSnapshot.key; // Obtem o ID único do prato
                const userName = prato.userName || ""; // Nome salvo no banco ou vazio

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
                        <p class="user-name-display" style="display: ${userName ? 'block' : 'none'};">${userName}</p>
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

document.addEventListener("click", (event) => {
    const card = event.target.closest(".cardapio-card");
    if (card) {
        const nameDisplay = card.querySelector(".user-name-display"); // Verifica o elemento de nome
        const computedStyle = window.getComputedStyle(nameDisplay);
        if (computedStyle.display === "block" && nameDisplay.textContent.trim() !== "") {
            alert("Um nome já foi inserido para este item.");
            return;
        } else {
            const form = card.querySelector(".user-input");
            if (form) form.style.display = "flex"; // Exibe o formulário caso o nome ainda não esteja inserido

        }
    }
});

// Adiciona evento para salvar o nome
document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.textContent === "OK") {
        event.stopPropagation(); // Previne que o clique feche o formulário

        const card = event.target.closest(".cardapio-card");
        if (card) {
            const pratoId = card.id; // Obtém o ID único do prato
            const input = card.querySelector(".user-name");
            const nameDisplay = card.querySelector(".user-name-display");
            const form = card.querySelector(".user-input");

            if (input && nameDisplay && form) {
                const userName = input.value.trim();
                if (userName !== "") {
                    nameDisplay.textContent = userName;
                    nameDisplay.style.display = "block";
                    form.style.display = "none";
                    input.value = ""; // Limpa o campo de texto

                    // Verifica se o card está dentro do elemento <span id="cardapioS">
                    const isCardapioS = card.closest("#cardapioS") !== null;

                    if (isCardapioS) {
                        salvarNomeNoBancoT(pratoId, userName); // Chama a função específica
                    } else {
                        salvarNomeNoBanco(pratoId, userName); // Chama a função padrão
                    }
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
 