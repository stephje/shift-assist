const { Schema, model } = require('mongoose');

const volunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Volunteer = model('volunteer', volunteerSchema);

module.exports = Volunteer;
