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
    const rawadminId = uppercased.replace(/[aeiou]/gi, '');
    const adminId = rawadminId.replace(/\s/g, '')
    return adminId;
}
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);  
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = new Date(ageInMilliseconds).getUTCFullYear() - 1970;
    return ageInYears;
}
function convertToInternationalFormat(localNumber) {
    const countryCode = "+63";
    const trimmedNumber = localNumber.trim();
    if (trimmedNumber.startsWith("09") || trimmedNumber.length === 11) {
      return countryCode + trimmedNumber.slice(1);
    } else {
      return localNumber;
    }
  }
function convertToLocalFormat(number){
  const trimmedNumber = number.trim();
  return trimmedNumber.replace("+63", "0");
}
function checkboxValue(checkbox){
  if (checkbox === "yes"){
    return "yes";
  }else{
    return "no";
  }
}
function checkboxeditvalue(checkbox){
  if(checkbox === "yes"){
    return true;
  }else{
    return false;
  }
}
function birthdateToWordedFormat(birthdate) {
  const [year, month, day] = birthdate.split('-');
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthWorded = months[Number(month) - 1];
  return monthWorded + " " + parseInt(day, 10)+", "+ year;
}
module.exports = {convertToLocalFormat,checkboxeditvalue, checkboxValue, encryptPassword, comparePassword, createAdminId, calculateAge, convertToInternationalFormat, birthdateToWordedFormat};