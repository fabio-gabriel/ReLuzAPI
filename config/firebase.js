// firebaseAdmin.js (backend-only)
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://placassolares-d9d13-default-rtdb.firebaseio.com",
});

const adminAuth = admin.auth();
const adminDB = admin.database();

module.exports = { admin, adminAuth, adminDB };
