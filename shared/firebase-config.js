// Shared Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

//import firebase config
const firebaseConfig = {
  // Add your Firebase project config here via Object.assign() or direct properties
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
