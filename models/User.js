const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0 //to initialize
  }
});

mongoose.model('users', userSchema);