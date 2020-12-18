import signup, { signin } from './controllers/authentication.js';
import './services/passport.js';    // Load our Passport middleware.
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });   // false = Don't create cookie session.
const requireSignin = passport.authenticate('local', { session: false });

export default app => {
    // All incoming requests must pass requireAuth step and then they can continue to route handler.
    app.get('/', requireAuth, (req, res) => {
        res.send({ hi: 'there' });
    });
    app.post('/signin', requireSignin, signin);
    app.post('/signup', signup);
};
