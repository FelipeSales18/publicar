// URL principal dos dados
const urlBase = "https://botafogo-atletas.mange.li/2024-1/";

// Verifica se o usuário está logado
const verificaAutenticacao = () => {
    const logado = sessionStorage.getItem('logado');
    const loginSection = document.getElementById('login-container');
    const atletasSection = document.getElementById('atletas-section');

    if (logado === 'sim') {
        if (loginSection) loginSection.style.display = 'none';
        if (atletasSection) atletasSection.style.display = 'block';
    } else {
        if (loginSection) loginSection.style.display = 'block';
        if (atletasSection) atletasSection.style.display = 'none';
    }
};

// Previne o envio do formulário de login
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const botaoLogin = document.getElementById("botao");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
    }

    if (botaoLogin) {
        botaoLogin.addEventListener("click", manipulaBotao);
    }

    // Garante que nada será exibido ao carregar a página
    document.getElementById("container").innerHTML = "";
});

// Função de autenticação
const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === '10044e5fd1a8702a6fb1f172f10f0371') {
        sessionStorage.setItem('logado', 'sim');
        verificaAutenticacao();
    } else {
        alert('Você errou a senha');
    }
};

// Botão de logout para limpar a autenticação
document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');
    verificaAutenticacao();
};

// Função para buscar dados
const pega_json = async (endpoint) => {
    const resposta = await fetch(endpoint);
    if (!resposta.ok) {
        throw new Error("Erro ao obter os dados.");
    }
    return resposta.json();
};

// Referência ao container
// Referência ao container
const container = document.getElementById("container");

// Função para montar os cartões de atletas
const montaCard = (atleta) => {
    const cartao = document.createElement('article');
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const botaoSaibaMais = document.createElement("button"); // Botão "Saiba mais"

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    imagem.alt = atleta.nome;
    cartao.appendChild(imagem);


    botaoSaibaMais.innerHTML = "Saiba mais";
    botaoSaibaMais.classList.add("botao-saiba-mais");
    botaoSaibaMais.onclick = () => {
        const url = `detalhes.html?id=${atleta.id}`;
        window.location.href = url;
    };
    cartao.appendChild(botaoSaibaMais);

    return cartao;
};

// Função para carregar atletas com a mensagem "Aguarde..."
const carregaAtletas = async (categoria) => {
    try {
        const endpoint = `${urlBase}${categoria}`;
        container.innerHTML = "<p class='mensagem-carregando'>Aguarde...</p>"; // Mensagem de carregamento
        const atletas = await pega_json(endpoint);
        container.innerHTML = ""; // Limpa o container após o carregamento
        atletas.forEach(atleta => container.appendChild(montaCard(atleta)));
    } catch (err) {
        console.error("Erro ao carregar atletas:", err);
        container.innerHTML = "<p>Erro ao carregar atletas. Tente novamente mais tarde.</p>";
    }
};

// Configuração dos filtros
document.getElementById('filtroTodos').addEventListener('click', () => carregaAtletas('all'));
document.getElementById('filtroMasculino').addEventListener('click', () => carregaAtletas('masculino'));
document.getElementById('filtroFeminino').addEventListener('click', () => carregaAtletas('feminino'));

// Inicialização da página
document.addEventListener("DOMContentLoaded", () => {
    verificaAutenticacao();
    container.innerHTML = ""; // Garante que o container está vazio inicialmente
});

