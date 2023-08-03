const express = require('express');
const app = express();
const kapitan_connection = require('./kapitan_connection');
const admin_connection = require('./admin_connection');
const parser = require('body-parser');
const mainController = require('./maincontroller');
const Admin = require('../model/Admin');
const Resident = require('../model/HeadResident');

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
                        const admin_created = new Admin(admin_id, username, position, admin_encrypted_password);
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
app.post("/add-resident", parser.urlencoded({extended: true}), (req, res) => {
    if (req.session.kapitan){
        const admin = new Admin(req.session.kapitan.admin_id, req.session.kapitan.username,
            req.session.kapitan.position, req.session.kapitan.encrypted_password);
        const {firstName,
            lastName,
            addressline1,
            addressline2, 
            addressbarangay,
            addresscity,
            addresscountry,
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
            const user_id = one+two;
            const resident = new Resident(user_id,
                                            firstName,
                                            lastName,
                                            contact,
                                            birthday,
                                            gender,
                                            addressline1,
                                            addressline2,
                                            addressbarangay,
                                            addresscountry,
                                            voter,
                                            pwd,
                                            medicalCondition,
                                            status,
                                            remarks,
                                            new Date(),
                                            admin.getUsername()
                                            );
            kapitan_connection.query("INSERT INTO masterlist (resident_id, fname, lname, contact, birthdate, gender, age, address, is_voter, is_pwd, medical_condition, status, remarks, created_by) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                resident.getResidentId(),
                resident.getFname(),
                resident.getLname(),
                resident.getContactNum(),
                resident.getBirthdate(),
                resident.getGender(),
                resident.getAge(),
                resident.getAddress().getFullAddress(),
                resident.getIsVoter(),
                resident.getIsPwd(),
                resident.getMedicalCondition().getDisease(),
                resident.getStatus(),
                resident.getRemarks(),
                admin.getUsername()
            ], (err, results) => {
                if (err) console.log(err);
                else {
                    res.render('kapitan/kapitan-add-residents', {AlertMessage: "Resident Recorded"})
                }
            })
    }else if (req.session.admin){
        const admin = new Admin(req.session.admin.admin_id, req.session.admin.username,
            req.session.admin.position, req.session.admin.encrypted_password);
        const {firstName,
            lastName,
            addressline1,
            addressline2, 
            addressbarangay,
            addresscity,
            addresscountry,
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
            const user_id = one+two;
            const resident = new Resident(user_id,
                                            firstName,
                                            lastName,
                                            contact,
                                            birthday,
                                            gender,
                                            addressline1,
                                            addressline2,
                                            addressbarangay,
                                            addresscountry,
                                            voter,
                                            pwd,
                                            medicalCondition,
                                            status,
                                            remarks,
                                            new Date(),
                                            admin.getUsername());
            admin_connection.query("INSERT INTO masterlist (resident_id, fname, lname, contact, birthdate, gender, age, address, is_voter, is_pwd, medical_condition, status, remarks, created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                resident.getResidentId(),
                resident.getFname(),
                resident.getLname(),
                resident.getContactNum(),
                resident.getBirthdate(),
                resident.getGender(),
                resident.getAge(),
                resident.getAddress().getFullAddress(),
                resident.getIsVoter(),
                resident.getIsPwd(),
                resident.getMedicalCondition().getDisease(),
                resident.getStatus(),
                resident.getRemarks(),
                admin.getUsername()

            ], (err, results) => {
                if (err) console.log(err);
                else {
                    res.render('admin/admin-add-residents', {AlertMessage: "Resident Recorded"})
                }
            })
    }else{
        res.redirect('/');
    }   
})

module.exports = app;