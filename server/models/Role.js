const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qualifications: {
    type: Array,
  }
});

const Role = model('role', roleSchema);

module.exports = Role;
