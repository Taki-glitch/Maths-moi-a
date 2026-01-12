const NIVEAU = "6e";
const CHAPITRE = "fractions";

document.addEventListener("DOMContentLoaded", () => {
  fetch(`../../data/${NIVEAU}/${CHAPITRE}.json`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("contenu-cours");
      const progression = getProgression(NIVEAU);

      data.contenu
        .filter(i => ["definition", "propriete", "exemple"].includes(i.type))
        .forEach((item, index) => {
          const bloc = document.createElement("div");
          bloc.className = `bloc-peda ${item.type}`;
          bloc.dataset.id = index;

          const etat = progression?.[CHAPITRE]?.[index];
          if (etat) bloc.classList.add(etat);

          bloc.innerHTML = `
            <h3>${item.titre}</h3>
            <div class="texte">${item.texte}</div>
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
});

document.addEventListener("click", e => {
  const bloc = e.target.closest(".bloc-peda");
  if (!bloc) return;
  const id = bloc.dataset.id;

  if (e.target.classList.contains("btn-savoir")) {
    bloc.classList.remove("revoir");
    bloc.classList.add("su");
    setProgression(NIVEAU, CHAPITRE, id, "su");
  }

  if (e.target.classList.contains("btn-revoir")) {
    bloc.classList.remove("su");
    bloc.classList.add("revoir");
    setProgression(NIVEAU, CHAPITRE, id, "revoir");
  }

  updateProgression();
});

/* ===== PROGRESSION ===== */
function getProgression(niveau) {
  return JSON.parse(localStorage.getItem("progression-" + niveau)) || {};
}

function setProgression(niveau, chapitre, id, etat) {
  const prog = getProgression(niveau);
  if (!prog[chapitre]) prog[chapitre] = {};
  prog[chapitre][id] = etat;
  localStorage.setItem("progression-" + niveau, JSON.stringify(prog));
}

function updateProgression() {
  const blocs = document.querySelectorAll(".bloc-peda");
  const total = blocs.length;
  let su = 0;

  blocs.forEach(b => { if (b.classList.contains("su")) su++; });

  const pourcentage = total ? Math.round((su / total) * 100) : 0;
  document.getElementById("progression-fill").style.width = pourcentage + "%";
  document.getElementById("progression-texte").textContent =
    `${su} / ${total} notions maîtrisées (${pourcentage} %)`;
}
