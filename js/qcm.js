fetch("../data/6e/fractions.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("qcm");

    data.contenu
      .filter(item => item.type === "qcm")
      .forEach((qcm, index) => {
        const div = document.createElement("div");
        div.className = "bloc";

        div.innerHTML = `
          <p><strong>${qcm.question}</strong></p>
          ${qcm.choix.map((c, i) => `
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
          const result = div.querySelector(".resultat");

          if (!checked) return;

          result.textContent =
            checked.value == qcm.bonneReponse
              ? "✅ Bonne réponse"
              : "❌ Mauvaise réponse";
        };

        container.appendChild(div);
      });

    if (window.MathJax) MathJax.typeset();
  });
