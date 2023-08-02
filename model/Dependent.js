class Dependent {
    constructor(resident_id, fname, lname, contact_num, birthdate,is_voter, is_pwd, medical_condition, age, status, remarks, date_created, created_by){
        this.resident_id = resident_id;
        this.fname = fname;
        this.lname = lname;
        this.contact_num = contact_num;
        this.birthdate = birthdate;
        this.is_voter = is_voter;
        this.is_pwd = is_pwd;
        this.medical_condition = medical_condition;
        this.age = age;
        this.status = status;
        this.remarks = remarks;
        this.date_created = date_created;
        this.created_by = created_by;
    }
    getResidentId() {
        return this.resident_id;
    }
    setResidentId(resident_id) {
        this.resident_id = resident_id;
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
    getContactNum(){
        return this.contact_num;
    }
    setContactNum(contact_num){
        this.contact_num = contact_num;
    }
    getBirthdate(){
        return this.birthdate;
    }
    setBirthdate(birthdate){
        this.birthdate = birthdate;
    }
    getIsVoter(){
        return this.is_voter;
    }
    setIsVoter(is_voter){
        this.is_voter = is_voter;
    }
    getIsPwd(){
        return this.is_pwd;
    }
    setIsPwd(is_pwd){
        this.is_pwd = is_pwd;
    }
    getMedicalCondition(){
        return this.medical_condition;
    }
    setMedicalCondition(medical_condition){
        this.medical_condition = medical_condition;
    }
    getAge(){
        return this.age;
    }
    setAge(age){
        this.age = age;
    }
    getStatus(){
        return this.status;
    }
    setStatus(status){
        this.status = status;
    }
    getRemarks(){
        return this.remarks;
    }
    setRemarks(remarks){
        this.remarks = remarks;
    }
    getDateCreated(){
        return this.date_created;
    }
    setDateCreated(date_created){
        this.date_created = date_created;
    }
    getCreatedBy(){
        return this.created_by;
    }
    setCreatedBy(created_by){
        this.created_by = created_by;
    }
 }

 function getFullName(){
    return this.fname + " " + this.lname; 
 }
 module.exports = User;
