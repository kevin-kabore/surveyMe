const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // check if isLoggedin with middleware
const requireCredits = require('../middlewares/requireCredits'); // check if enough credits with middleware
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// define arrow function, and export
//// import into index.js
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save(); // Save survey
      // deduct credits
      req.user.credits -= 1;
      const user = await req.user.save();
      // send back updated user model
      // with credits for header in auth reducer
      res.send(user);
      // Email sent successfully?
    } catch (err) {
      res.status(422).send(err); // unprocessable entity - bad form info
    }
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
