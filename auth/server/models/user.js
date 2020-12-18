import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define our model as two parts, email and password.
// We tell Mongoose to enforce uniqueness so no two people can be registered with the same email address, but the
// problem is that Mongoose does not check text case so ken@gmail.com and KEN@GMAIL.com would both get added to the
// database. To prevent this, we tell Mongoose to store string in lowercase.
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// New user signing up: pre() hook executes before save() to encrypt password before saving user model.
// NOTE: Mongoose pre() function cannot resolve 'this' in arrow callback function. Must use old style function keyword.
userSchema.pre('save', function(next) {
    const user = this;  // Get access to a specific instance of user model and user.email, user.password if desired.

    // Generate a salt. It is not instantaneous, so pass a callback function to be called after salt has been created.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        // Hash (or encrypt) our password using the salt. Not instantaneous, so pass callback function.
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }

            user.password = hash;   // Overwrite plain text password with encrypted one.
            next();                 // Save the model. This is a pre-save hook so next step is save.
        });
    });
});

// Existing user signing in: Compare password provided by user with the one stored in mongoDB, factoring in encryption.
// Same comment as with pre() above -- cannot define an arrow callback function.
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

// Create model class.
const ModelClass = mongoose.model('user', userSchema);

// Export the model.
export default ModelClass;
