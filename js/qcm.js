document.addEventListener("DOMContentLoaded", () => {
  fetch("../../data/6e/fractions.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("qcm");
      const progression = JSON.parse(localStorage.getItem("progression-6e")) || {};

      const qcms = data.contenu.filter(i => i.type === "qcm");

      qcms.forEach((qcm, index) => {
        const statut = progression?.fractions?.[qcm.lien];
        if (statut === "su") return;

        const div = document.createElement("div");
        div.className = "bloc qcm-bloc";

        div.innerHTML = `
          <p><strong>${qcm.question}</strong></p>
          ${qcm.choix.map((c,i) => `
            <label>
              <input type="radio" name="qcm${index}" value="${i}">
              ${c}
            </label><br>
          `).join("")}
          <button>Valider</button>
          <p class="resultat"></p>
        `;

        div.querySelector("button").onclick = () => {
          const checked = div.querySelector("input:checked");
          const res = div.querySelector(".resultat");
          if (!checked) return;

          const correct = checked.value == qcm.bonneReponse;
          res.textContent = correct ? "✅ Bonne réponse" : "❌ Mauvaise réponse";

          // Met à jour progression
          const prog = JSON.parse(localStorage.getItem("progression-6e")) || {};
          if (!prog.fractions) prog.fractions = {};
          prog.fractions[qcm.lien] = correct ? "su" : "revoir";
          localStorage.setItem("progression-6e", JSON.stringify(prog));

          // Update barre de progression
          if (window.updateProgression) updateProgression();
        };

        container.appendChild(div);
      });

      if (window.MathJax) MathJax.typeset();
    });
});
