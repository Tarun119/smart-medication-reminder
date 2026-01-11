const led = document.getElementById("led");
const statusText = document.getElementById("status");
const appStatus = document.getElementById("appStatus");
const demoSection = document.getElementById("demo");
const beep = document.getElementById("beepSound");

let audioUnlocked = false;
let autoTriggered = false;

// Unlock audio on first user interaction
document.addEventListener("click", () => {
  if (!audioUnlocked) {
    beep.play().then(() => {
      beep.pause();
      beep.currentTime = 0;
      audioUnlocked = true;
    }).catch(() => {});
  }
}, { once: true });

function scrollToDemo() {
  demoSection.scrollIntoView({ behavior: "smooth" });

  demoSection.classList.add("highlight");
  setTimeout(() => demoSection.classList.remove("highlight"), 1200);

  if (!autoTriggered) {
    setTimeout(triggerReminder, 700);
    autoTriggered = true;
  }
}

function triggerReminder() {
  led.classList.add("active");
  statusText.innerText = "🔔 Time to take your medicine.";
  appStatus.innerText = "Reminder sent";

  if (audioUnlocked) {
    beep.currentTime = 0;
    beep.play();
  }
}

function takePill() {
  if (!led.classList.contains("active")) {
    alert("No active reminder right now.");
    return;
  }
  led.classList.remove("active");
  statusText.innerText = "✅ Medicine taken successfully.";
  appStatus.innerText = "Dose recorded";
}

function toggleAccessibility() {
  document.body.classList.toggle("accessible");
}
