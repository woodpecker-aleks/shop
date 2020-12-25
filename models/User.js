const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  avatar: { type: String, default: null },
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String
});

module.exports = model('User', schema);