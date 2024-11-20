const url = "https://botafogo-atletas.mange.li/2024-1/";
const params = new URLSearchParams(window.location.search);
const atletaId = params.get('id');

// Função para buscar e exibir os detalhes do atleta
const carregaDetalhes = async () => {
    const loadingMessage = document.getElementById('loading');
    const detalhesContainer = document.getElementById('detalhes-container');
    const container = document.getElementById("atleta-details");

    try {
        // Mostra a mensagem de carregamento
        loadingMessage.style.display = 'block';

        // Faz a requisição para o endpoint
        const response = await fetch(`${url}${atletaId}`);
        if (!response.ok) throw new Error('Erro ao carregar os detalhes do atleta.');
        const atleta = await response.json();

        // Verifica se os dados estão sendo recebidos
        console.log(atleta);

        // Esconde a mensagem de carregamento
        loadingMessage.style.display = 'none';
        detalhesContainer.style.display = 'flex';

        // Contêiner flex para organizar a imagem à esquerda e os detalhes à direita
        const atletaInfo = document.createElement('div');
        atletaInfo.classList.add('atleta-info');
        atletaInfo.style.display = 'flex';
        atletaInfo.style.alignItems = 'center'; // Alinha verticalmente

        // Imagem do jogador
        const imagem = document.createElement('img');
        imagem.src = atleta.imagem;
        imagem.alt = atleta.nome;
        imagem.classList.add('imagem-jogador');
        imagem.style.width = '200px'; // Ajusta o tamanho da imagem
        imagem.style.height = 'auto'; // Mantém a proporção da imagem

        // Detalhes do jogador à direita
        const detalhes = document.createElement('div');
        detalhes.style.marginLeft = '20px'; // Espaço entre a imagem e os detalhes

        // Nome do jogador
        const nome = document.createElement('h2');
        nome.innerHTML = atleta.nome;
        nome.classList.add('nome-jogador');
        detalhes.appendChild(nome);

        // Lista de detalhes adicionais
        const lista_detalhes = document.createElement('ul');

        const n_jogos = document.createElement('li');
        n_jogos.innerHTML = `<strong>Jogos:</strong> ${atleta.n_jogos}`;
        lista_detalhes.appendChild(n_jogos);

        const posicao = document.createElement('li');
        posicao.innerHTML = `<strong>Posição:</strong> ${atleta.posicao}`;
        lista_detalhes.appendChild(posicao);

        const altura = document.createElement('li');
        altura.innerHTML = `<strong>Altura:</strong> ${atleta.altura}`;
        lista_detalhes.appendChild(altura);

        const naturalidade = document.createElement('li');
        naturalidade.innerHTML = `<strong>Naturalidade:</strong> ${atleta.naturalidade}`;
        lista_detalhes.appendChild(naturalidade);

        const nascimento = document.createElement('li');
        nascimento.innerHTML = `<strong>Nascimento:</strong> ${atleta.nascimento}`;
        lista_detalhes.appendChild(nascimento);

        

        detalhes.appendChild(lista_detalhes);

        // Verifica e exibe a descrição do atleta
        const descricao = document.createElement('p');
        descricao.innerHTML = `<strong>Descrição:</strong> ${atleta.detalhes || 'Descrição não disponível'}`;
        descricao.classList.add('descricao-atleta');
        detalhes.appendChild(descricao);

        // Adiciona a imagem e os detalhes no contêiner
        atletaInfo.appendChild(imagem);
        atletaInfo.appendChild(detalhes);

        // Adiciona o contêiner de informações ao container principal
        container.appendChild(atletaInfo);

    } catch (error) {
        console.error(error);
        loadingMessage.innerHTML = 'Erro ao carregar os detalhes. Tente novamente.';
    }
};

// Verifica se o usuário está logado
if (sessionStorage.getItem('logado')) {
    carregaDetalhes(); // Carrega os detalhes do atleta
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado para acessar esse conteúdo</h1>";
}

// Função para sair (Logout)
document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('logado'); // Remove o estado de autenticação
    window.location.href = 'index.html'; // Redireciona para a página inicial
});

// Função para voltar
document.getElementById('voltar').addEventListener('click', () => {
    window.history.back(); // Volta para a página anterior
});
