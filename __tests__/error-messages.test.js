const {
  ERROR_MAP,
  getFirebaseErrorMessage,
  isKnownAuthError,
  getAllKnownErrorCodes,
} = require("../error-messages");

// ── ERROR_MAP ────────────────────────────────────────────────────────────────

describe("ERROR_MAP", () => {
  it("contains all expected Firebase auth error codes", () => {
    const expectedCodes = [
      "auth/user-not-found",
      "auth/wrong-password",
      "auth/invalid-email",
      "auth/too-many-requests",
      "auth/network-request-failed",
      "auth/invalid-credential",
    ];
    expectedCodes.forEach((code) => {
      expect(ERROR_MAP).toHaveProperty(code);
    });
  });

  it("maps each code to a non-empty string", () => {
    Object.values(ERROR_MAP).forEach((msg) => {
      expect(typeof msg).toBe("string");
      expect(msg.length).toBeGreaterThan(0);
    });
  });
});

// ── getFirebaseErrorMessage ──────────────────────────────────────────────────

describe("getFirebaseErrorMessage", () => {
  it("returns mapped message for known codes", () => {
    expect(getFirebaseErrorMessage("auth/user-not-found")).toBe(
      "No account found with this email."
    );
    expect(getFirebaseErrorMessage("auth/wrong-password")).toBe(
      "Incorrect password. Please try again."
    );
    expect(getFirebaseErrorMessage("auth/invalid-email")).toBe(
      "Please enter a valid email address."
    );
    expect(getFirebaseErrorMessage("auth/too-many-requests")).toBe(
      "Too many attempts. Please try again later."
    );
    expect(getFirebaseErrorMessage("auth/network-request-failed")).toBe(
      "Network error. Check your connection."
    );
    expect(getFirebaseErrorMessage("auth/invalid-credential")).toBe(
      "Invalid email or password."
    );
  });

  it("returns fallback for unknown code", () => {
    expect(getFirebaseErrorMessage("auth/unknown-code", "Custom fallback")).toBe(
      "Custom fallback"
    );
  });

  it("returns default message when no fallback is provided for unknown code", () => {
    expect(getFirebaseErrorMessage("auth/unknown-code")).toBe(
      "An unknown error occurred."
    );
  });

  it("returns default message for empty string code", () => {
    expect(getFirebaseErrorMessage("")).toBe("An unknown error occurred.");
  });

  it("returns default message for undefined code", () => {
    expect(getFirebaseErrorMessage(undefined)).toBe("An unknown error occurred.");
  });
});

// ── isKnownAuthError ─────────────────────────────────────────────────────────

describe("isKnownAuthError", () => {
  it("returns true for all known error codes", () => {
    getAllKnownErrorCodes().forEach((code) => {
      expect(isKnownAuthError(code)).toBe(true);
    });
  });

  it("returns false for unknown codes", () => {
    expect(isKnownAuthError("auth/fake-error")).toBe(false);
    expect(isKnownAuthError("")).toBe(false);
    expect(isKnownAuthError("random")).toBe(false);
  });
});

// ── getAllKnownErrorCodes ────────────────────────────────────────────────────

describe("getAllKnownErrorCodes", () => {
  it("returns an array of strings", () => {
    const codes = getAllKnownErrorCodes();
    expect(Array.isArray(codes)).toBe(true);
    codes.forEach((code) => {
      expect(typeof code).toBe("string");
    });
  });

  it("returns the same keys as ERROR_MAP", () => {
    expect(getAllKnownErrorCodes()).toEqual(Object.keys(ERROR_MAP));
  });
});
