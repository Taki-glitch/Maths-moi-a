document.addEventListener("DOMContentLoaded",()=>{
  const container = document.getElementById("qcm");
  const chapitre = "fractions";

  fetch(`../data/${niveau}/${chapitre}.json`)
    .then(res=>res.json())
    .then(data=>{
      const qcms = data.contenu.filter(i=>i.type==="qcm");

      qcms.forEach((qcm,index)=>{
        const div = document.createElement("div");
        div.className="bloc";

        div.innerHTML = `<p><strong>${qcm.question}</strong></p>
          ${qcm.choix.map((c,i)=>`<label><input type="radio" name="qcm${index}" value="${i}"> ${c}</label><br>`).join('')}
          <button>Valider</button>
          <p class="resultat"></p>
        `;
        div.querySelector("button").onclick=()=>{
          const checked = div.querySelector("input:checked");
          const res = div.querySelector(".resultat");
          if(!checked) return;
          res.textContent = checked.value==qcm.bonneReponse ? "✅ Bonne réponse" : "❌ Mauvaise réponse";
        };
        container.appendChild(div);
      });
    });
});
