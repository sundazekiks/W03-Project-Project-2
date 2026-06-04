const { Router } = require('express');
const { body } = require('express-validator');
const { Login, logout } = require('../controller/auth.controller');
const passport = require('../middleware/passport');

const router = Router();

// OAuth routes for GitHub
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard'); // success
    }
);

router.post('/logout', logout);

module.exports = router;