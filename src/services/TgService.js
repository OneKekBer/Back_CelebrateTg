const TelegramBot = require('node-telegram-bot-api')


const token = "6348396659:AAHpSalUBYBZEPx_hSJPxDjatf-17Pap7Qs"
const bot = new TelegramBot(token, { polling: true })


module.exports = { bot }