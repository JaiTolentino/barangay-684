class Admin {
    constructor(admin_id, username, position, encrypted_password){
        this.admin_id = admin_id;
        this.username = username;
        this.position = position;
        this.encrypted_password = encrypted_password;
    }
    getAdminId(){
        return this.admin_id;
    }
    setAdminId(admin_id){
        this.admin_id = admin_id;
    }
    getUsername(){
        return this.username;
    }
    setUsername(username){
        this.username = username;
    }
    getPosition(){
        return this.position;
    }
    setPosition(position){
        this.position = position;
    }
    getEncryptedPassword(){
        return this.encrypted_password;
    }
    setEncryptedPassword(encrypted_password){
        this.encrypted_password = encrypted_password;
    }
}
module.exports = Admin;