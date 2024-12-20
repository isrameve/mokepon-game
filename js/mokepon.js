const pets = ["", "Hipodoge", "Capipepo", "Ratigueya"];
const powers = ["", "Fuego", "Agua", "Tierra"];

let playerAtack = "";
let pcAtack = "";

let livesPlayer = 3;
let livesPc = 3;

function iniciarJuego() {
  let botonMascotaJugador = document.getElementById("boton-mascota");
  botonMascotaJugador.addEventListener("click", selectPetPlayer);

  let buttonFire = document.getElementById("button-fire");
  buttonFire.addEventListener("click", powerFire, false);
  let buttonWater = document.getElementById("button-water");
  buttonWater.addEventListener("click", powerWater, false);
  let buttonEarth = document.getElementById("button-earth");
  buttonEarth.addEventListener("click", powerEarth, false);

  let reload = document.getElementById("boton-reiniciar");
  reload.addEventListener("click", reloadButton, false);

  showLives();
}

function randomSelect(max, min) {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}

function selectPetPlayer() {
  let selectedHipodoge = document.getElementById("hipodoge");
  let selectedCapipepo = document.getElementById("capipepo");
  let selectedRatigueya = document.getElementById("ratigueya");

  let spanPetPlayer = document.getElementById("mascota-jugador");

  if (selectedHipodoge.checked) {
    spanPetPlayer.innerHTML = "Hipodoge";
  } else if (selectedCapipepo.checked) {
    spanPetPlayer.innerHTML = "Capipepo";
  } else if (selectedRatigueya.checked) {
    spanPetPlayer.innerHTML = "Ratigueya";
  } else {
    alert("Elige alguna mascota");
  }
  selectPetPc();
}

function selectPetPc() {
  let spanPetPc = document.getElementById("mascota-enemigo");

  let sectionSelectAtk = document.getElementById("seleccionar-ataque");
  let setionChosePet = document.getElementById("seleccionar-mascota");

  //Seleccióna aleatoriamente el pesrsonaje para PC
  let selectedPetPc = pets[randomSelect(0, pets.length)];

  //Ingresa la mascota de PC
  spanPetPc.innerHTML = selectedPetPc;

  sectionSelectAtk.style = false;
  setionChosePet.style.display = "none";
}

function selectPowerPc() {
  let spanPowerPc = document.getElementById("poder-enemigo");
  pcAtack = powers[randomSelect(0, powers.length)];

  const resultado = showScore();
  showBattleMsj(resultado);
}

function showBattleMsj(resultado) {
  let containerResult = document.getElementById("mensajes");

  let newP = document.createElement("p");
  newP.innerHTML =
    "Tu mascota atacó con " +
    playerAtack +
    ", la mascota del enemigo atacó con " +
    pcAtack +
    ". Esto quiere decir que " +
    resultado;

  containerResult.appendChild(newP);
  gameOver();
}

function powerFire() {
  playerAtack = "Fuego";
  selectPowerPc();
  showLives();
}
function powerWater() {
  playerAtack = "Agua";
  selectPowerPc();
  showLives();
}
function powerEarth() {
  playerAtack = "Tierra";
  selectPowerPc();
  showLives();
}

function showScore() {
  let resultado = "";

  if (playerAtack == pcAtack) {
    resultado = "Empate";
    // console.log("Tu " + ptsPlayer + " Tu enemigo " + ptsPc);
  } else if (playerAtack == "Agua" && pcAtack == "Fuego") {
    livesPc = livesPc - 1;
    resultado = "Ganaste";
    console.log("Tu " + livesPlayer + " Tu enemigo " + livesPc);
  } else if (playerAtack == "Fuego" && pcAtack == "Tierra") {
    livesPc = livesPc - 1;
    resultado = "Ganaste";
    console.log("Tu " + livesPlayer + " Tu enemigo " + livesPc);
  } else if (playerAtack == "Tierra" && pcAtack == "Agua") {
    livesPc = livesPc - 1;
    resultado = "Ganaste";
    console.log("Tu " + livesPlayer + " Tu enemigo " + livesPc);
  } else {
    livesPlayer = livesPlayer - 1;
    resultado = "Perdiste";
    console.log("Tu " + livesPlayer + " Tu enemigo " + livesPc);
  }
  return resultado;
}

function showLives() {
  let spanLivesPlayer = document.getElementById("vidas-jugador");
  let spanLivesPc = document.getElementById("vidas-pc");

  spanLivesPlayer.innerHTML = livesPlayer;
  spanLivesPc.innerHTML = livesPc;
}

function gameOver() {
  if (livesPc == 0) {
    livesPlayer = 3;
    livesPc = 3;

    alert("Ganaste el juego");
    location.reload();
  } else if (livesPlayer == 0) {
    livesPlayer = 3;
    livesPc = 3;

    alert("Pierdes el juego");
    location.reload();
  }
}

function reloadButton() {
  location.reload();
}

window.addEventListener("load", iniciarJuego);
