const { bot } = require('../../services/TgService')

const ProfileCommand = (chatId, first_name, username) => {
   // const inlineKeyboard = {
   //    inline_keyboard: [[{ text: "Начать", callback_data: `start_${chatId}` }]],
   // }
   // const messageOptions = {
   //    parse_mode: "Markdown",
   //    reply_markup: inlineKeyboard,
   //    disable_web_page_preview: true,
   // }
   const text = 'name: ' + username
   bot.sendMessage(chatId, text)

}


module.exports = ProfileCommand 