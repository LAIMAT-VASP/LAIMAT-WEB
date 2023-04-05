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
