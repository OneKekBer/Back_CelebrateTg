const admin = require('./../services/firebaseDBService')
const { createUserWithEmailAndPassword } = require("firebase/auth")

// src/controllers/authController.js
const { app, auth } = require('../services/firebaseAuthService')
const db = admin.database()
const ref = db.ref("users")


const signUp = async (req, res) => {
   try {
      const { email, password } = req.body
      // console.log(email, password)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await ref.push({
         email: user.email,
         uid: user.uid,
         tgNickname: '',
      })
      res.status(201).json({ uid: user.uid, email: user.email })


   } catch (error) {
      console.error('Error during sign-up:', error.message)
      res.status(500).json({ error: 'Sign-up failed' })
   }
}

const signIn = async (req, res) => {
   try {
      const { email, password } = req.body
      const userCredential = await auth.signInWithEmailAndPassword(email, password)
      const user = userCredential.user
      res.status(200).json({ uid: user.uid, email: user.email })
   } catch (error) {
      console.error('Error during sign-in:', error.message)
      res.status(401).json({ error: 'Invalid credentials' })
   }
}

module.exports = { signUp, signIn }
