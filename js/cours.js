function toggleCorrection() {
  const corr = document.getElementById("correction");
  corr.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const sommaire = document.getElementById("sommaire-list");
  const titres = document.querySelectorAll("main h2, main h3");

  titres.forEach((titre, index) => {
    const id = "section-" + index;
    titre.id = id;

    const li = document.createElement("li");
    li.className = titre.tagName === "H3" ? "h3" : "";

    const a = document.createElement("a");
    a.href = "#" + id;
    a.textContent = titre.textContent;

    li.appendChild(a);
    sommaire.appendChild(li);
  });
});
