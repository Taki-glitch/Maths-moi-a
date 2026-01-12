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

    const id = bloc.dataset.id;

    if (e.target.classList.contains("btn-savoir")) {
      bloc.classList.remove("revoir");
      bloc.classList.add("su");
      localStorage.setItem("fractions-6e-" + id, "su");
      updateProgression();
    }

    if (e.target.classList.contains("btn-revoir")) {
      bloc.classList.remove("su");
      bloc.classList.add("revoir");
      localStorage.setItem("fractions-6e-" + id, "revoir");
      updateProgression();
    }
  });

});

// =======================
// PROGRESSION
// =======================
function updateProgression() {
  const blocs = document.querySelectorAll(".bloc-peda");
  const total = blocs.length;
  let su = 0;

  blocs.forEach(b => {
    if (b.classList.contains("su")) su++;
  });

  const pourcentage = total ? Math.round((su / total) * 100) : 0;

  const fill = document.getElementById("progression-fill");
  const texte = document.getElementById("progression-texte");

  if (fill) fill.style.width = pourcentage + "%";
  if (texte) {
    texte.textContent = `${su} / ${total} éléments maîtrisés (${pourcentage} %)`;
  }
}
