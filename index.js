// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });

// App Setup
// morgan and bodyParser are middleware (Any requests are passed to them)
/// morgan is a logging for incoming requests
app.use(morgan('combined'));
/// bodyParser is to parse incoming requests (json)
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
