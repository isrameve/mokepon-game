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

const spanVictoriesPlayer = document.getElementById("victorias-jugador");
const spanVictoriesPc = document.getElementById("victorias-pc");

const containerResult = document.getElementById("mensajes");

let selectedHipodoge;
let selectedCapipepo;
let selectedRatigueya;

let buttonEarth;
let buttonFire;
let buttonWater;
let buttons = [];

let selectMokeponsZone = "";
let selectAtacksZone = "";

let allMokepons = [];

let selectedPetPlayer = "";
let selectedPetPc = "";

let allPlayerAtacks = [];
let allPcAtack = [];
let playerAtack = "";
let pcAtack = "";

let resultWinner = 0;
let resultLoser = 0;
let resultTie = 0;

let victoriesPlayer = 0;
let victoriesPc = 0;

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
      <button id="${atack.id}" class="each-attack BAtack">${atack.name}</button>
    `;
    divSelectAtk.innerHTML += selectAtacksZone;
  });

  buttonEarth = document.getElementById("button-earth");
  buttonFire = document.getElementById("button-fire");
  buttonWater = document.getElementById("button-water");

  buttons = document.querySelectorAll(".BAtack");

  //Seleccióna aleatoriamente el pesrsonaje para PC
  selectedPetPc = allMokepons[randomSelect(0, allMokepons.length - 1)];

  //Ingresa la mascota de PC
  spanPetPc.innerHTML = selectedPetPc.name;

  sectionSelectAtk.style = false;
  setionChosePet.style.display = "none";

  atackSequence();
}

function atackSequence() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        allPlayerAtacks.push("Fuego");
        button.style.background = "#273F43";
        button.disabled = true;
        playerAtack = "Fuego";
        console.log(allPlayerAtacks);
      } else if (e.target.textContent === "💧") {
        allPlayerAtacks.push("Agua");
        button.style.background = "#273F43";
        button.disabled = true;
        playerAtack = "Agua";
        console.log(allPlayerAtacks);
      } else {
        allPlayerAtacks.push("Tierra");
        button.style.background = "#273F43";
        button.disabled = true;
        playerAtack = "Tierra";
        console.log(allPlayerAtacks);
      }
      selectPowerPc();
    });
  });
}

function selectPowerPc() {
  pcAtack =
    selectedPetPc.atacks[randomSelect(0, selectedPetPc.atacks.length - 1)]
      .element;

  if (pcAtack === "Fuego") {
    allPcAtack.push("Fuego");
    pcAtack = "Fuego";
  } else if (pcAtack === "Agua") {
    allPcAtack.push("Agua");
    pcAtack = "Agua";
  } else {
    allPcAtack.push("Tierra");
    pcAtack = "Tierra";
  }

  console.log(allPcAtack);

  allPowersSelected();
}

function allPowersSelected() {
  if (
    allPlayerAtacks.length === selectedPetPlayer.atacks.length &&
    allPcAtack.length === selectedPetPc.atacks.length
  ) {
    showScore();
  }
}

function showScore() {
  let resultado = [];

  for (let i = 0; i < allPlayerAtacks.length; i++) {
    if (allPlayerAtacks[i] == allPcAtack[i]) {
      resultado.push("Empate");
      showBattleMsj(resultado[i]);
      resultTie = resultTie + 1;
    } else if (allPlayerAtacks[i] == "Agua" && allPcAtack[i] == "Fuego") {
      resultado.push("Ganaste");
      victoriesPlayer = victoriesPlayer + 1;
      spanVictoriesPlayer.innerHTML = victoriesPlayer;
      showBattleMsj(resultado[i]);
      resultWinner = resultWinner + 1;
    } else if (allPlayerAtacks[i] == "Fuego" && allPcAtack[i] == "Tierra") {
      resultado.push("Ganaste");
      victoriesPlayer = victoriesPlayer + 1;
      spanVictoriesPlayer.innerHTML = victoriesPlayer;
      showBattleMsj(resultado[i]);
      resultWinner = resultWinner + 1;
    } else if (allPlayerAtacks[i] == "Tierra" && allPcAtack[i] == "Agua") {
      resultado.push("Ganaste");
      victoriesPlayer = victoriesPlayer + 1;
      spanVictoriesPlayer.innerHTML = victoriesPlayer;
      showBattleMsj(resultado[i]);
      resultWinner = resultWinner + 1;
    } else {
      resultado.push("Perdiste");
      victoriesPc = victoriesPc + 1;
      spanVictoriesPc.innerHTML = victoriesPc;
      showBattleMsj(resultado[i]);
      resultLoser = resultLoser + 1;
    }
  }
  setTimeout(showVictories, 1000);
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
}

function showVictories() {
  if (resultWinner > resultLoser) {
    alert("Ganaste");
  } else if (resultWinner === resultLoser) {
    alert("Empate");
  } else {
    alert("Perdiste");
  }
  location.reload();
}

function reloadButton() {
  location.reload();
}

window.addEventListener("load", iniciarJuego);
