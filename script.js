
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
