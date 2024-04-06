const { addNewUser } = require('../../controllers/TgController')

const StartCommand = (chatId, first_name, username) => {
   addNewUser(chatId, first_name, username)

}


module.exports = StartCommand 