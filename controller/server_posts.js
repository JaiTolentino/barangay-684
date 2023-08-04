const express = require('express');
const app = express();
const kapitan_connection = require('./kapitan_connection');
const admin_connection = require('./admin_connection');
const parser = require('body-parser');
const mainController = require('./maincontroller');
const Admin = require('../model/Admin');
const Resident = require('../model/Resident');
const Address = require('../model/Address');

app.post("/",parser.urlencoded({extended: true}), (req, res) => {
    const {username, passwords} = req.body;
    if(username === "KapitanTang"){
        kapitan_connection.query("SELECT * FROM users WHERE username = ?",[username], (error, result) => {
            if(error) console.log(error);
            else{
                if(result.length > 0){
                    if(mainController.comparePassword(passwords, result[0]['encrypted_password'])){
                        const user = new Admin(result[0]['user_id'], result[0]['username'], result[0]['position'], result[0]['encrypted_password']);
                            req.session.kapitan = user;
                            res.redirect('/kapitan/home');
                    }else {
                        res.render('index', {AlertMessage: "username/password is incorrect!"});
                    }
                }else {
                    res.render('index', {AlertMessage: "username/password is incorrect!"});
                }
            }
        })
    } else {
        admin_connection.query("SELECT * FROM users WHERE username = ?",[username], (error, result) => {
            if(error) console.log(error);
            else{
                if(result.length > 0){
                    if(mainController.comparePassword(passwords, result[0]['encrypted_password'])){
                        const user = new Admin(result[0]['user_id'], result[0]['username'], result[0]['position'], result[0]['encrypted_password']);
                        req.session.admin = user;
                        res.redirect('/admin/home');
                    }else {
                        res.render('index', {AlertMessage: "username/password is incorrect!"});
                    }
                }else {
                    res.render('index', {AlertMessage: "username/password is incorrect!"});
                }
            }
        })
    }
})
app.post("/add-admin", parser.urlencoded({extended: true}), (req, res) => {
    const {position, username, password, confirmPassword} = req.body;
    const comp = position.toUpperCase();
    if (comp === "KAPITAN"){
        res.render('kapitan/kapitan-add-admin', {AlertMessage: "Choose different Position"});
    }else {
        kapitan_connection.query("SELECT username from users WHERE username = ?", [username], (err, result) => {
            if(err) console.log(err);
            else{
                if(result.length > 0) {
                    res.render('kapitan/kapitan-add-admin', {AlertMessage: "username taken"});
                }else {
                    if (password === confirmPassword){
                        const admin_id = mainController.createAdminId(username);
                        const admin_encrypted_password = mainController.encryptPassword(password);
                        const admin_created = new Admin(admin_id, username, comp, admin_encrypted_password);
                        kapitan_connection.query("INSERT INTO users (user_id, position, username, encrypted_password) VALUES (?,?,?,?)",
                        [admin_created.getAdminId(),
                            admin_created.getPosition(),
                            admin_created.getUsername(),
                            admin_created.getEncryptedPassword()], (err, result) => {
                                if (err) console.log(err);
                                else{
                                    res.render('kapitan/kapitan-add-admin', {AlertMessage: "Admin Created"});
                                }
                            })
                    }else{
                        res.render('kapitan/kapitan-add-admin', {AlertMessage: "password do not match"});
                    }
                }
            }
        })
    }
})
app.post("/edit-resident-info", parser.urlencoded({extended: true}), (req, res) => {
    if (req.session.kapitan){
        const admin = new Admin(req.session.kapitan.admin_id, req.session.kapitan.username,
            req.session.kapitan.position, req.session.kapitan.encrypted_password);
            const {firstName,
                MI,
                lastName,
                suffix,
                addressline1,
                addressline2, 
                addresscity,
                birthday,
                gender,
                contact,
                status,
                remarks,
                medicalCondition,
                voter,
                pwd} = req.body;
                console.log(req.body);
                console.log("Created resident OOP");
                const resident = new Resident(
                    req.session.editid,
                    firstName,
                    MI,
                    lastName,
                    suffix,
                    contact,
                    birthday,
                    gender,
                    voter,
                    pwd,
                    medicalCondition,
                    status,
                    remarks,
                    new Date(),
                    admin.getUsername()
                    );
                    console.log(resident);
                    console.log(resident.getAge());
                const resident_address = new Address(
                    resident.getResidentId(),
                    addressline1,
                    addressline2,
                    addresscity,
                    );
                    console.log("started update masterlist query");
                    kapitan_connection.query("UPDATE masterlist SET fname = '"+resident.getFname()+"', mi = '"+resident.getMi()+"', lname = '"+resident.getLname()+"', suffix = '"+resident.getSuffix()+"', contact = '"+resident.getContactNum()+"', birthdate = '"+resident.getBirthdate()+"', gender = '"+resident.getGender()+"', age = ?'"+resident.getAge+"', is_voter = '"+resident.getIsVoter()+"', is_pwd = '"+resident.getIsPwd()+"', medical_condition = '"+resident.getMedicalCondition()+"', status = '"+resident.getStatus()+"', remarks = '"+resident.getRemarks()+"', created_by = '"+admin.getUsername+"' WHERE resident_id = '"+resident.getResidentId()+"'",(err, results) => {
                        if (err) console.log(err);
                    })
                    console.log("end update masterlist query");
                    console.log("started update address query");
                    kapitan_connection.query("UPDATE address SET addressline1 = ?, addressline2 = ?, city = ? WHERE address_id = ?",
                    [resident_address.getAddressLine1(),
                    resident_address.getAddressLine2(),
                    resident_address.getCity(),
                    resident.getResidentId()

                    ], (err, results) => {
                    if(err) console.log("INSERT ADDRESS ERROR: "+err);
                    else{
                        res.render('kapitan/kapitan-add-residents', {AlertMessage: "Resident Edited"})
                    }
                    })
                    console.log("end update address query");

    }else {
        res.redirect("/");
    }
})
app.post("/add-resident", parser.urlencoded({extended: true}), (req, res) => {
    if (req.session.kapitan){
        const admin = new Admin(req.session.kapitan.admin_id, req.session.kapitan.username,
            req.session.kapitan.position, req.session.kapitan.encrypted_password);
            const {firstName,
                MI,
                lastName,
                suffix,
                addressline1,
                addressline2, 
                addresscity,
                birthday,
                gender,
                contact,
                status,
                remarks,
                medicalCondition,
                voter,
                pwd} = req.body;
                const one = mainController.createAdminId(firstName);
                const two = mainController.createAdminId(lastName);
                const three = mainController.createAdminId(addressline1);
                const user_id = one+two+three;
                const resident = new Resident(
                    user_id,
                    firstName,
                    MI,
                    lastName,
                    suffix,
                    contact,
                    birthday,
                    gender,
                    voter,
                    pwd,
                    medicalCondition,
                    status,
                    remarks,
                    new Date(),
                    admin.getUsername()
                    );
                const resident_address = new Address(
                    resident.getResidentId(),
                    addressline1,
                    addressline2,
                    addresscity,
                    );
                    kapitan_connection.query("INSERT INTO masterlist (resident_id, fname, mi, lname, suffix, contact, birthdate, gender, age, is_voter, is_pwd, medical_condition, status, remarks, created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                        resident.getResidentId(),
                        resident.getFname(),
                        resident.getMi(),
                        resident.getLname(),
                        resident.getSuffix(),
                        resident.getContactNum(),
                        resident.getBirthdate(),
                        resident.getGender(),
                        resident.getAge(),
                        resident.getIsVoter(),
                        resident.getIsPwd(),
                        resident.getMedicalCondition(),
                        resident.getStatus(),
                        resident.getRemarks(),
                        admin.getUsername()
        
                    ], (err, results) => {
                        if (err) console.log(err);
                    })
                    kapitan_connection.query("INSERT INTO address (address_id, addressline1, addressline2, city) VALUES (?,?,?,?)",
                    [resident.getResidentId(),
                    resident_address.getAddressLine1(),
                    resident_address.getAddressLine2(),
                    resident_address.getCity(),
                    ], (err, results) => {
                    if(err) console.log("INSERT ADDRESS ERROR: "+err);
                    else{
                        res.render('kapitan/kapitan-add-residents', {AlertMessage: "Resident Recorded"})
                    }
                    })
    }else if (req.session.admin){
        const admin = new Admin(req.session.admin.admin_id, req.session.admin.username,
            req.session.admin.position, req.session.admin.encrypted_password);
            const {firstName,
                MI,
                lastName,
                suffix,
                addressline1,
                addressline2, 
                addresscity,
                birthday,
                gender,
                contact,
                status,
                remarks,
                medicalCondition,
                voter,
                pwd} = req.body;
                const one = mainController.createAdminId(firstName);
                const two = mainController.createAdminId(lastName);
                const three = mainController.createAdminId(addressline1);
                const user_id = one+two+three;
                console.log("Create resident");
                const resident = new Resident(
                    user_id,
                    firstName,
                    MI,
                    lastName,
                    suffix,
                    contact,
                    birthday,
                    gender,
                    voter,
                    pwd,
                    medicalCondition,
                    status,
                    remarks,
                    new Date(),
                    admin.getUsername()
                    );
                const resident_address = new Address(
                    resident.getResidentId(),
                    addressline1,
                    addressline2,
                    addresscity,
                    );
                    admin_connection.query("INSERT INTO masterlist (resident_id, fname, mi, lname, suffix, contact, birthdate, gender, age, is_voter, is_pwd, medical_condition, status, remarks, created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                        resident.getResidentId(),
                        resident.getFname(),
                        resident.getMi(),
                        resident.getLname(),
                        resident.getSuffix(),
                        resident.getContactNum(),
                        resident.getBirthdate(),
                        resident.getGender(),
                        resident.getAge(),
                        resident.getIsVoter(),
                        resident.getIsPwd(),
                        resident.getMedicalCondition(),
                        resident.getStatus(),
                        resident.getRemarks(),
                        admin.getUsername()
        
                    ], (err, results) => {
                        if (err) console.log(err);
                    })
                    admin_connection.query("INSERT INTO address (address_id, addressline1, addressline2, city) VALUES (?,?,?,?)",
                    [resident.getResidentId(),
                    resident_address.getAddressLine1(),
                    resident_address.getAddressLine2(),
                    resident_address.getCity(),
                    ], (err, results) => {
                    if(err) console.log("INSERT ADDRESS ERROR: "+err);
                    else{
                        res.render('admin/admin-add-residents', {AlertMessage: "Resident Recorded"})
                    }
                    })
    }else{
        res.redirect('/');
    }   
})
app.post("/edit-resident", parser.urlencoded({extended: true}), (req,res) => {
    const {editresident} = req.body;
    req.session.editid = editresident;
    res.redirect("/kapitan/masterlist/edit");
})

module.exports = app;