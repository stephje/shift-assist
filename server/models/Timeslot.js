const { Schema, model } = require('mongoose');

const timeslotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  }
});

const Timeslot = model('timeslot', timeslotSchema);

module.exports = Timeslot;
