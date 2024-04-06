// Import the functions you need from the SDKs you need
// import initializeApp  from "firebase/app"
const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBAJqP6q9KyzBATSCCot-0aqbrvltvRZI8",
   authDomain: "projectcelebrate-aeae1.firebaseapp.com",
   databaseURL: "https://projectcelebrate-aeae1-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "projectcelebrate-aeae1",
   storageBucket: "projectcelebrate-aeae1.appspot.com",
   messagingSenderId: "1048924010343",
   appId: "1:1048924010343:web:fd304a250b1b20b25b61c2"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

module.exports = { auth }