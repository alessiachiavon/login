// sessions.js
const { createHash } = require('../../utils');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/register", async(req, res) => {
    
    res.render('register')
})

router.post('/register', async (req, res) => {
    let { first_name, last_name, email, age, password } = req.body;


    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('Faltan datos.');
    }

    const hashedPassword = createHash(password);

    let user = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        cart: cartId,
    });

    /* res.send({ status: "success", payload: user });*/
    console.log('Usuario registrado con éxito.' + user);
    res.redirect('/login');
});

router.get("/current", async(req, res) => {
    
    res.send({ result: "success", payload: req.session.user })
})

module.exports = router;