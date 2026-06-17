/**
 * @jest-environment jsdom
 */
const { showError, clearError, setLoading } = require("../dom-helpers");

let anchor;

beforeEach(() => {
  document.body.innerHTML = `
    <form id="loginForm">
      <input type="submit" value="Login" class="btn solid" />
    </form>
  `;
  anchor = document.querySelector(".btn.solid");
});

afterEach(() => {
  document.body.innerHTML = "";
});

// ── showError ────────────────────────────────────────────────────────────────

describe("showError", () => {
  it("creates an error paragraph after the anchor element", () => {
    showError("Test error", anchor);
    const err = document.getElementById("loginError");
    expect(err).not.toBeNull();
    expect(err.textContent).toBe("Test error");
    expect(err.tagName).toBe("P");
  });

  it("applies expected inline styles", () => {
    showError("Styled error", anchor);
    const err = document.getElementById("loginError");
    expect(err.style.color).toBe("rgb(248, 113, 113)");
    expect(err.style.fontSize).toBe("13px");
    expect(err.style.textAlign).toBe("center");
    expect(err.style.marginTop).toBe("8px");
  });

  it("replaces previous error when called again", () => {
    showError("First error", anchor);
    showError("Second error", anchor);
    const errors = document.querySelectorAll("#loginError");
    expect(errors).toHaveLength(1);
    expect(errors[0].textContent).toBe("Second error");
  });

  it("returns the created element", () => {
    const el = showError("Return test", anchor);
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.id).toBe("loginError");
  });
});

// ── clearError ───────────────────────────────────────────────────────────────

describe("clearError", () => {
  it("removes an existing error element", () => {
    showError("To be cleared", anchor);
    expect(document.getElementById("loginError")).not.toBeNull();
    clearError();
    expect(document.getElementById("loginError")).toBeNull();
  });

  it("does nothing when no error exists", () => {
    expect(() => clearError()).not.toThrow();
    expect(document.getElementById("loginError")).toBeNull();
  });
});

// ── setLoading ───────────────────────────────────────────────────────────────

describe("setLoading", () => {
  it("disables button and sets loading text when loading=true", () => {
    setLoading(anchor, true);
    expect(anchor.disabled).toBe(true);
    expect(anchor.value).toBe("Signing in...");
  });

  it("enables button and restores text when loading=false", () => {
    setLoading(anchor, true);
    setLoading(anchor, false);
    expect(anchor.disabled).toBe(false);
    expect(anchor.value).toBe("Login");
  });

  it("can be toggled multiple times", () => {
    setLoading(anchor, true);
    setLoading(anchor, false);
    setLoading(anchor, true);
    expect(anchor.disabled).toBe(true);
    expect(anchor.value).toBe("Signing in...");
  });
});
