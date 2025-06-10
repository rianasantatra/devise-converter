async function convertir() {
  let montant = document.getElementById("montant").value;
  let devise = document.getElementById("devise").value;

  let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/mga.json`;
  let response = await fetch(url);
  let data = await response.json();

  let taux = data.conversion_rates[devise];
  let resultat = montant * taux;

  document.getElementById(
    "resultat"
  ).innerText = `Résultat : ${resultat.toFixed(2)} ${devise}`;
}
