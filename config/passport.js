/* Importing Passport, strategies, and config  */
const passport = require('passport'),
    User = require('../models/user'),
    config = require('./main'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');
// JSON Web Token setup


/* Lets usethe email field rather than the username field */
const localOptions = { usernameField: 'email' };


/*  Local Login Strategy, 
 which will be used to authenticate users with an email address and password.
 A successful local login will yield the user a JWT to use to authenticate 
 future requests automatically.  */

/* Setting up local login strategy  */
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

            return done(null, user);
        });
    });
});


/* JWT authentication options */
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};


/* Setting up JWT login strategy  */
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload._id, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});


passport.use(jwtLogin);
passport.use(localLogin);