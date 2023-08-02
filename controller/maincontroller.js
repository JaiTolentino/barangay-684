const bcrypt = require('bcrypt');
const saltRounds = 15;
function encryptPassword(password){
    const salt = bcrypt.genSaltSync(saltRounds);
    const encrypted_password = bcrypt.hashSync(password, salt);
    return encrypted_password;
}
function comparePassword(plainpassword, encrypted_password) {
    const result = bcrypt.compareSync(plainpassword, encrypted_password);
    return result;

}
function createAdminId(admin_username){
    let uppercased = admin_username.toUpperCase();
    const adminId = uppercased.replace(/[aeiou]/gi, '');
    return adminId;
}
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);  
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = new Date(ageInMilliseconds).getUTCFullYear() - 1970;
    return ageInYears+ " years old";
}
function convertToInternationalFormat(localNumber) {
    const countryCode = "+63";
    const trimmedNumber = localNumber.trim();
    if (trimmedNumber.startsWith("09") && trimmedNumber.length === 11) {
      return countryCode + trimmedNumber.slice(2);
    } else {
      return localNumber;
    }
  }
  function convertDateToWorded(date) {
    date = '2003-07-13';
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const wordedOutput = months[month] + " " + day + ", " + year;
    console.log(wordedOutput);
    return wordedOutput;
}
module.exports = {encryptPassword, comparePassword, createAdminId, calculateAge, convertToInternationalFormat, convertDateToWorded};