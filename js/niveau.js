document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("contenu-cours");

  // Ici on charge le premier chapitre par défaut
  const chapitre = "fractions"; 

  fetch(`../data/${niveau}/${chapitre}.json`)
    .then(res => res.json())
    .then(data => {
      data.contenu.forEach((item,i)=>{
        if(!["definition","propriete","exemple"].includes(item.type)) return;

        const div = document.createElement("div");
        div.className = `bloc-peda ${item.type}`;
        div.dataset.id = i;

        const saved = localStorage.getItem(`${niveau}-${chapitre}-${i}`);
        if(saved) div.classList.add(saved);

        div.innerHTML = `
          <div class="texte">${item.texte}</div>
          <div class="actions">
            <button class="btn-savoir">Je sais</button>
            <button class="btn-revoir">À revoir</button>
          </div>
        `;
        container.appendChild(div);
      });
      if(window.MathJax) MathJax.typeset();
      updateProgression();
    });

  // Boutons Je sais / À revoir
  document.addEventListener("click", e=>{
    const bloc = e.target.closest(".bloc-peda");
    if(!bloc) return;
    const id = bloc.dataset.id;
    if(e.target.classList.contains("btn-savoir")){
      bloc.classList.remove("revoir"); bloc.classList.add("su");
      localStorage.setItem(`${niveau}-${chapitre}-${id}`,"su");
    }
    if(e.target.classList.contains("btn-revoir")){
      bloc.classList.remove("su"); bloc.classList.add("revoir");
      localStorage.setItem(`${niveau}-${chapitre}-${id}`,"revoir");
    }
    setTimeout(updateProgression,50);
  });
});

function updateProgression(){
  const blocs = document.querySelectorAll(".bloc-peda");
  const total = blocs.length;
  let su=0;
  blocs.forEach(b=>{if(b.classList.contains("su")) su++;});
  const pct = total? Math.round(su/total*100):0;
  document.getElementById("progression-fill").style.width = pct+"%";
  document.getElementById("progression-texte").textContent = `${su}/${total} maîtrisés (${pct}%)`;
}
