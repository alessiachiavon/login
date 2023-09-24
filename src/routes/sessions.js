// sessions.js
const { createHash } = require('../../utils');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

/*router.get("/register", async(req, res) => {
    
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
        password: hashedPassword
    });

    console.log('Usuario registrado con éxito.' + user);
    res.redirect('/login');
});
*/

router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect: '/login'}),async(req,res)=>{
    req.session.user = req.user;
    res.redirect('/profile')
})


module.exports = router;