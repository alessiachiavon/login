const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { createHash, isValidatePassword } = require('../../utils');
const passport = require("passport")
const hashedPassword = "$2b$10$KXFuD5y5rV6zzcu7pwWi6.RfgTF2iHyTTR/OubBSqJCAKlf3ST9k2"
const bcrypt = require("bcrypt")

router.get("/login", async(req, res) => {
    
    res.render('login')
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
   
    
    if (!email || !password) return res.status(400).send({ status: "error", error: "Valores incorrectos" })
    
    if (email === 'adminCoder@coder.com') 
    {
        if( bcrypt.compareSync(password, hashedPassword)){
        req.session.user = "admin"
        req.session.admin = true
    }
    else{ return res.status(403).send({ status: "error", error: "Password incorrecto" })}


    }
    else{
    const user = await User.findOne({ email: email }/*, { email: 1, first_name: 1, last_name: 1, password }*/)
    
    
    if (!user) return res.status(400).send({ status: "error", error: "Usuario no encontrado" })
    
    
    if (!isValidatePassword(user, password)) return res.status(403).send({ status: "error", error: "Password incorrecto" })
    delete user.password
    req.session.user = user
    }
    delete password
    //res.send({ status: "success", payload: user })
    res.redirect('/profile');

});

module.exports = router;