/**
 * Projeto: posting--page
 * Objetivo: Simular a criação de um post enviando dados para uma API e renderizando o retorno.
 */

// 1. Seletores
const formulario = document.querySelector('#formulario-post');
const inputTitulo = document.querySelector('#titulo');
const inputConteudo = document.querySelector('#conteudo');

const renderizadorTitulo = document.querySelector('#renderizador-titulo');
const renderizadorConteudo = document.querySelector('#renderizador-conteudo');
const botaoPostar = document.querySelector('#botao-postar');

// 2. Event Listener para o envio do formulário
formulario.addEventListener('submit', (event) => {
    // 2.3 Prevenir comportamento padrão
    event.preventDefault();

    // Desabilitar o botão enquanto carrega
    botaoPostar.textContent = 'Enviando...';
    botaoPostar.disabled = true;

    // 2.4 Montar o objeto de dados
    const data = {
        title: inputTitulo.value,
        body: inputConteudo.value,
        userId: 1
    };

    // Chamada da API com Fetch
    fazerPostagem(data);
});

/**
 * Função responsável por realizar o fetch (POST) para a API
 * @param {Object} data - Dados do post (title, body, userId)
 */
function fazerPostagem(data) {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(dataRetornada => {
        // Mágica da renderização no segundo then
        console.log('Sucesso:', dataRetornada);
        renderizarPost(dataRetornada);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ops! Algo deu errado ao postar. Tente novamente.');
    })
    .finally(() => {
        // Restaurar botão
        botaoPostar.textContent = 'Postar Agora';
        botaoPostar.disabled = false;
    });
}

/**
 * Renderiza os dados retornados pela API na tela
 * @param {Object} post - Objeto retornado pela API
 */
function renderizarPost(post) {
    // Remover classes de placeholder se existirem
    renderizadorTitulo.classList.remove('placeholder-text');
    renderizadorConteudo.classList.remove('placeholder-text');

    // Atualizar HTML com os dados
    renderizadorTitulo.innerHTML = post.title;
    renderizadorConteudo.innerHTML = post.body;

    // Limpar formulário após sucesso
    formulario.reset();

    // Feedback visual opcional: scroll para a visualização
    document.querySelector('.post-preview').scrollIntoView({ behavior: 'smooth' });
}
