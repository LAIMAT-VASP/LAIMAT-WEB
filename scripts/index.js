const apiUrl = "http://localhost:5000/"; // URL de l'API

let ok = new Image();
ok.src = "images/ok.png";

let aymericok = new Image();
aymericok.src = "images/aymericok.png";

let glouglou = new Image();
glouglou.src = "images/glouglou.png";

let luciedodo = new Image();
luciedodo.src = "images/luciedodo.png";

let sarko = new Image();
sarko.src = "images/sarko.png";

let standodo = new Image();
standodo.src = "images/standodo.png";

let stanstare = new Image();
stanstare.src = "images/stanstare.png";

function calculerHypotenuse() {
  // Vérifier que les valeurs des côtés sont bien des nombres
  if (
    document.getElementById("cote1").value == "" ||
    document.getElementById("cote2").value == ""
  ) {
    document.getElementById("hypotenuse").value = "0";
    alert("Les valeurs des côtés doivent être des nombres");
    return;
  }

  // check if values are between 1 and 10000
  if (
    document.getElementById("cote1").value < 1 ||
    document.getElementById("cote1").value > 10000 ||
    document.getElementById("cote2").value < 1 ||
    document.getElementById("cote2").value > 10000
  ) {
    document.getElementById("hypotenuse").value = "0";
    alert("Les valeurs des côtés doivent être entre 1 et 10000");
    return;
  }

  // Vérifier que les valeurs des côtés sont bien des nombres
  if (
    isNaN(document.getElementById("cote1").value) ||
    isNaN(document.getElementById("cote2").value)
  ) {
    document.getElementById("hypotenuse").value = "0";
    alert("Les valeurs des côtés doivent être des nombres");
    return;
  }

  // if valeurs == 49 et 3 do something funny
  if (
    document.getElementById("cote1").value == 49 &&
    document.getElementById("cote2").value == 3
  ) {
    document.getElementById("hypotenuse").value = "50";
    document.getElementById("cote-triangle1").innerHTML = 49;
    document.getElementById("cote-triangle2").innerHTML = 3;
    document.getElementById("cote-triangle3").innerHTML = "Macron démission";

    let son = new Audio("sounds/indign.mp3");
    son.play();
    return;
  }

  // Récupérer les valeurs des côtés
  let cote1 = parseInt(document.getElementById("cote1").value);
  let cote2 = parseInt(document.getElementById("cote2").value);

  axios
    .get(apiUrl + "hypothenuse?isJson=true&a=" + cote1 + "&b=" + cote2)
    .then((response) => {
      let hypotenuse = response.data.hypothenuse;

      // Arrondir le résultat à 2 décimales
      hypotenuse = Math.round(hypotenuse * 100) / 100;

      // Afficher le résultat dans la page
      document.getElementById("hypotenuse").value = hypotenuse;
      document.getElementById("cote-triangle1").innerHTML = cote1;
      document.getElementById("cote-triangle2").innerHTML = cote2;
      document.getElementById("cote-triangle3").innerHTML = hypotenuse;
    });
}

let canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 300;

// initialisation de l'objet avec une image aléatoire parmi les 6
let object = new Image();

function defineRandomObject() {
  let random = Math.floor(Math.random() * 6);
  switch (random) {
    case 0:
      object = ok;
      break;
    case 1:
      object = aymericok;
      break;
    case 2:
      object = glouglou;
      break;
    case 3:
      object = luciedodo;
      break;
    case 4:
      object = sarko;
      break;
    case 5:
      object = standodo;
      break;
    case 6:
      object = stanstare;
      break;
    default:
      object = ok;
      break;
  }
}

let position = {
  x: canvas.width / 2 - object.width / 2,
  y: -object.height / 2,
};

let vitesseAnimation = 0;
let nbRebond = 0;

let animationId;

function animate() {
  animationId = requestAnimationFrame(animate); // appel récursif
  position.y += vitesseAnimation;
  vitesseAnimation += 0.8; // accélération
  if (position.y + object.height > canvas.height) {
    position.y = canvas.height - object.height;
    vitesseAnimation = -0.3 * vitesseAnimation; // rebond
  }
  // stop animation
  if (position.y + object.height >= canvas.height) {
    nbRebond++;
    if (vitesseAnimation < 0.5 && nbRebond > 1) {
      vitesseAnimation = 0;
    }
  }
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(object, position.x - 100, position.y);
}

function stopAnimation() {
  cancelAnimationFrame(animationId);
}

function calculVitesseDepuishauteur() {
  // Reset animation
  position.y = 0;
  vitesseAnimation = 0;
  nbRebond = 0;

  if (
    document.getElementById("hauteur").value == "" ||
    document.getElementById("hauteur").value == 0
  ) {
    document.getElementById("vitesse").value = "0 km/h";
    alert("La valeur de la hauteur doit être un nombre");
    return;
  }

  // check if values are between 1 and 10000
  if (
    document.getElementById("hauteur").value < 1 ||
    document.getElementById("hauteur").value > 10000
  ) {
    document.getElementById("vitesse").value = "0 km/h";
    alert("La valeur de la hauteur doit être entre 1 et 10000");
    return;
  }

  // Vérifier que les valeurs des côtés sont bien des nombres
  if (isNaN(document.getElementById("hauteur").value)) {
    document.getElementById("vitesse").value = "0 km/h";
    alert("La valeur de la hauteur doit être un nombre");
    return;
  }

  let hauteur = parseInt(document.getElementById("hauteur").value);

  axios.get(apiUrl + "speed?isJson=true&height=" + hauteur).then((response) => {
    let vitesse = response.data.speedInMeters;

    document.getElementById("vitesse").value = vitesse + " km/h";
    document.getElementById("hauteurDepart").innerHTML = hauteur;
    document.getElementById("hauteurDepartMoitie").innerHTML = hauteur / 2;

    // play sound
    let audio = new Audio("sounds/sound.mp3");
    audio.play();

    defineRandomObject();

    stopAnimation();
    animate();
  });
}
