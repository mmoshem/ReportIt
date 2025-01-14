const admin = require("firebase-admin");
require("dotenv").config({path: '../.env'});

let db;
if (!process.env.FIREBASE_SERVICE_ACCOUNT)
{
    console.error("FIREBASE_SERVICE_ACCOUNT is not set!");
} 
else
{
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    db = admin.firestore();
}

module.exports = db;