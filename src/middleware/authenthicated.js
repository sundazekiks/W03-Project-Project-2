const passport = require('./passport');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/'); // Redirect to home page if not authenticated
}

module.exports = isAuthenticated;