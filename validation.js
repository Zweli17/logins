/**
 * Validation utilities for the login form.
 */

function validateEmail(email) {
  if (typeof email !== "string") return { valid: false, error: "Please enter your email." };
  const trimmed = email.trim();
  if (!trimmed) return { valid: false, error: "Please enter your email." };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: "Please enter a valid email address." };
  return { valid: true, value: trimmed };
}

function validatePassword(password) {
  if (typeof password !== "string" || !password) {
    return { valid: false, error: "Please enter your password." };
  }
  return { valid: true, value: password };
}

function validateLoginForm(email, password) {
  const emailResult = validateEmail(email);
  if (!emailResult.valid) return emailResult;

  const passwordResult = validatePassword(password);
  if (!passwordResult.valid) return passwordResult;

  return { valid: true, email: emailResult.value, password: passwordResult.value };
}

module.exports = { validateEmail, validatePassword, validateLoginForm };
