// const pets = ["", "Hipodoge", "Capipepo", "Ratigueya"];
// const powers = ["", "Fuego", "Agua", "Tierra"];

const botonMascotaJugador = document.getElementById("boton-mascota");
const reload = document.getElementById("boton-reiniciar");

const cardsMokeponsContainer = document.getElementById(
  "card-mokepons-container"
);

const spanPetPlayer = document.getElementById("mascota-jugador");
const spanPetPc = document.getElementById("mascota-enemigo");

const sectionSelectAtk = document.getElementById("seleccionar-ataque");
const setionChosePet = document.getElementById("seleccionar-mascota");

const divSelectAtk = document.getElementById("atack-buttons");

const spanPowerPc = document.getElementById("poder-enemigo");

let selectedHipodoge;
let selectedCapipepo;
let selectedRatigueya;

let buttonEarth;
let buttonFire;
let buttonWater;

let selectMokeponsZone = "";
let selectAtacksZone = "";

let allMokepons = [];

let selectedPetPlayer = "";
let selectedPetPc = "";

let playerAtack = "";
let pcAtack = "";

let livesPlayer = 3;
let livesPc = 3;

const spanLivesPlayer = document.getElementById("vidas-jugador");
const spanLivesPc = document.getElementById("vidas-pc");

const containerResult = document.getElementById("mensajes");

class Mokepon {
  constructor(name, id, img, lives) {
    this.name = name;
    this.id = id;
    this.img = img;
    this.lives = lives;
    this.atacks = [];
  }
}

let hipodoge = new Mokepon(
  "Hipodige",
  "hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.webp",
  3
);

let capipepo = new Mokepon(
  "Capipepo",
  "capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.webp",
  3
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.webp",
  3
);

hipodoge.atacks.push(
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "🔥", id: "button-fire", element: "Fuego" }
);

capipepo.atacks.push(
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "🔥", id: "button-fire", element: "Fuego" }
);

ratigueya.atacks.push(
  { name: "🔥", id: "button-fire", element: "Fuego" },
  { name: "🔥", id: "button-fire", element: "Fuego" },
  { name: "🔥", id: "button-fire", element: "Fuego" },
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "💧", id: "button-water", element: "Agua" }
);

allMokepons.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  botonMascotaJugador.addEventListener("click", selectPetPlayer);

  allMokepons.forEach((mokepon) => {
    selectMokeponsZone = `
      <input type="radio" name="mascota" id="${mokepon.id}"/>
        <label for="${mokepon.id}" class="each-mokepon">
          <p>${mokepon.name}</p>
          <img
            src="${mokepon.img}"
            alt="imagen de ${mokepon.name}"
          />
        </label>
    `;
    cardsMokeponsContainer.innerHTML += selectMokeponsZone;
  });

  selectedHipodoge = document.getElementById("hipodoge");
  selectedCapipepo = document.getElementById("capipepo");
  selectedRatigueya = document.getElementById("ratigueya");

  reload.addEventListener("click", reloadButton, false);

  showLives();
}

function randomSelect(max, min) {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}

function toUpperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function selectPetPlayer() {
  if (selectedHipodoge.checked) {
    selectedPetPlayer = hipodoge;
    spanPetPlayer.innerHTML = toUpperCaseFirstLetter(selectedHipodoge.id);
  } else if (selectedCapipepo.checked) {
    selectedPetPlayer = capipepo;
    spanPetPlayer.innerHTML = toUpperCaseFirstLetter(selectedCapipepo.id);
  } else if (selectedRatigueya.checked) {
    selectedPetPlayer = ratigueya;
    spanPetPlayer.innerHTML = toUpperCaseFirstLetter(selectedRatigueya.id);
  } else {
    alert("Elige alguna mascota");
  }

  selectPetPc();
  return selectedPetPlayer;
}

function selectPetPc() {
  selectedPetPlayer.atacks.forEach((atack) => {
    selectAtacksZone = `
      <button id="${atack.id}" class="each-attack">${atack.name}</button>
    `;
    divSelectAtk.innerHTML += selectAtacksZone;
  });

  buttonEarth = document.getElementById("button-earth");
  buttonFire = document.getElementById("button-fire");
  buttonWater = document.getElementById("button-water");

  buttonEarth.addEventListener("click", powerEarth, false);
  buttonFire.addEventListener("click", powerFire, false);
  buttonWater.addEventListener("click", powerWater, false);

  //Seleccióna aleatoriamente el pesrsonaje para PC
  selectedPetPc = allMokepons[randomSelect(0, allMokepons.length - 1)];

  //Ingresa la mascota de PC
  spanPetPc.innerHTML = selectedPetPc.name;

  sectionSelectAtk.style = false;
  setionChosePet.style.display = "none";
}

function selectPowerPc() {
  pcAtack =
    selectedPetPc.atacks[randomSelect(0, selectedPetPc.atacks.length)].element;

  const resultado = showScore();
  showBattleMsj(resultado);
}

function showBattleMsj(resultado) {
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
