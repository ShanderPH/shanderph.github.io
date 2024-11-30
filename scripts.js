document.addEventListener("DOMContentLoaded", () => {
  const listaPratos = document.getElementById("lista-pratos");
  const inputPrato = document.getElementById("prato");
  const form = document.getElementById("form-ceia");
  const listaParticipantes = document.getElementById("lista-participantes");

  // Adiciona evento de clique nos pratos
  listaPratos.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const pratoEscolhido = e.target.dataset.prato;
      inputPrato.value = pratoEscolhido;
    }
  });

  // Gerencia o envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const prato = inputPrato.value;

    if (nome && prato) {
      // Cria um novo item na lista com botões de edição e remoção
      const novoParticipante = criarElementoParticipante(nome, prato);
      listaParticipantes.appendChild(novoParticipante);

      // Limpa o formulário
      form.reset();
      inputPrato.value = "";
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  });

  // Função para criar um item de participante com botões de editar e remover
  function criarElementoParticipante(nome, prato) {
    const li = document.createElement("li");

    // Texto do participante
    const texto = document.createElement("label");
    texto.textContent = `${nome} - ${prato}`;
    texto.classList.add("participantes");
    li.appendChild(texto);

    // Botão de editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-editar");
    btnEditar.addEventListener("click", () => editarParticipante(li, nome, prato));
    li.appendChild(btnEditar);

    // Botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btn-remover");
    btnRemover.addEventListener("click", () => removerParticipante(li));
    li.appendChild(btnRemover);

    return li;
  }

  // Função para editar um participante
  function editarParticipante(item, nomeAtual, pratoAtual) {
    const novoNome = prompt("Digite o novo nome:", nomeAtual);
    const novoPrato = prompt("Digite o novo prato:", pratoAtual);

    if (novoNome && novoPrato) {
      // Atualiza o texto do participante
      const texto = item.querySelector("span");
      texto.textContent = `${novoNome} - ${novoPrato}`;
    } else {
      alert("Nome e prato não podem estar vazios.");
    }
  }

  // Função para remover um participante
  function removerParticipante(item) {
    if (confirm("Tem certeza que deseja remover este participante?")) {
      listaParticipantes.removeChild(item);
    }
  }
});
