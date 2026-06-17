// Shared Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Load config from a gitignored local file.
// See firebase-config.example.js in the project root for the required shape.
const firebaseConfig = {
  apiKey:            "",
  authDomain:        "",
  projectId:         "",
  storageBucket:     "",
  messagingSenderId: "",
  appId:             "",
  measurementId:     ""
};

let app;
let auth;

try {
  app  = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (initError) {
  console.error("Firebase initialization failed:", initError);
  document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML =
      '<p style="color:#f87171;text-align:center;margin-top:40vh;">' +
      "Unable to connect to the authentication service. Please try again later.</p>";
  });
  throw initError;
}

export { app, auth };
