/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = document.querySelector("#cep");
const campoTelefone = document.querySelector("#telefone");
const campoEndereco = document.querySelector("#endereco");
const campoBairro = document.querySelector("#bairro");
const campoCidade = document.querySelector("#cidade");
const campoEstado = document.querySelector("#estado");
const botaoBuscar = document.querySelector("#buscar");
const mensagemStatus = document.querySelector("#status");

// ativação das mascaras para telefone e Cep
$(campoTelefone).mask("(00) 0000-0000")
$(campoCep).mask("00000-000")

// Ouvinte de evento para o botão Buscar
botaoBuscar.addEventListener("click", async function () {
    // Verificando se o CEP digitado NÃO TEM 9 dígitos
    if (campoCep.value.length !== 9) {
        mensagemStatus.innerHTML = "Digite um CEP válido!";
        mensagemStatus.style.color = "purple";

        // parar completamente a execucao do codigo
        return;
    }

    //guardando o valor do cep digitado
    let cepDigitado = campoCep.value;
    console.log(cepDigitado);

    // AJAX
    /* Tecnica de comunicacao assincrona (transmissao, recebimento) de dados
    MUITO USADA entre diferentes tipos de sistemas (site, aplicativo, jogo
    e software) e tecnologia (PHP, ASP, JAVA etc) */

    let endereco = `https://viacep.com.br/ws/${cepDigitado}/json/`;

    // Etapa 2 : acessando o ViaCep com o endereco ajustado
    const resposta = await fetch(endereco);

    // Etapa3 : extrair os dados que o ViaCep processou
    const dados = await resposta.json(); // formato de objeto
    console.log(dados);

    //Etapa 4 lidando com os dados(em caso de erro ou sucesso)
    if ("erro" in dados) {
        mensagemStatus.innerHTML = "CEP inexistente!";
        mensagemStatus.style.color = "red";

    }
    else {
        mensagemStatus.innerHTML = "CEP encontrado";
        mensagemStatus.style.color = "blue";


        // selecionando os campos que estão escondidos
        const campos = document.querySelectorAll(".campos-restantes");

        // Loop for para acessar cada campo e remover a classe
        for (let i = 0; i < campos.length; i++) {
            campos[i].classList.remove("campos-restantes");
        }

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;

    }

});