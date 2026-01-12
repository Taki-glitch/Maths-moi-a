document.addEventListener("DOMContentLoaded", ()=>{
  const main = document.querySelector("main");
  const sommaire = document.getElementById("sommaire-list");
  const titres = main.querySelectorAll("h2,h3");

  titres.forEach((titre,i)=>{
    const id = "section-"+i;
    titre.id=id;
    const li = document.createElement("li");
    li.className = titre.tagName==="H3"?"h3":"";
    li.innerHTML = `<a href="#${id}">${titre.textContent}</a>`;
    sommaire.appendChild(li);
  });
});
