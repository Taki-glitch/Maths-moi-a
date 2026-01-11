function toggleCorrection() {
  const corr = document.getElementById("correction");
  corr.classList.toggle("hidden");
}

//Sommaire 
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const sommaire = document.createElement("aside");
  sommaire.className = "sommaire";
  sommaire.innerHTML = "<h2>📑 Sommaire</h2><ul id='sommaire-list'></ul>";
  main.prepend(sommaire);

  const titres = main.querySelectorAll("h2, h3");
  const list = document.getElementById("sommaire-list");

  titres.forEach((titre, i) => {
    const id = "section-" + i;
    titre.id = id;
    const li = document.createElement("li");
    li.className = titre.tagName === "H3" ? "h3" : "";
    li.innerHTML = `<a href="#${id}">${titre.textContent}</a>`;
    list.appendChild(li);
  });
});
