const url = "https://botafogo-atletas.mange.li/2024-1/";

async function carregarJogadores() {
    try {
        // Fetch dos jogadores
        const response = await fetch(url + 'all');
        const jogadores = await response.json();

        // Inserir jogadores na página
        const listaJogadores = document.getElementById('jogadores-lista');
        listaJogadores.innerHTML = ''; // Limpar conteúdo existente

        jogadores.forEach(jogador => {
            const jogadorDiv = document.createElement('div');
            jogadorDiv.classList.add('jogador');

            // Criar o HTML para cada jogador
            jogadorDiv.innerHTML = `
                <img src="${jogador.imagem}" alt="${jogador.nome}" />
                <h2>${jogador.nome}</h2>
                <button class="saiba-mais">Saiba mais...</button>
                <div class="info-jogador" style="display:none;">
                    <p><strong>Altura:</strong> ${jogador.altura}</p>
                    <p><strong>Naturalidade:</strong> ${jogador.naturalidade}</p>
                    <p><strong>Nascimento:</strong> ${jogador.nascimento}</p>
                    <p><strong>Jogos pelo Botafogo:</strong> ${jogador.jogos}</p>
                    <p><strong>Especialidade:</strong> ${jogador.especialidade}</p>
                    <p><strong>Detalhes:</strong> ${jogador.detalhes}</p>
                    <button class="voltar">Voltar</button>
                </div>
            `;

            listaJogadores.appendChild(jogadorDiv);

            // Adicionar funcionalidade para exibir informações
            jogadorDiv.querySelector('.saiba-mais').addEventListener('click', () => {
                const infoJogador = jogadorDiv.querySelector('.info-jogador');
                infoJogador.style.display = (infoJogador.style.display === 'none' || infoJogador.style.display === '') ? 'block' : 'none';
            });

            // Adicionar funcionalidade para voltar
            jogadorDiv.querySelector('.voltar').addEventListener('click', () => {
                const infoJogador = jogadorDiv.querySelector('.info-jogador');
                infoJogador.style.display = 'none';
            });
        });
    } catch (error) {
        console.error("Erro ao carregar os jogadores:", error);
    }
}

// Chamar a função para carregar os jogadores ao carregar a página
carregarJogadores();
