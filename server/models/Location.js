const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  }

});

const Location = model('location', locationSchema);

module.exports = Location;
