const admin = require('./../services/firebaseDBService')
const db = admin.database()
const ref = db.ref("users")
const { bot } = require('./../services/TgService')
const CryptoJS = require("crypto-js")

const key = 23145

const addNickname = async (req, res) => {
   try {
      const { user, uid } = req.body

      // Check if the user with the given UID exists
      const existingUser = await ref
         .orderByChild("uid")
         .equalTo(uid)
         .once("value")

      if (existingUser.exists()) {
         const userKey = Object.keys(existingUser.val())[0]
         await ref.child(userKey).update({ tgUsername: user })

         const chatId = existingUser.val()[userKey].telegramChatId

         const message = `Hello ${username}! Your username has been updated.`
         bot.sendMessage(chatId, message)

         res.status(200).json({ message: 'Username added successfully' })
      } else {
         res.status(404).json({ error: 'User does not exist' })
      }
   } catch (error) {
      console.error('Error adding username:', error.message)
      res.status(500).json({ error: 'Something went wrong' })
   }
}


const addNewUser = async (chatId, name, username) => {
   const ref = db.ref("users")

   const inlineKeyboard = {
      inline_keyboard: [[{ text: "Profile", callback_data: `profile_${chatId}` }]],
   }
   const messageOptions = {
      parse_mode: "Markdown",
      reply_markup: inlineKeyboard,
      disable_web_page_preview: true,
   }
   const birthdays = [
      {
         name: "Vital",
         link: "@eliaszowi",
         desc: "birth of my best friend",
         isEveryYear: true
      }
   ]
   const existingUser = await ref
      .orderByChild("name")
      .equalTo(name)
      .once("value")

   if (!existingUser.exists()) {
      // Check if there are any users with the same name
      await ref.push({
         name: name,
         chatId: chatId,
         username: username,
         birthdays: birthdays
         // id: id,
      })
      bot.sendMessage(chatId, "Пользователь успешно создан!")
   } else {
      bot.sendMessage(chatId, "Пользователь уже существует")
   }
}

const login = async (req, res) => {
   const verifyCode = Math.floor(100000 + Math.random() * 900000)

   console.log(req.body)
   const { username } = req.body

   const existingUser = await ref
      .orderByChild("username")
      .equalTo(username)
      .once("value")

   if (existingUser.exists()) {
      const userData = existingUser.val()

      const userId = Object.keys(userData)[0]

      const { username, chatId, name } = userData[userId]



      var cryptedCode = CryptoJS.AES.encrypt(verifyCode.toString(), 'fdsfsjn12nj312').toString()

      bot.sendMessage(chatId, `код авторизации: ${verifyCode}, если вы не пытаетесь войти в акаунт то никому не говорите код`)
      res.status(200).json({ cryptedCode, userData: userData[userId], status: 'ok' })
   } else {
      res.status(404).json({ error: 'User not found', status: 'no' })
   }
}



module.exports = { addNickname, addNewUser, login }
