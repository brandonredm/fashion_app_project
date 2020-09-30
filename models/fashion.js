const mongoose = require("mongoose");

const fashionSchema = new mongoose.Schema({
  color: String,
  brand: String,
  line: String,
  img: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const Fashion = mongoose.model("Fashion", fashionSchema);

module.exports = Fashion;
