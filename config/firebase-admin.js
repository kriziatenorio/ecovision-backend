require('dotenv').config()
const admin = require("firebase-admin");
const serviceAccount = require("./service-account");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

module.exports = app