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

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
