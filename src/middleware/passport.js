// passport.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://w03-project-project-2-aqb6.onrender.com//auth/github/callback'
},
    (accessToken, refreshToken, profile, done) => {
        // profile contains GitHub user info
        // Save/find user in DB here if needed
        return done(null, profile);
    }
));

// Serialize/deserialize user for session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;