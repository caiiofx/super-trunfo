// Cartas do jogo
const cartas = [
  { nome: "Bugatti Chiron", velocidade: 100, potencia: 98, peso: 1995, custo: 98 },
  { nome: "Tesla Model S", velocidade: 92, potencia: 85, peso: 2200, custo: 92 },
  { nome: "Ferrari F8", velocidade: 95, potencia: 90, peso: 1600, custo: 95 },
  { nome: "Lamborghini Huracan", velocidade: 97, potencia: 93, peso: 1700, custo: 97 },
  { nome: "Porsche 911", velocidade: 90, potencia: 89, peso: 1500, custo: 90 },
  { nome: "BMW M4", velocidade: 88, potencia: 86, peso: 1650, custo: 88 }
];

let maoA = [];
let maoB = [];
let mesaA = null;
let mesaB = null;
let turno = "A";

function log(msg) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = `[${new Date().toLocaleTimeString()}] ${msg}<br>` + logDiv.innerHTML;
}

function distribuirCartas() {
  let embaralhadas = [...cartas].sort(() => Math.random() - 0.5);
  maoA = embaralhadas.slice(0, Math.ceil(embaralhadas.length / 2));
  maoB = embaralhadas.slice(Math.ceil(embaralhadas.length / 2));
}

function exibirCarta(jogador, carta) {
  const cardDiv = document.getElementById(`card${jogador}`);
  if (!carta) {
    cardDiv.innerHTML = "(sem cartas)";
    return;
  }
  cardDiv.innerHTML = `
    <strong>${carta.nome}</strong><br>
    velocidade: ${carta.velocidade}<br>
    potencia: ${carta.potencia}<br>
    peso: ${carta.peso}<br>
    custo: ${carta.custo}
  `;
}

function atualizarMao() {
  document.getElementById("handA").textContent = maoA.length;
  document.getElementById("handB").textContent = maoB.length;
}

function novaPartida() {
  distribuirCartas();
  mesaA = null;
  mesaB = null;
  turno = "A";
  document.getElementById("turno").textContent = "Jogador A";
  atualizarMao();
  exibirCarta("A", maoA[0]);
  exibirCarta("B", maoB[0]);
  log("Partida iniciada. Turno inicial: Jogador A");
}

function proximoRound() {
  if (maoA.length === 0 || maoB.length === 0) {
    log("Jogo terminou!");
    return;
  }

  mesaA = maoA.shift();
  mesaB = maoB.shift();
  atualizarMao();

  document.getElementById("mesaA").innerHTML = `
    <strong>${mesaA.nome}</strong><br>
    velocidade: ${mesaA.velocidade}<br>
    potencia: ${mesaA.potencia}<br>
    peso: ${mesaA.peso}<br>
    custo: ${mesaA.custo}
  `;
  document.getElementById("mesaB").innerHTML = `
    <strong>${mesaB.nome}</strong><br>
    velocidade: ${mesaB.velocidade}<br>
    potencia: ${mesaB.potencia}<br>
    peso: ${mesaB.peso}<br>
    custo: ${mesaB.custo}
  `;

  exibirCarta("A", maoA[0]);
  exibirCarta("B", maoB[0]);

  log("Próximo round pronto. Turno: Jogador " + turno);
}

function escolherVencedor(atributo) {
  if (!mesaA || !mesaB) {
    log("Nenhuma carta na mesa!");
    return;
  }

  let valorA = mesaA[atributo];
  let valorB = mesaB[atributo];

  if (valorA > valorB) {
    maoA.push(mesaA, mesaB);
    log("Jogador A venceu este round!");
  } else if (valorB > valorA) {
    maoB.push(mesaA, mesaB);
    log("Jogador B venceu este round!");
  } else {
    log("Empate! Cartas descartadas.");
  }

  mesaA = null;
  mesaB = null;

  turno = turno === "A" ? "B" : "A";
  document.getElementById("turno").textContent = "Jogador " + turno;
}

function chooseAttribute(player) {
  if (turno !== player) {
    log("Não é seu turno para escolher.");
    return;
  }
  let atributo = prompt("Digite o atributo (velocidade, potencia, peso, custo):");
  if (["velocidade", "potencia", "peso", "custo"].includes(atributo)) {
    escolherVencedor(atributo);
    atualizarMao();
  } else {
    log("Atributo inválido!");
  }
}
