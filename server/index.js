const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
