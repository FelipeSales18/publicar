const url = "https://botafogo-atletas.mange.li/2024-1/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const pega_json = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const montaPagina = (dados) => {
    const body = document.body;

    // Nome do jogador
    const nome = document.createElement('h1');
    nome.innerHTML = dados.nome;
    body.appendChild(nome);

    // Imagem do jogador
    const imagem = document.createElement('img');
    imagem.src = dados.imagem;
    body.appendChild(imagem);

    // Detalhes do jogador
    const lista_detalhes = document.createElement('ul');
    
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

    const detalhes = document.createElement('li');
    detalhes.innerHTML = `<strong>Detalhes:</strong> ${dados.detalhes}`;
    lista_detalhes.appendChild(detalhes);

    body.appendChild(lista_detalhes);

    // Botão "Voltar"
    const voltarBtn = document.createElement('button');
    voltarBtn.innerHTML = "Voltar";
    voltarBtn.onclick = () => {
        window.history.back(); // Volta para a página anterior
    };
    body.appendChild(voltarBtn);
};

// Verifica se o usuário está logado
if (sessionStorage.getItem('logado')) {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (r) => montaPagina(r)
    );
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado para acessar esse conteúdo</h1>";
}

// Função para buscar o dado do cookie
const achaCookie = (chave) => {
    const lista = document.cookie.split("; ");
    const par = lista.find((e) => e.startsWith(`${chave}=`));
    return par ? par.split("=")[1] : null;
};

// Exemplo de como acessar os dados do sessionStorage
const dadosSessionStorage = sessionStorage.getItem('dados'); 
const obj = JSON.parse(dadosSessionStorage);
console.log('Número de jogos:', obj.nJogos); 
