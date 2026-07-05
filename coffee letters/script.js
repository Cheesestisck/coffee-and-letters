const form = document.getElementById("form");
const button = document.getElementById("submit");
const textarea = document.getElementById("text");
const counter = document.getElementById("counter");

//Prompts
const prompts = [
    "What's something you've never said out loud?",
    "Tell your younger self something.",
    "Write to someone you'll never meet.",
    "Describe a memory that still makes you smile.",
    "What gives you hope these days?",
    "What's something you're grateful for today?",
    "Write a letter to your future self.",
    "If your heart could speak, what would it say?",
    "Tell someone what you wish they knew.",
    "Describe your favorite coffee shop memory.",
    "Write one sentence that someone else might need today.",
    "What's a lesson life taught you recently?",
    "Confess something harmless you've always wanted to admit.",
    "Write about a place you miss.",
    "What would you say if nobody could judge you?"
];
const randomIndex = Math.floor(Math.random() * prompts.length);

document.getElementById("promptz").textContent = prompts[randomIndex];

form.addEventListener("submit", function (e) {

    e.preventDefault();

    button.disabled = true;
    button.textContent = "Sending...";
    textarea.disabled = true;

    const title = document.getElementById("title").value.trim();
    const text = textarea.value.trim();

    fetch("https://script.google.com/macros/s/AKfycbwsQZm0PQFmGSwiujm7uJgPlr-EHH-0-mGFVvqWj3rIsowq9mVemOlbf4NAV9TgjJ6-Hg/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain"
    },
    body: JSON.stringify({
        title: title,
        letter: text
    })
})
    .then(() => {
    console.log("Sent successfully!");
    window.location.href = "thankyou.html";
})
    .catch(error => {
    console.error(error);
    button.disabled = false;
        button.textContent = "Submit Letter";
        textarea.disabled = false;

});

//Word Counter
const MAX_WORDS = 100;

text.addEventListener("input", () => {

    let words = text.value
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);

    if (words.length > MAX_WORDS) {

        text.value = words
            .slice(0, MAX_WORDS)
            .join(" ");

        words = text.value.split(/\s+/);

    }

    counter.textContent =
        `${words.length} / ${MAX_WORDS} words`;

});


});