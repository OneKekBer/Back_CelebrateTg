


const DateValidation = (dateString) => {
   // Using a regular expression to check if the input matches the expected date format (YYYY-MM-DD)
   var dateRegex = /\d{2}-\d{2}$/
   if (!dateRegex.test(dateString)) {
      return false // If the format doesn't match, return false
   }

   var dateParts = dateString.split('-')
   var month = parseInt(dateParts[1])
   var day = parseInt(dateParts[2])

   // Check if month is between 1 and 12, and day is between 1 and 31
   return (month >= 1 && month <= 12) && (day >= 1 && day <= 31)
}

module.exports = { DateValidation }