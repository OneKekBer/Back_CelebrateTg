var admin = require("firebase-admin")

var serviceAccount = require("../utils/serviceAccountKey.json")

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://projectcelebrate-aeae1-default-rtdb.europe-west1.firebasedatabase.app"
})

module.exports = admin