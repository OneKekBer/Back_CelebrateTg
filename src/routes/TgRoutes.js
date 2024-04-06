// src/routes/authRoutes.js
const express = require('express')
const { addNickname, login } = require('../controllers/TgController')

const router = express.Router()

router.post('/add-nickname', addNickname)
router.post('/login', login)
// router.post('/signin', login)

module.exports = router
