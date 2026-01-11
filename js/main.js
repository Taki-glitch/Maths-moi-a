console.log("Site de maths chargé !");

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const liens = document.querySelectorAll("main ul li");

    liens.forEach(li => {
      const texte = li.textContent.toLowerCase();
      li.style.display = texte.includes(value) ? "" : "none";
    });
  });
});
