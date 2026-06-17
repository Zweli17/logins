// Shared form utility functions

/**
 * Map of Firebase auth error codes to user-friendly messages.
 */
export const AUTH_ERROR_MESSAGES = {
  "auth/user-not-found":          "No account found with this email.",
  "auth/wrong-password":          "Incorrect password. Please try again.",
  "auth/invalid-email":           "Please enter a valid email address.",
  "auth/too-many-requests":       "Too many attempts. Please try again later.",
  "auth/network-request-failed":  "Network error. Check your connection.",
  "auth/invalid-credential":      "Invalid email or password.",
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
 * Return a friendly message for a Firebase auth error code,
 * falling back to the raw error message.
 */
export function friendlyAuthError(err) {
  return AUTH_ERROR_MESSAGES[err.code] || err.message;
}
