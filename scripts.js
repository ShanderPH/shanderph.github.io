// Importação das funções do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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
  measurementId: "G-K3M9D1P9MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função que adiciona novos pratos
async function adicionarPrato(newPlate) {
    const container = document.getElementById('cardapio');

    // Criar novo prato no banco de dados Firebase
    try {
        const docRef = await addDoc(collection(db, "pratos"), {
            name: newPlate
        });
        console.log("Prato adicionado com ID:", docRef.id);

    const novoCard = `
                <div data-prato="personalChoice" class="cardapio-card">
                    <figure class="thumb">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Ne-qEvtVO9ZCPeKmXH85pBvwfwWDJRM-5g&s" alt="Opção Personalizada">
                    </figure>
                    <div class="inner">
                        <h2>${newPlate}</h2>
                    </div>
                </div>
            `;
    container.insertAdjacentHTML('beforeend', novoCard);
} catch (e) {
    console.error("Erro ao adicionar prato:", e);
}
}

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

async function carregarPratos() {
    const container = document.getElementById('cardapio');

    try {
        const querySnapshot = await getDocs(collection(db, "pratos"));
        querySnapshot.forEach((doc) => {
            const prato = doc.data();
            const novoCard = `
                <div data-prato="personalChoice" class="cardapio-card">
                    <figure class="thumb">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Ne-qEvtVO9ZCPeKmXH85pBvwfwWDJRM-5g&s" alt="Opção Personalizada">
                    </figure>
                    <div class="inner">
                        <h2>${prato.name}</h2>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', novoCard);
        });
    } catch (e) {
        console.error("Erro ao carregar pratos:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarPratos();
});

// Função que adiciona novos pratos
// function adicionarPrato(newPlate) {
//     const container = document.getElementById('cardapio');

//     const novoCard = `
//                 <div data-prato="personalChoice" class="cardapio-card">
//                     <figure class="thumb">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Ne-qEvtVO9ZCPeKmXH85pBvwfwWDJRM-5g&s" alt="Opção Personalizada">
//                     </figure>
//                     <div class="inner">
//                         <h2>${newPlate}</h2>
//                     </div>
//                 </div>
//             `;
//     container.insertAdjacentHTML('beforeend', novoCard);
// }

// Função que adiciona novas sobremesas
function adicionarSobre(newDeserve) {
    const container = document.getElementById('cardapioS');

    const novoCard = `
                <div data-prato="personalChoiceS" class="cardapio-card">
                    <figure class="thumb">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Ne-qEvtVO9ZCPeKmXH85pBvwfwWDJRM-5g&s" alt="Opção Personalizada">
                    </figure>
                    <div class="inner">
                        <h2>${newDeserve}</h2>
                    </div>
                </div>
            `;
    container.insertAdjacentHTML('beforeend', novoCard);
}

document.getElementById('adicionarSobreBtn').addEventListener('click', () => {
    const inputS = document.getElementById('deserveInput');
    const newDeserve = inputS.value.trim();

    if (newDeserve) {
        adicionarSobre(newDeserve);
        inputS.value = ''; // Limpa o campo de entrada
    } else {
        alert('Por favor, insira o nome de uma sobremesa.');
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".cardapio-card");
    const detalheReceita = document.getElementById("detalhe-receita");
    const nomePrato = document.getElementById("nome-prato");
    const descricaoReceita = document.getElementById("descricao-receita");
    const inputNome = document.getElementById("input-nome");
    const fecharDetalhe = document.getElementById("fechar-detalhe");

    // Receita de exemplo
    const receitaTexto = "Esta é uma receita deliciosa de Lagarto Assado. Tempere bem e asse com amor!";

    // Clique no card
    card.addEventListener("click", () => {
        const prato = card.getAttribute("data-prato");

        // Exibe o contêiner com detalhes
        nomePrato.textContent = prato;
        descricaoReceita.textContent = receitaTexto;
        detalheReceita.style.display = "block";
    });

    // Botão de fechar
    fecharDetalhe.addEventListener("click", () => {
        detalheReceita.style.display = "none";
        inputNome.value = ""; // Limpa o campo de entrada
    });
});
