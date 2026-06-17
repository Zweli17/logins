const { validateEmail, validatePassword, validateLoginForm } = require("../validation");

// ── validateEmail ────────────────────────────────────────────────────────────

describe("validateEmail", () => {
  it("rejects empty string", () => {
    expect(validateEmail("")).toEqual({ valid: false, error: "Please enter your email." });
  });

  it("rejects whitespace-only string", () => {
    expect(validateEmail("   ")).toEqual({ valid: false, error: "Please enter your email." });
  });

  it("rejects null / undefined / non-string", () => {
    expect(validateEmail(null)).toEqual({ valid: false, error: "Please enter your email." });
    expect(validateEmail(undefined)).toEqual({ valid: false, error: "Please enter your email." });
    expect(validateEmail(42)).toEqual({ valid: false, error: "Please enter your email." });
  });

  it("rejects email without @", () => {
    expect(validateEmail("userexample.com")).toEqual({
      valid: false,
      error: "Please enter a valid email address.",
    });
  });

  it("rejects email without domain", () => {
    expect(validateEmail("user@")).toEqual({
      valid: false,
      error: "Please enter a valid email address.",
    });
  });

  it("rejects email without TLD", () => {
    expect(validateEmail("user@example")).toEqual({
      valid: false,
      error: "Please enter a valid email address.",
    });
  });

  it("accepts a standard email", () => {
    const result = validateEmail("user@example.com");
    expect(result).toEqual({ valid: true, value: "user@example.com" });
  });

  it("trims leading/trailing whitespace", () => {
    const result = validateEmail("  user@example.com  ");
    expect(result).toEqual({ valid: true, value: "user@example.com" });
  });

  it("accepts email with subdomains", () => {
    expect(validateEmail("a@b.c.d")).toEqual({ valid: true, value: "a@b.c.d" });
  });

  it("accepts email with plus addressing", () => {
    expect(validateEmail("user+tag@example.com")).toEqual({
      valid: true,
      value: "user+tag@example.com",
    });
  });
});

// ── validatePassword ─────────────────────────────────────────────────────────

describe("validatePassword", () => {
  it("rejects empty string", () => {
    expect(validatePassword("")).toEqual({ valid: false, error: "Please enter your password." });
  });

  it("rejects null / undefined", () => {
    expect(validatePassword(null)).toEqual({ valid: false, error: "Please enter your password." });
    expect(validatePassword(undefined)).toEqual({
      valid: false,
      error: "Please enter your password.",
    });
  });

  it("rejects non-string types", () => {
    expect(validatePassword(123)).toEqual({ valid: false, error: "Please enter your password." });
  });

  it("accepts any non-empty string", () => {
    expect(validatePassword("secret")).toEqual({ valid: true, value: "secret" });
  });

  it("does not trim password (spaces are valid)", () => {
    expect(validatePassword("  pass  ")).toEqual({ valid: true, value: "  pass  " });
  });
});

// ── validateLoginForm ────────────────────────────────────────────────────────

describe("validateLoginForm", () => {
  it("returns email error when email is empty", () => {
    const result = validateLoginForm("", "password123");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/email/i);
  });

  it("returns password error when password is empty", () => {
    const result = validateLoginForm("user@example.com", "");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/password/i);
  });

  it("returns email error first when both are empty", () => {
    const result = validateLoginForm("", "");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/email/i);
  });

  it("returns valid result with trimmed email and original password", () => {
    const result = validateLoginForm("  user@example.com  ", "password123");
    expect(result).toEqual({
      valid: true,
      email: "user@example.com",
      password: "password123",
    });
  });

  it("returns invalid-email error for malformed email", () => {
    const result = validateLoginForm("not-an-email", "password123");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/valid email/i);
  });
});
