const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  avatar: { type: String, default: null },
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  likedProducts: { type: [String], default: [] },
  card: [{
    product: { type: Types.ObjectId, required: true },
    count: { type: Number, default: 1, required: true }
  }]
});

module.exports = model('User', schema);