/**
 * Maps Firebase auth error codes to user-friendly messages.
 */

const ERROR_MAP = {
  "auth/user-not-found":          "No account found with this email.",
  "auth/wrong-password":          "Incorrect password. Please try again.",
  "auth/invalid-email":           "Please enter a valid email address.",
  "auth/too-many-requests":       "Too many attempts. Please try again later.",
  "auth/network-request-failed":  "Network error. Check your connection.",
  "auth/invalid-credential":      "Invalid email or password.",
};

function getFirebaseErrorMessage(errorCode, fallback) {
  return ERROR_MAP[errorCode] || fallback || "An unknown error occurred.";
}

function isKnownAuthError(errorCode) {
  return errorCode in ERROR_MAP;
}

function getAllKnownErrorCodes() {
  return Object.keys(ERROR_MAP);
}

module.exports = { ERROR_MAP, getFirebaseErrorMessage, isKnownAuthError, getAllKnownErrorCodes };
