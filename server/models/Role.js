const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  qualifications: [{
    type: Schema.Types.ObjectId,
    ref: "Qualification"
  }]
});

const Role = model('role', roleSchema);

module.exports = Role;
