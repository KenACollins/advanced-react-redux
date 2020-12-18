import jwt from 'jwt-simple';
import User from '../models/user.js';
import config from '../config.js';

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    // Refer to https://jwt.io/ for information about the sub and iat properties, among others.
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

// When user wants to sign up for our service, run the function below, passing three arguments.
// o req - HTTP request
// o res - HTTP response
// o next - error handling
const signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Ensure we received an email address and password.
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email address and password.' });
    }

    // See if a user with a given email address exists.
    User.findOne({ email: email }, (err, existingUser) => {
        // If there is a DB connection problem, send back an error.
        if (err) { return next(err); }

        // If a user with given email address exists, return an error.
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with given email address does NOT exist, create and save user record.
        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            // If there is an error saving user, send back error.
            if (err) { return next(err); }

            // Respond to request indicating the user was created.
            res.json({ token: tokenForUser(user) });
        });
    });
};

// When existing user wants to sign in again, run the function below, passing three arguments.
export const signin = (req, res, next) => {
    // User has already had his/her email address and password authenticated so we just need to pass back a token.
    res.send({ token: tokenForUser(req.user) });
};

export default signup;



