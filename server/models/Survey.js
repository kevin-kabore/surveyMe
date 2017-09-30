const mongoose = require('mongoose');
const { Schema } = mongoose;
// require recipientSchema as subdocument
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // array of RecipientSchema records
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // reference to a particular user
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
