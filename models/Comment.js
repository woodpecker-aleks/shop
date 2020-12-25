const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  for: { type: Types.ObjectId, ref: 'Product' },
  date: { type: Date, default: new Date, required: true },
  text: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
  rating: { type: Number, default: null }
});

module.exports = model('Comment', schema);