const { bot } = require('../../services/TgService')
const admin = require('./../../services/firebaseDBService')
const { DateValidation } = require('./Helpers')

const db = admin.database()
const ref = db.ref("users")


const AddNewBirthday = async (chatId, first_name, username) => {
   try {
      const existingUserSnapshot = await ref.orderByChild("chatId").equalTo(chatId).once("value")
      const existingUser = existingUserSnapshot.val()

      if (!existingUser) {
         bot.sendMessage(chatId, "You should be logged in")
         return
      }

      bot.sendMessage(chatId, "Enter date ( dd-mm )")


      bot.on("message", (msg) => {
         console.log(msg.text)
         date = msg.text
         isCorrect = DateValidation(date)
         console.log(isCorrect)

         // Check if the date is correct
         if (!isCorrect) {
            bot.sendMessage(chatId, "Incorrect date")
         } else {
            // Do whatever you need with the correct date
            console.log("Correct date:", date)
         }
      })


   } catch (error) {
      console.error("Error adding user:", error)
      bot.sendMessage(chatId, "An error occurred while adding the user.")
   }
}

module.exports = AddNewBirthday
