const botonMascotaJugador = document.getElementById("boton-mascota");
const reload = document.getElementById("boton-reiniciar");

const cardsMokeponsContainer = document.getElementById(
  "card-mokepons-container"
);

const spanPetPlayer = document.getElementById("mascota-jugador");
const spanPetPc = document.getElementById("mascota-enemigo");

const sectionSelectAtk = document.getElementById("seleccionar-ataque");
const setionChosePet = document.getElementById("seleccionar-mascota");

const sectionSeeMap = document.getElementById("see-map");
const sectionMap = document.getElementById("map");

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

let theCanvasMap;
let backgroundMap = new Image();
backgroundMap.src = "./assets/mokemap.webp";
let intervalMap;

let selectMokeponsZone = "";
let selectAtacksZone = "";

let allMokepons = [];

let selectedPetPlayer = "";
let selectedPetPc = "";

let atackIndex = 0;
let allAtacksIndex = [];

let allPlayerAtacks = [];
let allPcAtack = [];
let playerAtack = "";
let pcAtack = "";

let resultWinner = 0;
let resultLoser = 0;
let resultTie = 0;
let scoreResult = [];

let victoriesPlayer = 0;
let victoriesPc = 0;

class Mokepon {
  constructor(name, id, img, lives, pictutePetMap, x = 10, y = 10) {
    this.name = name;
    this.id = id;
    this.img = img;
    this.lives = lives;
    this.atacks = [];
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.pictutePetMap = new Image();
    this.pictutePetMap.src = pictutePetMap;
    this.speedX = 0;
    this.speedY = 0;
  }

  drawAllPetsMap() {
    theCanvasMap.drawImage(
      this.pictutePetMap,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.webp",
  3,
  "./assets/hipodoge.webp"
);

let capipepo = new Mokepon(
  "Capipepo",
  "capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.webp",
  3,
  "./assets/capipepo.webp"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.webp",
  3,
  "./assets/ratigueya.webp"
);

let hipodogePc = new Mokepon(
  "Hipodoge",
  "hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.webp",
  3,
  "./assets/hipodoge.webp",
  500,
  120
);

let capipepoPc = new Mokepon(
  "Capipepo",
  "capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.webp",
  3,
  "./assets/capipepo.webp",
  450,
  300
);

let ratigueyaPc = new Mokepon(
  "Ratigueya",
  "ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.webp",
  3,
  "./assets/ratigueya.webp",
  150,
  400
);

hipodoge.atacks.push(
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "💧", id: "button-water", element: "Agua" },
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "🔥", id: "button-fire", element: "Fuego" }
);
hipodogePc.atacks.push(
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
capipepoPc.atacks.push(
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
ratigueyaPc.atacks.push(
  { name: "🔥", id: "button-fire", element: "Fuego" },
  { name: "🔥", id: "button-fire", element: "Fuego" },
  { name: "🔥", id: "button-fire", element: "Fuego" },
  { name: "🌱", id: "button-earth", element: "Tierra" },
  { name: "💧", id: "button-water", element: "Agua" }
);

allMokepons.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  sectionSeeMap.style.display = "none";
  theCanvasMap = sectionMap.getContext("2d");

  botonMascotaJugador.addEventListener("click", () => {
    selectPetPlayer();
  });

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

  reload.addEventListener("click", reloadButton);

  joinTheServerGame();
}

function joinTheServerGame() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    console.log(res);
  });
}

function randomSelect(min, max) {
  let random = Math.random();
  let scaled = random * (max - min + 1);
  let floored = Math.floor(scaled);
  let result = floored + min;
  return result;
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
  startMap();
  // Crear una condición en la que si le dan a un botón, se elija aleatoriamente la mascota del PC y entonces usar la función selectPetPc()
  // selectPetPc();
}

function selectPetPc() {
  selectedPetPlayer.atacks.forEach((atack) => {
    selectAtacksZone = `
      <button id="${atack.id}" class="each-attack BAtack">${atack.name}</button>
    `;
    divSelectAtk.innerHTML += selectAtacksZone;
  });

  buttons = document.querySelectorAll(".BAtack");

  //Seleccióna aleatoriamente el pesrsonaje para PC
  selectedPetPc = allMokepons[randomSelect(0, allMokepons.length - 1)];

  //Ingresa la mascota de PC
  spanPetPc.innerHTML = selectedPetPc.name;

  // sectionSelectAtk.style = false;
  setionChosePet.style.display = "none";
  sectionSeeMap.style.display = "flex";
}

function selectMapPetPc(selectedEnemy) {
  window.removeEventListener("keydown", keySelected);
  window.removeEventListener("keyup", stopMove);

  selectedPetPlayer.atacks.forEach((atack) => {
    selectAtacksZone = `
      <button id="${atack.id}" class="each-attack BAtack">${atack.name}</button>
    `;
    divSelectAtk.innerHTML += selectAtacksZone;
  });

  buttons = document.querySelectorAll(".BAtack");

  //Ingresa la mascota de PC
  spanPetPc.innerHTML = selectedEnemy.name;
  atackSequenceMap(selectedEnemy);
}

function startMap() {
  sectionMap.width = 700;
  sectionMap.height = 500;
  intervalMap = setInterval(drawPetMap, 50);

  window.addEventListener("keydown", keySelected);
  window.addEventListener("keyup", stopMove);

  setionChosePet.style.display = "none";
  sectionSeeMap.style.display = "flex";
}

function drawPetMap() {
  selectedPetPlayer.x += selectedPetPlayer.speedX;
  selectedPetPlayer.y += selectedPetPlayer.speedY;

  theCanvasMap.clearRect(0, 0, sectionMap.width, sectionMap.height);

  theCanvasMap.drawImage(
    backgroundMap,
    0,
    0,
    sectionMap.width,
    sectionMap.height
  );

  selectedPetPlayer.drawAllPetsMap();
  hipodogePc.drawAllPetsMap();
  capipepoPc.drawAllPetsMap();
  ratigueyaPc.drawAllPetsMap();

  if (selectedPetPlayer.speedX !== 0 || selectedPetPlayer.speedY !== 0) {
    checkCollision(hipodogePc);
    checkCollision(capipepoPc);
    checkCollision(ratigueyaPc);
  }
}

function moveUp() {
  selectedPetPlayer.speedY += -5;
}
function moveLeft() {
  selectedPetPlayer.speedX += -5;
}
function moveDown() {
  selectedPetPlayer.speedY += 5;
}
function moveRigth() {
  selectedPetPlayer.speedX += 5;
}

function keySelected(e) {
  switch (e.key) {
    case ("w", "ArrowUp"):
      moveUp();
      break;
    case ("a", "ArrowLeft"):
      moveLeft();
      break;
    case ("s", "ArrowDown"):
      moveDown();
      break;
    case ("d", "ArrowRight"):
      moveRigth();
      break;
  }
  console.log(e.key);
}

function stopMove() {
  selectedPetPlayer.speedX = 0;
  selectedPetPlayer.speedY = 0;
}

function checkCollision(selectedEnemy) {
  const topPetPlayer = selectedPetPlayer.y;
  const leftPetPlayer = selectedPetPlayer.x;
  const bottomPetPlayer = selectedPetPlayer.y + selectedPetPlayer.height;
  const rightPetPlayer = selectedPetPlayer.x + selectedPetPlayer.width;

  const topEnemy = selectedEnemy.y;
  const leftEnemy = selectedEnemy.x;
  const bottomEnemy = selectedEnemy.y + selectedEnemy.height;
  const rightEnemy = selectedEnemy.x + selectedEnemy.width;

  if (
    bottomPetPlayer < topEnemy ||
    topPetPlayer > bottomEnemy ||
    rightPetPlayer < leftEnemy ||
    leftPetPlayer > rightEnemy
  ) {
    return;
  }
  stopMove();
  sectionSeeMap.style.display = "none";
  sectionSelectAtk.style = false;
  selectMapPetPc(selectedEnemy);
  // atackSequence();
}

function atackSequence() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        allPlayerAtacks.push("Fuego");
        button.style.background = "#273F43";
        playerAtack = "Fuego";
        console.log(allPlayerAtacks);
        button.disabled = true;
      } else if (e.target.textContent === "💧") {
        allPlayerAtacks.push("Agua");
        button.style.background = "#273F43";
        playerAtack = "Agua";
        console.log(allPlayerAtacks);
        button.disabled = true;
      } else {
        allPlayerAtacks.push("Tierra");
        button.style.background = "#273F43";
        playerAtack = "Tierra";
        console.log(allPlayerAtacks);
        button.disabled = true;
      }
      selectPowerPc();
    });
  });
}

function atackSequenceMap(selectedEnemy) {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        allPlayerAtacks.push("Fuego");
        button.style.background = "#273F43";
        playerAtack = "Fuego";
        console.log(allPlayerAtacks);
        button.disabled = true;
      } else if (e.target.textContent === "💧") {
        allPlayerAtacks.push("Agua");
        button.style.background = "#273F43";
        playerAtack = "Agua";
        console.log(allPlayerAtacks);
        button.disabled = true;
      } else {
        allPlayerAtacks.push("Tierra");
        button.style.background = "#273F43";
        playerAtack = "Tierra";
        console.log(allPlayerAtacks);
        button.disabled = true;
      }
      selectPowerMapPc(selectedEnemy);
    });
  });
}

function selectPowerPc() {
  if (allAtacksIndex.length >= selectedPetPc.atacks.length) {
    console.log("Todos los ataques ya han sido utilizados.");
    return;
  }

  do {
    atackIndex = randomSelect(0, selectedPetPc.atacks.length - 1); //0, 4
  } while (allAtacksIndex.includes(atackIndex));

  allAtacksIndex.push(atackIndex);
  console.log(allAtacksIndex);

  pcAtack = selectedPetPc.atacks[atackIndex].element;
  allPcAtack.push(pcAtack);

  console.log(allPcAtack);

  allPowersSelected();
}

function selectPowerMapPc(selectedEnemy) {
  if (allAtacksIndex.length >= selectedEnemy.atacks.length) {
    console.log("Todos los ataques ya han sido utilizados.");
    return;
  }

  do {
    atackIndex = randomSelect(0, selectedEnemy.atacks.length - 1); //0, 4
  } while (allAtacksIndex.includes(atackIndex));

  allAtacksIndex.push(atackIndex);
  console.log(allAtacksIndex);

  pcAtack = selectedEnemy.atacks[atackIndex].element;
  allPcAtack.push(pcAtack);

  console.log(allPcAtack);

  allMapPowersSelected(selectedEnemy);
}

function allPowersSelected() {
  if (
    allPlayerAtacks.length === selectedPetPlayer.atacks.length &&
    allPcAtack.length === selectedPetPc.atacks.length
  ) {
    showScore();
  }
}

function allMapPowersSelected(selectedEnemy) {
  if (
    allPlayerAtacks.length === selectedPetPlayer.atacks.length &&
    allPcAtack.length === selectedEnemy.atacks.length
  ) {
    showScore();
  }
}

function showScore() {
  scoreResult = [];
  for (let i = 0; i < allPlayerAtacks.length; i++) {
    if (allPlayerAtacks[i] == allPcAtack[i]) {
      scoreResult.push("Empate");
      // showBattleMsj(scoreResult[i]);
      resultTie = resultTie + 1;
    } else if (allPlayerAtacks[i] == "Agua" && allPcAtack[i] == "Fuego") {
      scoreResult.push("Ganaste");
      victoriesPlayer = victoriesPlayer + 1;
      spanVictoriesPlayer.innerHTML = victoriesPlayer;
      // showBattleMsj(scoreResult[i]);
      resultWinner = resultWinner + 1;
    } else if (allPlayerAtacks[i] == "Fuego" && allPcAtack[i] == "Tierra") {
      scoreResult.push("Ganaste");
      victoriesPlayer = victoriesPlayer + 1;
      spanVictoriesPlayer.innerHTML = victoriesPlayer;
      // showBattleMsj(scoreResult[i]);
      resultWinner = resultWinner + 1;
    } else if (allPlayerAtacks[i] == "Tierra" && allPcAtack[i] == "Agua") {
      scoreResult.push("Ganaste");
      victoriesPlayer = victoriesPlayer + 1;
      spanVictoriesPlayer.innerHTML = victoriesPlayer;
      // showBattleMsj(scoreResult[i]);
      resultWinner = resultWinner + 1;
    } else {
      scoreResult.push("Perdiste");
      victoriesPc = victoriesPc + 1;
      spanVictoriesPc.innerHTML = victoriesPc;
      // showBattleMsj(scoreResult[i]);
      resultLoser = resultLoser + 1;
    }
  }
  showBattleMsj(scoreResult);
  setTimeout(showVictories, 1000);
}

function showBattleMsj(scoreResult) {
  scoreResult.forEach((result) => {
    let i = 0;
    let newP = document.createElement("p");
    newP.innerHTML = result;
    i++;
    containerResult.appendChild(newP);
  });
  // let newP = document.createElement("p");
  // newP.innerHTML =
  //   "Tu mascota atacó con " +
  //   playerAtack +
  //   ", la mascota del enemigo atacó con " +
  //   pcAtack +
  //   ". Esto quiere decir que " +
  //   scoreResult;

  // containerResult.appendChild(newP);
}

function showVictories(scoreResult) {
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
