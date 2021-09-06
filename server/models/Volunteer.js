const { Schema, model } = require('mongoose');
const Role = require('./Role')
const Qualification = require('./Qualification')
const Timeslot = require('./Timeslot')
const Shift = require('./Shift')
const User = require('./User')

const volunteerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User
  },
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
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
  },
  suburb: {
    type: String,
  },
  state: {
    type: String,
  },
  postcode: {
    type: String,
    required: true,
  },
  previousExperience: {
    type: String,
    required: true,
  },
  medical: {
    type: String,
  },
  emergencyContactName: {
    type: String,
    required: true,
  },
  emergencyContactRelationship: {
    type: String,
    required: true,
  },
  emergencyContactPhone: {
    type: String,
    required: true,
  },
  commsPermissions: {
    type: Boolean,
    required: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  nominatedRoles: [{
    type: Schema.Types.ObjectId,
    ref: Role
  }],
  qualificationsHeld: [{
    type: Schema.Types.ObjectId,
    ref: Qualification
  }],
  availability: [{
    type: Schema.Types.ObjectId,
    ref: Timeslot
  }],
  assignedShifts: [{
    type: Schema.Types.ObjectId,
    ref: Shift
  }]

});

const Volunteer = model('volunteer', volunteerSchema);

module.exports = Volunteer;
