fetch("../data/6e/fractions.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("flashcards");

    data.contenu
      .filter(item => item.flashcard)
      .forEach(card => {
        const div = document.createElement("div");
        div.className = "flashcard";
        div.innerHTML = `
          <div class="question">${card.flashcard.question}</div>
          <div class="reponse hidden">${card.flashcard.reponse}</div>
        `;

        div.addEventListener("click", () => {
          div.querySelector(".reponse").classList.toggle("hidden");
          if (window.MathJax) MathJax.typeset();
        });

        container.appendChild(div);
      });

    if (window.MathJax) MathJax.typeset();
  });
