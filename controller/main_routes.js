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
    req.session.kapitan ? res.render('kapitan/kapitan-admin') : res.redirect('/');
})
routes.get("/kapitan/admin/add-admin", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-add-admin') : res.redirect('/');
})
routes.get("/kapitan/admin/list", (req, res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-admin-list') : res.redirect('/');
    kapitan_connection.query("SELECT * FROM users WHERE position = 'admin'", (req, res) =>{
        
    })
})
routes.get("/kapitan/master/list", (req,res) => {
    req.session.resetMaxAge;
    req.session.kapitan ? res.render('kapitan/kapitan-master-list') : res.redirect('/');
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