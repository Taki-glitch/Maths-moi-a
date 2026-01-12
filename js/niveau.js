async function initNiveau(pathData) {
  const liste = document.getElementById('liste-chapitres');
  try {
    const response = await fetch(`${pathData}fractions.json`);
    const cours = await response.json();
    liste.innerHTML = '';
    cours.forEach(c => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h3>${c.emoji} <a href="#">${c.titre}</a></h3>
        <p>${c.definition}</p>
      `;
      liste.appendChild(article);
    });
  } catch (err) {
    console.error('Erreur chargement des cours:', err);
  }
}
