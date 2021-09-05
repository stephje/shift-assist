const { Schema, model } = require('mongoose');
const Role = require('./Role')
const Timeslot = require('./Timeslot')


const shiftSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  timeslots: [{
    type: Schema.Types.ObjectId,
    ref: Timeslot
}],
  roles: [{
    type: Schema.Types.ObjectId,
    ref: Role
  }],
});

const Shift = model('shift', shiftSchema);

module.exports = Shift;
