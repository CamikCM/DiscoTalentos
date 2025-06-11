import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
apiKey: "PON_AQUÍ_TU_API_KEY",
authDomain: "PON_AQUÍ_TU_AUTH_DOMAIN",
databaseURL: "PON_AQUÍ_TU_DATABASE_URL",
projectId: "PON_AQUÍ_TU_PROJECT_ID",
storageBucket: "PON_AQUÍ_TU_STORAGE_BUCKET",
messagingSenderId: "PON_AQUÍ_TU_MESSAGING_SENDER_ID",
appId: "PON_AQUÍ_TU_APP_ID",
measurementId: "PON_AQUÍ_TU_MEASUREMENT_ID"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar funcionalidades
export { addDoc, auth, collection, createUserWithEmailAndPassword, db, doc, getDoc, getDocs, increment, sendEmailVerification, serverTimestamp, setDoc, signInWithEmailAndPassword, updateDoc };

