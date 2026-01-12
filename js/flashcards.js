document.addEventListener("DOMContentLoaded", () => {
  fetch("../../data/6e/fractions.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("flashcards");

      data.contenu
        .filter(item => ["definition", "propriete"].includes(item.type))
        .forEach(item => {
          const card = document.createElement("div");
          card.className = "flashcard";

          card.innerHTML = `
            <div class="question">${item.titre}</div>
            <div class="reponse hidden">${item.texte}</div>
            <button class="btn-flip">Voir la réponse</button>
          `;

          container.appendChild(card);
        });

      if (window.MathJax) MathJax.typeset();
    });

  document.addEventListener("click", e => {
    if (!e.target.classList.contains("btn-flip")) return;
    const card = e.target.closest(".flashcard");
    card.querySelector(".reponse").classList.toggle("hidden");
  });
});
