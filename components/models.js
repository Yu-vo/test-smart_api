const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  brand: { type: String },
  category: { type: String },
});
// productSchema.methods = {
//   createProduct: async () => {

//   }
// }
module.exports = mongoose.model('Product', productSchema);
