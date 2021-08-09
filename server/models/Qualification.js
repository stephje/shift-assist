const { Schema, model } = require('mongoose');

const qualificationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  }
});

const Qualification = model('qualification', qualificationSchema);

module.exports = Qualification;
