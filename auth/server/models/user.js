import mongoose from 'mongoose';
import { Schema } from 'mongoose.Schema';

// Define our model as two parts, email and password.
// We tell Mongoose to enforce uniqueness so no two people can be registered with the same email address, but the
// problem is that Mongoose does not check text case so ken@gmail.com and KEN@GMAIL.com would both get added to the
// database. To prevent this, we tell Mongoose to store string in lowercase.
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// Create model class.
const ModelClass = mongoose.model('user', userSchema);

// Export the model.
export default ModelClass;
