// Exemple QCM simple
const qcm = [
  {
    question: "Quel est le résultat de 1/2 + 1/4 ?",
    options: ["1/4", "3/4", "2/3"],
    reponse: "3/4"
  }
];

function showQCM() {
  const container = document.getElementById('qcm-container');
  container.innerHTML = '';
  qcm.forEach((q, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${q.question}</p>` +
      q.options.map(opt => `<button onclick="checkAnswer(${i}, '${opt}')">${opt}</button>`).join('');
    container.appendChild(div);
  });
}

function checkAnswer(i, selected) {
  alert(selected === qcm[i].reponse ? "✅ Correct" : "❌ Incorrect");
}
