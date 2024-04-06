// src/routes/authRoutes.js
const express = require('express')
const { signUp, signIn } = require('../controllers/AuthController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)


// router.post('/log', signIn)




module.exports = router
