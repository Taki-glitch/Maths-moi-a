document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("flashcards");
  const chapitre = "fractions";

  fetch(`../data/${niveau}/${chapitre}.json`)
    .then(res=>res.json())
    .then(data=>{
      data.contenu.forEach((item,i)=>{
        if(!["definition","propriete"].includes(item.type)) return;

        const card = document.createElement("div");
        card.className = "flashcard";
        card.innerHTML = `
          <div class="front">${item.texte}</div>
          <div class="back">Réponse / Exemple</div>
        `;
        container.appendChild(card);
      });
    });
});
