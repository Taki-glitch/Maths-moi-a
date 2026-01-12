document.addEventListener("DOMContentLoaded", () => {

  fetch("../../data/6e/fractions.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("contenu-cours");

      data.contenu.forEach((item, index) => {
        const bloc = document.createElement("div");
        bloc.className = item.type;
        bloc.innerHTML = `
          ${item.texte}
          <div class="actions">
            <button class="btn-savoir" data-id="${index}">Je sais</button>
            <button class="btn-revoir" data-id="${index}">À revoir</button>
          </div>
        `;
        container.appendChild(bloc);
      });

      if (window.MathJax) {
        MathJax.typeset();
      }
    });

  // Gestion Je sais / À revoir
  document.addEventListener("click", e => {
    if (!e.target.dataset.id) return;

    const id = e.target.dataset.id;
    const statut = e.target.classList.contains("btn-savoir")
      ? "su"
      : "revoir";

    localStorage.setItem("fractions-6e-" + id, statut);
  });

});
