/**
 * DOM helper functions for the login form UI.
 */

function showError(message, anchorElement) {
  clearError();
  const err = document.createElement("p");
  err.id = "loginError";
  err.textContent = message;
  err.style.cssText = [
    "color: #f87171",
    "font-size: 13px",
    "text-align: center",
    "margin-top: 8px",
  ].join("; ");
  anchorElement.insertAdjacentElement("afterend", err);
  return err;
}

function clearError() {
  const existing = document.getElementById("loginError");
  if (existing) existing.remove();
}

function setLoading(button, loading) {
  button.disabled = loading;
  button.value = loading ? "Signing in..." : "Login";
}

module.exports = { showError, clearError, setLoading };
