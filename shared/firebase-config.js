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

let app  = null;
let auth = null;

try {
  app  = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (err) {
  console.warn("Firebase init failed — add your config to shared/firebase-config.js:", err.message);
}

export { app, auth };
