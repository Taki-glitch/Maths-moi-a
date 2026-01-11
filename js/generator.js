const fs = require("fs");
const path = require("path");

// Charger JSON
const data = JSON.parse(fs.readFileSync("chapitres.json"));

// Template HTML minimal
function template(niveau, chapitre) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${chapitre.titre} – ${niveau}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../css/style.css">
  <link rel="stylesheet" href="../../css/cours.css">
</head>
<body>
<header>
  <h1>${chapitre.emoji} ${chapitre.titre}</h1>
  <p>Niveau : ${niveau}</p>
</header>

<nav>
  <a href="../../niveaux/${niveau}.html">← Retour au niveau ${niveau}</a>
</nav>

<main>
  <section class="cours">
    <h2>📘 Le cours</h2>
    <p>Contenu du chapitre ici...</p>
  </section>

  <section class="exercices">
    <h2>✏️ Exercices</h2>
    <p>Exercices à compléter</p>
  </section>
</main>

<footer>
  <p>© 2026 – Maths pour tous</p>
</footer>
</body>
</html>
  `;
}

// Générer les fichiers
for (const niveau in data) {
  const folder = path.join("cours", niveau);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  data[niveau].forEach(chapitre => {
    const filePath = path.join(folder, chapitre.file);
    fs.writeFileSync(filePath, template(niveau, chapitre));
    console.log("Créé :", filePath);
  });
}
