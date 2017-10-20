const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // check if isLoggedin with middleware
const requireCredits = require('../middlewares/requireCredits'); // check if enough credits with middleware
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// define arrow function, and export
//// import into index.js
module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false // exclude recipients list
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // Extract survey id and the 'choice'

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname); // Extract path from url
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // Extract null events
      .uniqBy('email', 'surveyId') // extract double responses
      .each(({ surveyId, email, choice }) => {
        console.log(
          'surveyId: ' + surveyId + 'email: ' + email + 'choice' + choice
        );
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

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
