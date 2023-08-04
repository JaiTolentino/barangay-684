const Address = require('./Address');
const mainController = require('../controller/maincontroller');
class Resident {
    constructor(resident_id, fname, mi, lname, suffix, contact_num, birthdate, gender , is_voter, is_pwd, medical_condition, status, remarks, date_created, created_by){
        this.resident_id = resident_id;
        this.fname = fname;
        this.mi = mi;
        this.lname = lname;
        this.suffix = suffix
        this.contact_num = mainController.convertToInternationalFormat(contact_num);
        this.birthdate = birthdate;
        this.gender = gender;
        this.age = mainController.calculateAge(birthdate);
        this.is_voter = mainController.checkboxValue(is_voter);
        this.is_pwd = mainController.checkboxValue(is_pwd)
        this.medical_condition = medical_condition;
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
    getMi(){
        return this.mi;
    }
    setMi(mi){
        this.mi = mi;
    }
    getLname(){
        return this.lname;
    }
    setLname(lname) {
        this.lname = lname;
    }
    getSuffix(){
        return this.suffix;
    }
    setSuffix(suffix){
        this.suffix = suffix;
    }
    getContactNum(){
        return this.contact_num;
    }
    setContactNum(contact_num){
        this.contact_num = mainController.convertToInternationalFormat(contact_num);
    }
    getBirthdate(){
        return this.birthdate;
    }
    setBirthdate(birthdate){
        this.birthdate = birthdate;
    }
    getGender(){
        return this.gender;
    }
    setGender(gender){
        this.gender = gender;
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
    getAge(){
        return this.age;
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
    return this.fname + " " + this.mi + " " + this.lname + " " + this.suffix; 
 }
 module.exports = Resident;
