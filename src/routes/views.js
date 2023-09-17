const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    if(req.session.admin) result =  {role: "admin"}
    else{
    const { first_name, last_name, email, age } = req.session.user;
    result = {first_name, last_name, email, age, role: 'user'}
}
    res.render('profile', result );
});

// Logout
router.post('/profile', function(req, res) {
    req.logout(function() {
        req.session.destroy(function() {
            res.redirect('/login');
        });
    });
});


module.exports = router;