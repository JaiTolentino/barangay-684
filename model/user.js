 class User {
    constructor(id, fname, lname, birthdate, position, username, encrypted_password){
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.birthdate = birthdate;
        this.position = position;
        this.username = username;
        this.encrypted_password = encrypted_password;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getFname() {
        return this.fname;
    }
    setFname(fname) {
        this.fname = fname;
    }
    getLname(){
        return this.lname;
    }
    setLname(lname) {
        this.lname = lname;
    }
    getBirthdate(){
        return this.birthdate;
    }
    setBirthdate(birthdate){
        this.birthdate = birthdate;
    }
    getPosition(){
        return this.position;
    }
    setPosition(position){
        this.position = position;
    }
    getUsername(){
        return this.username;
    }
    setUsername(username){
        this.username = username;
    }
    getPassword(){
        return this.encrypted_password;
    }
    setPassword(encrypted_password){
        this.encrypted_password = encrypted_password;
    }
 }
 module.exports = User;