const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./models/Survey'); // Recipient model is referenced in Survey

require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/////////////
// Routes ///
/////////////
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

////////////////////////////////////
// Client Routing in production ////
////////////////////////////////////
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js or main.css file in client build
  app.use(express.static('client/build'));

  // Express will serve up the index.html
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
