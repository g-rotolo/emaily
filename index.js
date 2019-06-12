const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// order matters
// like so the model is created before the passport uses it
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, function(error){console.log('ERROR:', error)});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:[keys.cookiesKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


//pass the app to the passport file in services folder
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);