const Address = require('./Address');
const medicalCondition = require('./Disease');
const mainController = require('../controller/maincontroller');
class HeadResident {
    constructor(resident_id, fname, lname, contact_num, birthdate, gender, address_line_1, address_line_2, barangay, country ,is_voter, is_pwd, medical_condition, status, remarks, date_created, created_by, disease_id){
        this.resident_id = resident_id;
        this.fname = fname;
        this.lname = lname;
        this.contact_num = mainController.convertToInternationalFormat(contact_num);
        this.birthdate = mainController.birthdateToWordedFormat(birthdate);
        this.gender = gender;
        this.age = mainController.calculateAge(birthdate);
        this.address = new Address(address_line_1, address_line_2, barangay, country);
        this.is_voter = mainController.checkboxValue(is_voter);
        this.is_pwd = mainController.checkboxValue(is_pwd)
        this.medical_condition = new medicalCondition(disease_id, this.resident_id, medical_condition);
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
    getAddress(){
        return this.address;
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
    return this.fname + " " + this.lname; 
 }
 module.exports = HeadResident;
