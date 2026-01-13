/* ===== QCM ===== */
function verifierQCM(idChapitre) {
  let score = 0;
  let total = document.querySelectorAll(".question").length;

  document.querySelectorAll(".question").forEach(q => {
    const checked = q.querySelector("input:checked");
    if (checked && checked.dataset.correct === "true") {
      score++;
    }
  });

  document.getElementById("qcm-result").textContent =
    `Votre score : ${score} / ${total}`;

  enregistrerScore(idChapitre, score, total);
}

/* ===== FLASHCARDS ===== */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".flashcard").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("show");
    });
  });
});
