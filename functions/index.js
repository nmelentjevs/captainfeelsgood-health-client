const functions = require('firebase-functions');
const config = require('../config');
const stripe = require('stripe')(config.stripe.secret);

exports.payWithStripe = functions.https.onRequest((req, res) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys

  // eslint-disable-next-line promise/catch-or-return
  stripe.charges
    .create({
      amount: req.body.amount,
      currency: req.body.currency,
      source: req.body.token
    })
    .then(charge => {
      // asynchronously called
      res.send(charge);
    })
    .catch(err => {
      console.log(err);
    });
});
