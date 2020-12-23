// Main starting point of our server-side application.
// Node 12 added experimental support for import statements with 'node --experimental-modules index.js' start command.
// Node 13+ eliminates --experimental-modules flag. I upgraded to 14.15.1. Now, I can use import instead of require().
// Import requires one configuration step: add "type": "module" to package.json file for server-side Node app.
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import router from './router2.js';  // Because we are not using webpack, we have to specify .js extension on our files.

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(res => console.log('*****Connected to mongoDB!*****'))
    .catch(err => console.log('!!!!!Error connecting to mongoDB!!!!!', err));

// App Setup
const app = express();          // Create app as an instance of Express.
// app.use(morgan('combined'));    // Activate logging. Comment out in production.
app.use(cors());                // Allow requests from any client. We could be more specific and limit it to localhost:3000.
app.use(bodyParser.json({ type: '*/*'}));  // Middleware needed to attach HTTP request payload to req.body property.
router(app);

// Server Setup
const port = process.env.PORT || 3090;  // If environment variable PORT exists, use it. Otherwise, use port 3090.
const server = http.createServer(app);  // Create HTTP server that knows how to forward requests.
server.listen(port);
console.log(`Server listening on port ${port}.`)
