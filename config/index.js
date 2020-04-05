const firebase = require('./firebase');
const stripe = require('./stripe');
const backend = require('./backend');
const google = require('./google');

module.exports = { firebaseConfig: firebase, stripe, backend, google };
