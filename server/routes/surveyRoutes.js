const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // check if isLoggedin with middleware
const requireCredits = require('../middlewares/requireCredits'); // check if enough credits with middleware

const Survey = mongoose.model('surveys');

// define arrow function, and export
//// import into index.js
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body; // recipients is subdocument collection
    // Create new Survey instance
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // Attempt to create and send email
    // Email sent successfully?
    // Save survey
    // Survey handler complete
  });
};
//////////////////////////
// EMAIL CREATION STEPS //
//////////////////////////

// Survey instance is data layer
// Email Template is view layer - HTML and styles for   the email
// Merge in Mailer object - email generation helper
// http request to Send 'Mailer' to Email Provider