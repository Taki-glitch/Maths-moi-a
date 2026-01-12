// Charge les derniers cours pour la page d'accueil
const dernierCours = [
  { titre: "Fractions", niveau: "6e", lien: "niveaux/6e.html" },
  { titre: "Nombres entiers", niveau: "6e", lien: "niveaux/6e.html" },
  { titre: "Pourcentages", niveau: "3e", lien: "niveaux/3e.html" }
];

const ul = document.getElementById('dernier-cours');
if (ul) {
  dernierCours.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${c.lien}">${c.titre} (${c.niveau})</a>`;
    ul.appendChild(li);
  });
}
