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
