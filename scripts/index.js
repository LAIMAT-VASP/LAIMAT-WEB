function calculerHypotenuse() {
  // Récupérer les valeurs des côtés
  var cote1 = parseInt(document.getElementById("cote1").value);
  var cote2 = parseInt(document.getElementById("cote2").value);
  var hypotenuse = Math.sqrt(cote1 * cote1 + cote2 * cote2);

  // Arrondir le résultat à 2 décimales
  hypotenuse = Math.round(hypotenuse * 100) / 100;

  // Afficher le résultat dans la page
  document.getElementById("hypotenuse").value = hypotenuse;
  document.getElementById("cote-triangle1").innerHTML = cote1;
  document.getElementById("cote-triangle2").innerHTML = cote2;
  document.getElementById("cote-triangle3").innerHTML = hypotenuse;
}

var canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 300;

var object = new Image();
object.src = "images/ok.png";

var position = {
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
  var ctx = canvas.getContext("2d");
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
    return;
  }

  var hauteur = parseInt(document.getElementById("hauteur").value);
  var vitesse = Math.sqrt(2 * hauteur * 9.81);
  let vitesseKmh = vitesse * 3.6;
  vitesseKmh = Math.round(vitesseKmh * 100) / 100;
  document.getElementById("vitesse").value = vitesseKmh + " km/h";
  document.getElementById("hauteurDepart").innerHTML = hauteur;
  document.getElementById("hauteurDepartMoitie").innerHTML = hauteur / 2;

  stopAnimation();
  animate();
}
