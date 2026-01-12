document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("contenu-cours");

  fetch("../../data/6e/fractions.json")
    .then(res => res.json())
    .then(data => {

      data.contenu.forEach((item, index) => {
        if (!["definition", "propriete", "exemple"].includes(item.type)) return;

        const bloc = document.createElement("div");
        bloc.className = `bloc-peda ${item.type}`;
        bloc.dataset.id = index;

        // état sauvegardé
        const saved = localStorage.getItem("fractions-6e-" + index);
        if (saved) bloc.classList.add(saved);

        bloc.innerHTML = `
          <div class="texte">
            ${item.texte}
          </div>

          <div class="actions">
            <button class="btn-savoir">Je sais</button>
            <button class="btn-revoir">À revoir</button>
          </div>
        `;

        container.appendChild(bloc);
      });

      if (window.MathJax) MathJax.typeset();
      updateProgression();
    });

  // Gestion des clics
  document.addEventListener("click", e => {
    const bloc = e.target.closest(".bloc-peda");
    if (!bloc) return;

    const id = bloc.dataset.id
