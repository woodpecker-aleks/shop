const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  date: { type: Date, default: new Date, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
  products: [{
    count: { type: Number, default: 1 },
    product: { type: Types.ObjectId, ref: 'Product' }
  }],
  adress: { type: String, required: true },
  text: String,
  deliveryType: String
});

module.exports = model('Order', schema);