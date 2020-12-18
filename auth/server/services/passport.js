import passport from 'passport';
import passportJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';
import config from '../config.js';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// Create local strategy for email/password authorization.
const localOptions = { usernameField: 'email' };    // Strategy default expects 'username' field. Tell it email instead.
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // If correct email address and password, call done with user object. Otherwise, call done with false.
    User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        // Compare passwords: Is 'password' equal to user.password? We must compare encrypted passwords.
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);  // Passwords match. Tack user onto req object for authentication.js signin() function.
        });
    });
});

// Set up options for JWT strategy for authorization.
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Weird: 'Authorization' returns Error 401.
    secretOrKey: config.secret
};

// Create JWT strategy.
// o payload is decoded JWT token.
// o done - function to call when finished.
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if userID in the payload exists in our database.
    // If found, call 'done' callback passing user object. Otherwise, call done without a user object.
    User.findById(payload.sub, (err, user) => {
    // User.findOne({_id: payload.sub }, (err, user) => {   // This works also.
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);   // User found, null refers to non-existent error.
        }
        else {
            done(null, false);  // Call to check for user did not fail, thus pass null, just did not find user.
        }
    });
});

// Tell Passport to use our strategies.
passport.use(jwtLogin);
passport.use(localLogin);
