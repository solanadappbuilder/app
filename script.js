const words = ["Tokens", "NFTs", "dApps"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeWord() {
  const target = document.getElementById("changing-word");
  const word = words[index];
  let delay = isDeleting ? 50 : 150; // Speed of typing and deleting

  if (isDeleting) {
    currentWord = word.substring(0, charIndex - 1);
  } else {
    currentWord = word.substring(0, charIndex + 1);
  }

  target.textContent = currentWord;
  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  if (!isDeleting && currentWord === word) {
    // Word is complete, start deleting after some pause
    delay = 1000;
    isDeleting = true;
  } else if (isDeleting && currentWord === "") {
    // Word is completely deleted, move to next word after a pause
    isDeleting = false;
    index = (index + 1) % words.length;
    delay = 500; // Pause before typing next word
    charIndex = 0; // Reset character index for new word
  }

  setTimeout(typeWord, delay);
}

// Initial delay before typing starts
setTimeout(typeWord, 1500);
