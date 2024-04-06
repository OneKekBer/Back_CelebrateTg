// app.js
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/AuthRoutes')
const TelegramBot = require("node-telegram-bot-api")
const TgRoutes = require('./src/routes/TgRoutes')

const app = express()
const port = 5212

const { bot } = require('./src/services/TgService')
const StartCommand = require('./src/commands/start/Start')
const ProfileCommand = require('./src/commands/profile/Profile')
const AddNewBirthday = require('./src/commands/birthday/Birthday')


app.use(cors())
app.use(express.json())


app.use('/auth', authRoutes)
app.use('/tg', TgRoutes)


bot.onText(/\/start/, async (msg) => {
   const { username, first_name } = msg?.chat
   const chatId = msg.chat.id

   bot.sendMessage(
      chatId,
      "Welcome to celebrate ",
   )

})

bot.onText(/\/new/, async (msg) => {
   const { username, first_name } = msg?.chat
   const chatId = msg.chat.id

   StartCommand(chatId, first_name, username)
})

bot.onText(/\/birthday/, async (msg) => {
   const { username, first_name } = msg.chat
   const chatId = msg.chat.id

   AddNewBirthday(chatId, first_name, username)
})


bot.onText(/\/profile/, async (msg) => {
   const { username, first_name } = msg.chat
   const chatId = msg.chat.id

   ProfileCommand(chatId, first_name, username)
})


bot.on("callback_query", async (query) => {

   const { data, message, from, chat } = query
   const { username, first_name } = message?.chat

   if (data.startsWith("start_")) {
      const chatId = data.replace("start_", "")
      StartCommand(chatId, first_name, username)

   } else if (data.startsWith("take_")) {
      const orderId = data.replace("take_", "")
      const chatId = message.chat.id
      updateOrderTakenBy(orderId, username, chatId)

   } else if (data.startsWith("birthday_")) {

   }
})



app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})


// start - Start bot
// new - Create an account
// profile - Show profile
// birthday - Add new birthday