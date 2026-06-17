// Import shared Firebase instance
import { auth } from "./shared/firebase-config.js";

// Import shared form utilities
import { showError, clearError, setLoading, friendlyAuthError }
  from "./shared/form-utils.js";

import { createUserWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── DOM refs ─────────────────────────────────────────────────────────────────
const form             = document.getElementById("signupForm");
const emailInput       = document.getElementById("email");
const passwordInput    = document.getElementById("password");
const confirmPwdInput  = document.getElementById("confirmPassword");
const submitBtn        = form.querySelector(".btn.solid");

// ── Form submit ──────────────────────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError("signupError");

  const email       = emailInput.value.trim();
  const password    = passwordInput.value;
  const confirmPwd  = confirmPwdInput.value;

  if (!email) {
    showError(submitBtn, "Please enter your email.", "signupError");
    return;
  }

  if (!password) {
    showError(submitBtn, "Please enter a password.", "signupError");
    return;
  }

  if (password !== confirmPwd) {
    showError(submitBtn, "Passwords do not match.", "signupError");
    return;
  }

  setLoading(submitBtn, true, "Sign up");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "logins.html";
  } catch (err) {
    setLoading(submitBtn, false, "Sign up");
    showError(submitBtn, friendlyAuthError(err), "signupError");
  }
});
