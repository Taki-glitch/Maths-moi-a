function enregistrerScore(chapitre, score, total) {
  let progression = JSON.parse(localStorage.getItem("progressionMaths")) || {};

  progression[chapitre] = {
    score: score,
    total: total,
    date: new Date().toLocaleDateString()
  };

  localStorage.setItem("progressionMaths", JSON.stringify(progression));
}
