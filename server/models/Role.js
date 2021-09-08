const { Schema, model } = require('mongoose');
const Qualification = require('./Qualification')

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  qualifications: [{
    type: Schema.Types.ObjectId,
    ref: Qualification
  }]
});

const Role = model('role', roleSchema);

module.exports = Role;
 