// Selecionando a palavra "Menu"
const botaoMenu = document.querySelector(".titulo-menu a");

// Selecionando a lista de links do menu
const listaDeLinks = document.querySelector(".links-menu");

// Ouvinte de evento para clicar no botao Menu
botaoMenu.addEventListener("click", function(event){
    // Anulando o comportamento padrão do link
    event.preventDefault();
    
    // Alternar a classe aberto entre ativado/desativado
    listaDeLinks.classList.toggle("aberto");

    if(listaDeLinks.classList.contains("aberto")){
        botaoMenu.innerHTML = "Fechar &times;"
    } else {
        botaoMenu.innerHTML = "Menu &equiv;"
    }
});