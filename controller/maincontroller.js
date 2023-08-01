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
module.exports = {encryptPassword, comparePassword};