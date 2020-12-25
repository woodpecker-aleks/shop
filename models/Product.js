const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: [Number],
  url: { type: String, required: true, unique: true },
  date: { type: Date, default: new Date },
  categories: [String],
  sale: {
    price: Number,
    start: Date,
    end: Date
  },
  count: Number,
  description: String,
  options: [{
    name: String,
    value: String
  }],
  mainImage: { type: String },
  images: [String]
});

module.exports = model('Product', schema);