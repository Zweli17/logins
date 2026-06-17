// Import shared Firebase instance
import { auth } from "./shared/firebase-config.js";

// Import shared form utilities
import { showError, clearError, setLoading, friendlyAuthError }
  from "./shared/form-utils.js";

import { signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── DOM refs ─────────────────────────────────────────────────────────────────
const form          = document.getElementById("loginForm");
const emailInput    = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn     = form.querySelector(".btn.solid");

// ── Form submit ──────────────────────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError("loginError");

  const email    = emailInput.value.trim();
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
    window.location.href = "dashboard.html";
  } catch (err) {
    setLoading(submitBtn, false, "Login");
    showError(submitBtn, friendlyAuthError(err), "loginError");
  }
});
