const connectToDatabase = require('../db');
const Note = require('../models/Note');
//require('dotenv').config({ path: './.env' });

module.exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase()
      .then(() => {
        Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
          .then(note => callback(null, {
            statusCode: 200,
            body: JSON.stringify(note)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the notes.'
          }));
      });
  };
  