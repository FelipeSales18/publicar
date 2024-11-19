// URL principal dos dados
const url = "https://botafogo-atletas.mange.li/2024-1/";

// Verifica se o usuário está logado
const verificaAutenticacao = () => {
    const logado = sessionStorage.getItem('logado');
    const loginSection = document.getElementById('login-container'); // Altere para "login-container"
    const atletasSection = document.getElementById('atletas-section');

    if (logado === 'sim') {
        if (loginSection) loginSection.style.display = 'none'; // Esconde a área de login
        if (atletasSection) atletasSection.style.display = 'block'; // Mostra os jogadores
    } else {
        if (loginSection) loginSection.style.display = 'block'; // Mostra a área de login
        if (atletasSection) atletasSection.style.display = 'none'; // Esconde os jogadores
    }
};

// Previne o envio do formulário de login
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const botaoLogin = document.getElementById("botao");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
        });
    }

    if (botaoLogin) {
        botaoLogin.addEventListener("click", manipulaBotao);
    }
});

// Função de autenticação
const manipulaBotao = () => {
    const texto = document.getElementById('senha').value; // Obtém a senha digitada
    if (hex_md5(texto) === '10044e5fd1a8702a6fb1f172f10f0371') { // Verifica o hash MD5
        sessionStorage.setItem('logado', 'sim'); // Define o usuário como logado
        verificaAutenticacao(); // Atualiza a exibição da página
    } else {
        alert('Você errou a senha'); // Exibe mensagem de erro
    }
};

// Botão de logout para limpar a autenticação
document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado'); // Remove a autenticação
    verificaAutenticacao(); // Atualiza a exibição da página
};

// Função para buscar dados
const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

// Referência ao container
const container = document.getElementById("container");

// Monta os cards de atletas
const montaCard = (atleta) => {
    const cartao = document.createElement('article');
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = 'sans-serif';
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    cartao.onclick = (e) => {
        const id = e.currentTarget.dataset.id;
        const url = `detalhes.html?id=${id}`;
        document.cookie = `id=${id}`;
        localStorage.setItem('id', id);
        localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));
        sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));
        window.location = url;
    };

    // Adiciona o botão "Saiba mais..."
    const saibaMaisButton = document.createElement('button');
    saibaMaisButton.classList.add('saiba-mais');
    saibaMaisButton.innerText = 'Saiba mais...';

    const infoJogador = document.createElement('div');
    infoJogador.classList.add('info-jogador');
    infoJogador.style.display = 'none';

    // Informações do jogador
    infoJogador.innerHTML = `
        <p><strong>Altura:</strong> ${atleta.altura}</p>
        <p><strong>Naturalidade:</strong> ${atleta.naturalidade}</p>
        <p><strong>Nascimento:</strong> ${atleta.nascimento}</p>
        <p><strong>Jogos pelo Botafogo:</strong> ${atleta.jogos}</p>
        <p><strong>Especialidade:</strong> ${atleta.especialidade}</p>
        <p><strong>Detalhes:</strong> ${atleta.detalhes}</p>
        <button class="voltar">Voltar</button>
    `;

    // Lógica para exibir/ocultar as informações
    saibaMaisButton.addEventListener('click', () => {
        infoJogador.style.display = infoJogador.style.display === 'none' ? 'block' : 'none';
    });

    // Lógica para voltar
    infoJogador.querySelector('.voltar').addEventListener('click', () => {
        infoJogador.style.display = 'none';
    });

    cartao.appendChild(saibaMaisButton);
    cartao.appendChild(infoJogador);

    return cartao;
};

// Função para carregar atletas
const carregaAtletas = (endpoint) => {
    pega_json(endpoint).then(atletas => {
        container.innerHTML = ""; // Limpa o container
        atletas.forEach(atleta => container.appendChild(montaCard(atleta)));
    });
};

// Adiciona a lógica para filtros e busca
document.getElementById("filtroTodos").onclick = () => {
    carregaAtletas(`${url}all`);
};

document.getElementById("filtroMasculino").onclick = () => {
    carregaAtletas(`${url}masculino`);
};

document.getElementById("filtroFeminino").onclick = () => {
    carregaAtletas(`${url}feminino`);
};

document.getElementById("search").oninput = (e) => {
    const termo = e.target.value.toLowerCase();
    const atletas = document.querySelectorAll("article");
    atletas.forEach(atleta => {
        const nome = atleta.querySelector("h1").innerText.toLowerCase();
        atleta.style.display = nome.includes(termo) ? "block" : "none";
    });
};

// Busca e exibe os atletas masculinos por padrão ao carregar a página
pega_json(`${url}masculino`).then((r) => {
    r.forEach((ele) => container.appendChild(montaCard(ele)));
});
