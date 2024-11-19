const url = "https://botafogo-atletas.mange.li/2024-1/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const montaPagina = (dados) => {
    const container = document.getElementById("atleta-details");
    const loading = document.getElementById("loading");
    loading.style.display = "none"; // Esconde a mensagem "Aguarde..."

    // Nome do jogador
    const nome = document.createElement('h1');
    nome.innerHTML = dados.nome;
    nome.classList.add('nome-jogador'); // Adiciona a classe 'nome-jogador'
    container.appendChild(nome);

    // Imagem do jogador
    const imagem = document.createElement('img');
    imagem.src = dados.imagem;
    imagem.classList.add('imagem-jogador'); // Adiciona a classe 'imagem-jogador'
    container.appendChild(imagem);

    // Detalhes do jogador
    const lista_detalhes = document.createElement('ul');
    lista_detalhes.classList.add('detalhes-jogador'); // Adiciona a classe 'detalhes-jogador'

    const n_jogos = document.createElement('li');
    n_jogos.innerHTML = `<strong>Jogos:</strong> ${dados.n_jogos}`;
    lista_detalhes.appendChild(n_jogos);

    const posicao = document.createElement('li');
    posicao.innerHTML = `<strong>Posição:</strong> ${dados.posicao}`;
    lista_detalhes.appendChild(posicao);

    const altura = document.createElement('li');
    altura.innerHTML = `<strong>Altura:</strong> ${dados.altura}`;
    lista_detalhes.appendChild(altura);

    const naturalidade = document.createElement('li');
    naturalidade.innerHTML = `<strong>Naturalidade:</strong> ${dados.naturalidade}`;
    lista_detalhes.appendChild(naturalidade);

    const nascimento = document.createElement('li');
    nascimento.innerHTML = `<strong>Nascimento:</strong> ${dados.nascimento}`;
    lista_detalhes.appendChild(nascimento);

    const especialidade = document.createElement('li');
    especialidade.innerHTML = `<strong>Especialidade:</strong> ${dados.especialidade}`;
    lista_detalhes.appendChild(especialidade);

    container.appendChild(lista_detalhes);
};

// Verifica se o usuário está logado
if (sessionStorage.getItem('logado')) {
    pega_json(`${url}${id}`).then((r) => montaPagina(r));
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado para acessar esse conteúdo</h1>";
}

// Função para pegar o ID do atleta da URL
const urlParams = new URLSearchParams(window.location.search);
const atletaId = urlParams.get('id');

// Função para buscar os dados do atleta
const pegaDetalhes = async (id) => {
    const endpoint = `https://botafogo-atletas.mange.li/2024-1/${id}`;
    try {
        const resposta = await fetch(endpoint);
        const atleta = await resposta.json();
        exibeDetalhes(atleta);
    } catch (error) {
        console.error("Erro ao carregar os detalhes:", error);
    }
};

// Função para exibir os detalhes do atleta
const exibeDetalhes = (atleta) => {
    const container = document.getElementById("atleta-details");
    const loading = document.getElementById("loading");
    loading.style.display = "none"; // Esconde a mensagem "Aguarde..."

    // Adiciona "Detalhes" em negrito seguido de ":" antes da frase
    const detalhesTitulo = document.createElement("p");
    detalhesTitulo.innerHTML = "<strong>Detalhes:</strong>"; // A palavra "Detalhes" em negrito
    container.appendChild(detalhesTitulo);

    // Exibe os detalhes do jogador
    const detalhes = document.createElement("p");
    detalhes.textContent = atleta.detalhes;
    container.appendChild(detalhes);
};

// Redireciona para a tela principal
document.getElementById("voltar").addEventListener("click", () => {
    window.location.href = "index.html"; // Ou a URL da página principal
});

// Redireciona para a tela de login
document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem('logado');
    window.location.href = "index.html"; // Ou a URL da página de login
});

// Carrega os detalhes do atleta
document.addEventListener("DOMContentLoaded", () => {
    if (atletaId) {
        pegaDetalhes(atletaId);
    } else {
        window.location.href = "index.html"; // Redireciona se o ID não estiver presente
    }
});
