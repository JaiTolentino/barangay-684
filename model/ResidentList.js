const mainController = require('../controller/maincontroller')
class ResidentList{
    constructor(resident_id, fname, mi, lname, suffix, contact, birthdate, gender, age, is_voter, is_pwd, medical_condition, status, remarks, address_id, addressline1, addressline2, city){
        this.resident_id = resident_id;
        this.fname = fname;
        this.mi = mi;
        this.lname = lname;
        this.suffix = suffix;
        this.contact = contact;
        this.birthdate = birthdate;
        this.gender = gender;
        this.age = age;
        this.is_voter = is_voter;
        this.is_pwd = is_pwd;
        this.medical_condition = medical_condition;
        this.status = status;
        this.remarks = remarks;
        this.address_id = address_id;
        this.addressline1 = addressline1;
        this.addressline2 = addressline2;
        this.city = city;
    }
    getResidentId(){
        return this.resident_id;
    }
    getFname(){
        return this.fname;
    }
    getMi(){
        return this.mi;
    }
    getLname(){
        return this.lname;
    }
    getContact(){
        return this.contact;
    }
    getBirthdate(){
        return this.birthdate;
    }
    getGender(){
        return this.gender;
    }
    getAge(){
        return this.age;
    }
    getVoter(){
        return this.is_voter;
    }
    getPwd(){
        return this.is_pwd;
    }
    getMedicalCondition(){
        return this.medical_condition;
    }
    getStatus(){
        return this.status;
    }
    getRemarks(){
        return this.remarks;
    }
    getAddressId(){
        return this.address_id;
    }
    getAddressLine1(){
        return this.addressline1;
    }
    getAddressLine2(){
        return this.addressline2;
    }
    getCity(){
        return this.city;
    }
}

module.exports = ResidentList;