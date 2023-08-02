const express = require('express');
const routes = express.Router();
const Admin = require('../model/Admin')
const kapitan_connection = require('./kapitan_connection');
const admin_connection = require('./admin_connection');
// Landing
routes.get("/", (req, res) => {
    res.render('index');
})
routes.get("/logout", (req, res) => {
    var user = new Admin();
    req.session.kapitan ? user = req.session.kapitan : user = req.session.admin;
    console.log(user);
    req.session.destroy();
    req.session = null;
    res.redirect('/');
})

// Kapitan

routes.get("/kapitan/home", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-home') : res.redirect('/');
})
routes.get("/kapitan/admin", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-admin-option') : res.redirect('/');
})
routes.get("/kapitan/admin/add-admin", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-add-admin') : res.redirect('/');
})
routes.get("/kapitan/admin/list", (req, res) => {
    req.session.resetMaxAge;
    if (req.session.kapitan) {
        kapitan_connection.query("SELECT * FROM users", (err, result) =>{
            console.log(result);
            res.render('kapitan/kapitan-admin-list', {data: result})
        })
    }else {
        res.redirect('/');
    }
})
routes.get("/kapitan/masterlist", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-residents-option') : res.redirect('/');
})
routes.get("/kapitan/masterlist/list", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-residents-lists', {data: result}) : res.redirect('/');
})
routes.get("/kapitan/masterlist/add", (req,res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-add-residents') : res.redirect('/');
    kapitan_connection.query("SELECT * FROM masterlist", (req, res) => {
        
    })
})

// Admin

routes.get("/admin/home", (req, res) => {
    req.session.admin ? res.render('admin/admin-home') : res.redirect('/');
})
routes.get("/admin/master/list", (req, res) => {
    req.session.admin ? res.render('admin/admin-master-list') : res.redirect('/');
})
module.exports = routes;