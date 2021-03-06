const { Schema, model } = require('mongoose');
const Role = require('./Role')
const Timeslot = require('./Timeslot')
const Volunteer = require('./Volunteer')

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
  timeslot: {
    type: Schema.Types.ObjectId,
    ref: Timeslot,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: Role,
  },
  location: {
    type: String,
    required: true,
  },
  assignedVolunteer: {
    type: Schema.Types.ObjectId,
    ref: Volunteer,
  }
});

const Shift = model('shift', shiftSchema);

module.exports = Shift;
