//Define as variaveis
//Posição inicial do jogador
let posX = 2500;
let posY = 4900;
//Pontuação e quantidade de frutas (serão aumentadas conforme a dificuldade)
let score = 0;
let quant_frutas = 5;
let quant_buraco = 10;
//Variaveis utilizadas para a alteração de estilos ou ações dentro do documento
let comec = document.getElementById("comecar");
let pers = document.getElementById("personagem");
let frut = document.getElementById("fruta");
let bura = document.getElementById("buraco");
//Matriz que armazena as frutas e buracos do jogo
let buracos = [];
let frutas = [];

//Funcao para comecar o jogo
function start(){
    quant_frutas = quant_frutas * document.getElementById("dificuldade").value;
    quant_buraco = quant_buraco * document.getElementById("dificuldade").value;
    frutas_random();
    buracos_random();
    comec.setAttribute("onClick", "javascript: restart();");
    comec.innerHTML = "RESTART";
    comec.style.fontWeight = "bold";
}

//Função para reiniciar o jogo
function restart(){
    location.reload()
}

//Função para traduzir o comando para a esquerda para o personagem
function move_left(){
    if(posX == 0){
        return
    }
    posX = posX - 100;
    verifica();
    verifica_caiu();
    pers.style.transform = `translate(${posX}%, ${posY}%)`;
}

//Função para traduzir o comando para a direita para o personagem
function move_right(){
    if(posX == 4900){
        return
    }
    posX = posX + 100;
    verifica();
    verifica_caiu();
    pers.style.transform = `translate(${posX}%, ${posY}%)`;
}

//Função para traduzir o comando para cima para o personagem
function move_up(){
    verifica_final();
    if(posY == 0){
        return
    }
    posY = posY - 100;
    verifica();
    verifica_caiu();
    pers.style.transform = `translate(${posX}%, ${posY}%)`;
}

//Função para criar aleatoriamente as frutas baseada na posição inicial delas
function frutas_random(){
    for(let i=0; i<quant_frutas; i++){
        let temp = (Math.floor(Math.random() * 50) * 100);
        let temp2 = (Math.floor(Math.random() * 50) * 100);
        let tempor = {
            id: i,
            posX: temp,
            posY: temp2
        }

        frutas.push(tempor);
        console.log(frutas.at(i));
    }
    for(let i=0; i<quant_frutas; i++){
        var div_fruta = document.createElement("div");
        div_fruta.classList.add("fruta");
        div_fruta.id =(frutas[i].id);
        div_fruta.style.transform = `translate(${frutas[i].posX}%, ${frutas[i].posY}%)`;
        document.getElementById("tela").appendChild(div_fruta);
        
    }
}

//Função para criar aleatoriamente os buracos baseado na posição inicial deles
function buracos_random(){
    for(let i=0; i<quant_buraco; i++){
        let temp = (Math.floor(Math.random() * 50) * 100);
        let temp2 = (Math.floor(Math.random() * 50) * 100);
        let tempor = {
            id: i,
            posX: temp,
            posY: temp2
        }

        buracos.push(tempor);
        console.log(buracos.at(i));
    }
    for(let i=0; i<quant_buraco; i++){
        var div_buraco = document.createElement("div");
        div_buraco.classList.add("buraco");
        div_buraco.style.transform = `translate(${buracos[i].posX}%, ${buracos[i].posY}%)`;
        document.getElementById("tela").appendChild(div_buraco);
        
    }
}

//Verifica se comeu
function verifica(){
    for(let j=0; j<quant_frutas; j++){
        if(posX == frutas[j].posX && posY == frutas[j].posY){
        score = score + 100 * document.getElementById("dificuldade").value;
        document.getElementById("score").innerHTML = "SCORE: " + score;
        const div_pai = document.getElementById('tela');
        const div = document.getElementById(frutas[j].id);
        div_pai.removeChild(div);
        frutas.splice(j, 1);
        quant_frutas--;
        if(quant_frutas == 0){
            alert("Parabéns, você ganhou o jogo com uma pontuação de: " + score + " pontos")
            location.reload();
        }
        }
    }
}

//Verifica se caiu
function verifica_caiu(){
    for(let j=0; j<quant_buraco; j++){
        if(posX == buracos[j].posX && posY == buracos[j].posY){
            alert("Voce caiu... Sua pontuacao final foi de: " + score + " pontos")
            location.reload();
        }
    }
}

//Verifica se conseguiu todas as frutas ao chegar na ultima posicao Y
function verifica_final(){
    if(quant_frutas != 0){
        for(let j=0; j<quant_frutas; j++){
            if(posY == 0 && posY < frutas[j].posY){
                alert("Voce nao conseguiu coletar todas as frutas, sua pontuacao final foi de: " + score + " pontos");
                location.reload();
            }
        }
    }
}