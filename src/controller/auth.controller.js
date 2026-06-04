const { validationResult } = require('express-validator');


async function Login(req, res) {
    const { email, password } = req.body;
    const result = validationResult(req);

    console.log(result.array());
    res.status(200).json({ message: 'Login successful' });
}

async function logout(req, res) {
    req.logout(() => res.redirect('/'));
};

module.exports = {
    Login,
    logout
}