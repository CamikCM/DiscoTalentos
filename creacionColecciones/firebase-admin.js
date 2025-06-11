
var admin = require("firebase-admin");
var serviceAccount = require("./app-d-1fa4e-firebase-adminsdk-hffjs-4b3123d073.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "URL_DE_TU_BASE_DE_DATOS_FIREBASE"
});

const db = admin.firestore();

module.exports = db;

