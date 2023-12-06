const words = ["Tokens", "NFTs", "dApps"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

let walletConnected = false;

if (document.getElementById("nav-icon-open")) {
  document.getElementById("nav-icon-open").addEventListener("click", openMenu);
}

if (document.getElementById("nav-icon-close")) {
  document
    .getElementById("nav-icon-close")
    .addEventListener("click", closeMenu);
}

function openMenu() {
  document.getElementById("nav-links-mobile").classList.add("active");
  document.getElementById("nav-icon-open").style.display = "none";
  document.getElementById("nav-icon-close").style.display = "block";
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  document.getElementById("nav-links-mobile").classList.remove("active");
  document.getElementById("nav-icon-open").style.display = "block";
  document.getElementById("nav-icon-close").style.display = "none";
  document.body.classList.remove("no-scroll");
}

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

function hideConnectingModal() {
  document.getElementById("walletModal").classList.add("hidden");
}

// SOLANA Connect Wallet
async function connectWallet() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const response = await window.solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());

      walletConnected = true;

      const walletAddress = response.publicKey.toString();
      const shortenedAddress = `${walletAddress.substring(
        0,
        5
      )}...${walletAddress.substring(walletAddress.length - 5)}`;
      document.getElementById("connectWalletButton").innerText =
        shortenedAddress;

      // Close the modal after succesfully connecting
      hideConnectingModal();
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("Phantom wallet not found! Please install it.");
  }
}

// Disconnect wallet function
function disconnectWallet() {
  if (window.solana && window.solana.disconnect) {
    try {
      window.solana.disconnect();
      document.getElementById("connectWalletButton").innerText =
        "Connect Wallet";
      walletConnected = false; // Update the wallet connection status
      hideDisconnectModal(); // Ensure the disconnect modal is hidden after disconnecting
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    }
  } else {
    console.error("Wallet disconnect function not available");
  }
}

function showModal() {
  document.getElementById("walletModal").classList.remove("hidden");
}

document
  .getElementById("connectPhantom")
  .addEventListener("click", function () {
    connectWallet();
    hideModal();
  });

window.addEventListener("click", function (event) {
  var modal = document.getElementById("walletModal");
  if (event.target == modal) {
    hideModal();
  }
});

function showDisconnectModal() {
  document.getElementById("disconnectModal").classList.remove("hidden");
}

function hideDisconnectModal() {
  document.getElementById("disconnectModal").classList.add("hidden");
}

document
  .getElementById("confirmDisconnect")
  .addEventListener("click", function () {
    disconnectWallet();
    hideDisconnectModal(); // This is correctly placed
  });
