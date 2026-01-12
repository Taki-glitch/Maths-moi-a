// Exemple de structure minimaliste de flashcards
const flashcards = [
  { question: "3/4 + 1/4 = ?", reponse: "1" },
  { question: "5/8 simplifié ?", reponse: "5/8" }
];

let index = 0;
function showCard() {
  const card = flashcards[index];
  document.getElementById('question').textContent = card.question;
  document.getElementById('reponse').textContent = '';
}

function showAnswer() {
  document.getElementById('reponse').textContent = flashcards[index].reponse;
}

function nextCard() {
  index = (index + 1) % flashcards.length;
  showCard();
}
