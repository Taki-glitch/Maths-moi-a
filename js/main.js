document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const items = document.querySelectorAll("main ul li");

    items.forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(value) ? "" : "none";
    });
  });
});
