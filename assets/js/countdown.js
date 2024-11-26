const targetDate = new Date('January 11, 2025 09:00:00').getTime();
let menuOpen = false;

updateCountdown = () => {
  const now = new Date().getTime();
  const timeDifference = targetDate - now; // Time remaining in milliseconds
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownDiv = document.getElementById("countdown-div");
  const afterCountdownDiv = document.getElementById("after-countdown");

  if (timeDifference <= 0) {
    countdownDiv.style.display = "none";
    afterCountdownDiv.style.display = "block";
    return;
  }

  // Calculate time components
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the countdown
  daysElement.innerText = days;
  hoursElement.innerText = hours;
  minutesElement.innerText = minutes;
  secondsElement.innerText = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initialize countdown
updateCountdown();

window.toggleMenu = () => {
  const menuDiv = document.getElementById("nav-items");
  if (menuOpen) {
    menuDiv.style.display = "none";
  } else {
    menuDiv.style.display = "flex"
  }
  menuOpen = !menuOpen;
}

window.copyAccountNumberToClipboard = (accountNumber) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(accountNumber)
      .then(() => {
        alert("Account Number copied!");
      })
      .catch((err) => {
        console.error("Failed to copy account number:", err);
        alert("Failed to copy account number. Please try again.");
      });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = accountNumber;
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      alert("Account Number copied!");
    } catch (err) {
      console.error("Fallback copy failed:", err);
      alert("Failed to copy account number. Please try again.");
    }
    document.body.removeChild(textarea);
  }
};

document.getElementById("union-bank").addEventListener("click", () => {
  copyAccountNumberToClipboard('0066102231');
});

document.getElementById("access-bank").addEventListener("click", () => {
  copyAccountNumberToClipboard('1458305860');
});

document.getElementById("hamburger-menu").addEventListener("click", () => {
  console.log('HERE!!!!!')
  toggleMenu();
});