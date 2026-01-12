document.addEventListener("DOMContentLoaded", () => {

  fetch("../../data/6e/fractions.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("contenu-cours");

      data.contenu.forEach((item, index) => {
        if (!["definition", "propriete", "exemple"].includes(item.type)) return;

        const bloc = document.createElement("div");
        bloc.className = `bloc-peda ${item.type}`;
        bloc.dataset.id = index;

        const saved = localStorage.getItem("fractions-6e-" + index);
        if (saved) bloc.classList.add(saved);

        bloc.innerHTML = `
          <div class="texte">${item.texte}</div>
          <div class="actions">
            <button class="btn-savoir">Je sais</button>
            <button class="btn-revoir">À revoir</button>
          </div>
        `;

        container.appendChild(bloc);
      });

      if (window.MathJax) MathJax.typeset();
    });

  document.addEventListener("click", e => {
    const bloc = e.target.closest(".bloc-peda");
    if (!bloc) return;

    const id = bloc.dataset.id;

    if (e.target.classList.contains("btn-savoir")) {
      bloc.classList.remove("revoir");
      bloc.classList.add("su");
      localStorage.setItem("fractions-6e-" + id, "su");
    }

    if (e.target.classList.contains("btn-revoir")) {
      bloc.classList.remove("su");
      bloc.classList.add("revoir");
      localStorage.setItem("fractions-6e-" + id, "revoir");
    }
  });

});
