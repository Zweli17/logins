// Shared form utility functions

/**
 * Generic error message for credential-related failures.
 * Prevents user enumeration by not distinguishing between
 * "user not found" and "wrong password".
 */
const GENERIC_CREDENTIAL_ERROR = "Invalid email or password.";

/**
 * Map of Firebase auth error codes to user-friendly messages.
 * Credential-related codes intentionally share a generic message
 * to prevent account enumeration attacks.
 */
export const AUTH_ERROR_MESSAGES = {
  "auth/user-not-found":          GENERIC_CREDENTIAL_ERROR,
  "auth/wrong-password":          GENERIC_CREDENTIAL_ERROR,
  "auth/invalid-email":           "Please enter a valid email address.",
  "auth/too-many-requests":       "Too many attempts. Please try again later.",
  "auth/network-request-failed":  "Network error. Check your connection.",
  "auth/invalid-credential":      GENERIC_CREDENTIAL_ERROR,
  "auth/email-already-in-use":    "This email is already registered.",
  "auth/weak-password":           "Password should be at least 6 characters.",
};

/**
 * Display an error message below the given anchor element.
 * Removes any previous error with the same `errorId` first.
 */
export function showError(anchorEl, message, errorId = "formError") {
  clearError(errorId);

  const err = document.createElement("p");
  err.id = errorId;
  err.textContent = message;
  err.style.cssText = `
    color: #f87171;
    font-size: 13px;
    text-align: center;
    margin-top: 8px;
  `;
  anchorEl.insertAdjacentElement("afterend", err);
}

/**
 * Remove the error element with the given id.
 */
export function clearError(errorId = "formError") {
  const existing = document.getElementById(errorId);
  if (existing) existing.remove();
}

/**
 * Toggle a submit button between loading and idle states.
 */
export function setLoading(btn, loading, idleLabel = "Submit") {
  btn.disabled = loading;
  btn.value = loading ? "Please wait..." : idleLabel;
}

/**
 * Return a friendly message for a Firebase auth error code.
 * Falls back to a generic credential error to avoid leaking
 * information about account existence.
 */
export function friendlyAuthError(err) {
  return AUTH_ERROR_MESSAGES[err.code] || GENERIC_CREDENTIAL_ERROR;
}

/**
 * Strip characters commonly used in XSS payloads from user input.
 */
export function sanitizeInput(str) {
  return str.replace(/[<>"'&]/g, "");
}
