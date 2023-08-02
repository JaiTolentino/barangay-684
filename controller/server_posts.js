const express = require('express');
const app = express();
const kapitan_connection = require('./kapitan_connection');
const admin_connection = require('./admin_connection');
const parser = require('body-parser');
const mainController = require('./maincontroller');
const Admin = require('../model/Admin');

app.post("/",parser.urlencoded({extended: true}), (req, res) => {
    const {username, passwords} = req.body;
    if(username === "KapitanTang"){
        kapitan_connection.query("SELECT * FROM users WHERE username = ?",[username], (error, result) => {
            if(error) console.log(error);
            else{
                if(result.length > 0){
                    if(mainController.comparePassword(passwords, result[0]['encrypted_password'])){
                        const user = new Admin(result[0]['id'], result[0]['fname'], result[0]['lname'], result[0]['birthdate'],
                            result[0]['position'], result[0]['username'], result[0]['encrypted_password']);
                            req.session.kapitan = user;
                            res.redirect('/kapitan/home');
                    }else {
                        res.render('index', {message: "username/password is incorrect!"});
                    }
                }else {
                    res.render('index', {message: "username/password is incorrect!"});
                }
            }
        })
    } else {
        admin_connection.query("SELECT * FROM users WHERE username = ?",[username], (error, result) => {
            if(error) console.log(error);
            else{
                if(result.length > 0){
                    if(mainController.comparePassword(passwords, result[0]['encrypted_password'])){
                        const user = new Admin(result[0]['id'], result[0]['fname'], result[0]['lname'], result[0]['birthdate'],
                            result[0]['position'], result[0]['username'], result[0]['encrypted_password']);
                        req.session.admin = user;
                        res.redirect('/admin/home');
                    }else {
                        res.render('index', {message: "username/password is incorrect!"});
                    }
                }else {
                    res.render('index', {message: "username/password is incorrect!"});
                }
            }
        })
    }
})
app.post("/add-admin", parser.urlencoded({extended: true}), (req, res) => {
    const {position, username, password, confirmPassword} = req.body;
    kapitan_connection.query("SELECT username from users WHERE username = ?", [username], (err, result) => {
        if(err) console.log(err);
        else{
            if(result.length > 0) {
                res.render('kapitan/kapitan-add-admin', {message: "username taken"});
            }else {
                if (password === confirmPassword){
                    const admin_id = mainController.createAdminId(username);
                    const admin_encrypted_password = mainController.encryptPassword(password);
                    const admin_created = new Admin(admin_id, username, position, admin_encrypted_password);
                    kapitan_connection.query("INSERT INTO ")
                    res.render('kapitan/kapitan-add-admin', {message: "Admin Created"});
                }else{
                    res.render('kapitan/kapitan-add-admin', {message: "password do not match"});
                }
            }
        }
    })
})

module.exports = app;