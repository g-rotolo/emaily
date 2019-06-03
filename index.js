const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// order matters
// like so the model is created before the passport uses it
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);