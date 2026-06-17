// Import shared Firebase instance
import { auth } from "./shared/firebase-config.js";

// Import shared form utilities
import { showError, clearError, setLoading, friendlyAuthError, sanitizeInput }
  from "./shared/form-utils.js";

import { signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── DOM refs ─────────────────────────────────────────────────────────────────
const form          = document.getElementById("loginForm");
const emailInput    = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (!form || !emailInput || !passwordInput) {
  throw new Error(
    "Login form elements not found. Ensure the page contains #loginForm, #email, and #password."
  );
}

const submitBtn = form.querySelector(".btn.solid");

if (!submitBtn) {
  throw new Error("Submit button (.btn.solid) not found inside the login form.");
}

// ── Rate limiting ────────────────────────────────────────────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS   = 60_000;
let attemptCount   = 0;
let lockoutUntil   = 0;

// ── Form submit ──────────────────────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError("loginError");

  if (Date.now() < lockoutUntil) {
    const seconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
    showError(submitBtn, `Too many attempts. Please wait ${seconds}s.`, "loginError");
    return;
  }

  const email    = sanitizeInput(emailInput.value.trim());
  const password = passwordInput.value;

  if (!email) {
    showError(submitBtn, "Please enter your email.", "loginError");
    return;
  }

  if (!password) {
    showError(submitBtn, "Please enter your password.", "loginError");
    return;
  }

  setLoading(submitBtn, true, "Login");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    attemptCount = 0;
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login failed:", err);
    attemptCount++;

    if (attemptCount >= MAX_ATTEMPTS) {
      lockoutUntil = Date.now() + LOCKOUT_MS;
      attemptCount = 0;
      showError(submitBtn, "Too many failed attempts. Please wait 60 seconds.", "loginError");
      return;
    }

    showError(submitBtn, friendlyAuthError(err), "loginError");
  } finally {
    setLoading(submitBtn, false, "Login");
  }
});
