// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── Firebase config ──────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyC5btsQCQLoMoMJXdgulyuT4exmiNYIvQc",
  authDomain: "learn-excel-c7ff3.firebaseapp.com",
  projectId: "learn-excel-c7ff3",
  storageBucket: "learn-excel-c7ff3.firebasestorage.app",
  messagingSenderId: "276738291649",
  appId: "1:276738291649:web:6bde709f8e7f3834d52140",
  measurementId: "G-ZPEKVQX551"
};

// ── Init Firebase ────────────────────────────────────────────────────────────
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── DOM refs ─────────────────────────────────────────────────────────────────
const form          = document.getElementById("loginForm");
const emailInput    = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn     = form.querySelector(".btn.solid");

// ── Helpers ──────────────────────────────────────────────────────────────────
function showError(message) {
  // Remove any existing error message first
  const existing = document.getElementById("loginError");
  if (existing) existing.remove();

  const err = document.createElement("p");
  err.id = "loginError";
  err.textContent = message;
  err.style.cssText = `
    color: #f87171;
    font-size: 13px;
    text-align: center;
    margin-top: 8px;
  `;
  submitBtn.insertAdjacentElement("afterend", err);
}

function clearError() {
  const existing = document.getElementById("loginError");
  if (existing) existing.remove();
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.value = loading ? "Signing in..." : "Login";
}

// ── Form submit ──────────────────────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  const email    = emailInput.value.trim();
  const password = passwordInput.value;

  // Basic validation
  if (!email) {
    showError("Please enter your email.");
    return;
  }

  if (!password) {
    showError("Please enter your password.");
    return;
  }

  setLoading(true);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect on success — change "dashboard.html" to your actual page
    window.location.href = "dashboard.html";
  } catch (err) {
    setLoading(false);

    // Friendly error messages
    const messages = {
      "auth/user-not-found":       "No account found with this email.",
      "auth/wrong-password":       "Incorrect password. Please try again.",
      "auth/invalid-email":        "Please enter a valid email address.",
      "auth/too-many-requests":    "Too many attempts. Please try again later.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/invalid-credential":   "Invalid email or password.",
    };

    showError(messages[err.code] || err.message);
  }
});