const messages = [
  "✨ Thanks for visiting my website!",
  "🚀 Keep learning and keep growing!",
  "💡 Every great idea starts somewhere."
];

const helloBtn = document.getElementById("helloBtn");
const helloMessage = document.getElementById("helloMessage");

// Surprise button
helloBtn.addEventListener("click", function () {
  const random = Math.floor(Math.random() * messages.length);
  helloMessage.textContent = messages[random];
});

// Random fun facts
const facts = [
  "I believe practice is one of the best ways to improve.",
  "I enjoy learning how websites are created.",
  "Gaming can involve strategy, patience, and teamwork.",
  "My goal is to keep improving and learning new skills.",
  "I think a good website should look nice and be easy to use."
];

let previous = -1;

const factBtn = document.getElementById("factBtn");
const factDisplay = document.getElementById("fact");

factBtn.addEventListener("click", function () {
  let random;

  do {
    random = Math.floor(Math.random() * facts.length);
  } while (random === previous);

  previous = random;

  factDisplay.textContent = "💬 " + facts[random];
  factBtn.textContent = "Show Another Fact ↻";
});

// Update copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Reveal sections when scrolling
const sections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
} else {
  sections.forEach(function (section) {
    section.classList.add("show");
  });
}

// Memory match mini game
const symbols = ["🎮", "🎧", "📚", "🤝", "🧩", "💡"];

const grid = document.getElementById("memoryGrid");
const movesEl = document.getElementById("moves");
const matchedEl = document.getElementById("matched");
const bestEl = document.getElementById("best");
const gameMessage = document.getElementById("gameMessage");
const restartBtn = document.getElementById("restartBtn");

let firstCard = null;
let lock = false;
let moves = 0;
let matchedPairs = 0;

function getBest() {
  try {
    return parseInt(localStorage.getItem("memoryBest"), 10) || null;
  } catch (e) {
    return null;
  }
}

function saveBest(value) {
  try {
    localStorage.setItem("memoryBest", value);
  } catch (e) {}
}

function showBest() {
  const best = getBest();
  bestEl.textContent = best ? best : "–";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  firstCard = null;
  lock = false;
  moves = 0;
  matchedPairs = 0;
  movesEl.textContent = 0;
  matchedEl.textContent = 0;
  gameMessage.textContent = "";
  grid.innerHTML = "";
  showBest();

  shuffle([...symbols, ...symbols]).forEach(function (symbol) {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.type = "button";
    card.dataset.symbol = symbol;
    card.textContent = symbol;
    card.setAttribute("aria-label", "Hidden card");
    card.addEventListener("click", function () {
      flipCard(card);
    });
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (lock || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.setAttribute("aria-label", "Card " + card.dataset.symbol);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  moves++;
  movesEl.textContent = moves;

  if (firstCard.dataset.symbol === card.dataset.symbol) {
    firstCard.classList.replace("flipped", "matched");
    card.classList.replace("flipped", "matched");
    firstCard = null;
    matchedPairs++;
    matchedEl.textContent = matchedPairs;

    if (matchedPairs === symbols.length) endGame();
  } else {
    lock = true;
    const secondCard = card;
    setTimeout(function () {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.setAttribute("aria-label", "Hidden card");
      secondCard.setAttribute("aria-label", "Hidden card");
      firstCard = null;
      lock = false;
    }, 800);
  }
}

function endGame() {
  const best = getBest();

  if (!best || moves < best) {
    saveBest(moves);
    showBest();
    gameMessage.textContent = "🏆 New best: " + moves + " moves!";
  } else {
    gameMessage.textContent = "🎉 You did it in " + moves + " moves!";
  }
}

restartBtn.addEventListener("click", startGame);
startGame();
