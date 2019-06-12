const keys = require('../config/keys');
const stripe = require('stripe')(
  keys.stripeSecretKey
);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500, // cents
      currency: 'usd',
      description: '5$ for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5; // passport.js adds the current user to the req object
    const user = await req.user.save(); // persist the user
    res.send(user);
  });
};