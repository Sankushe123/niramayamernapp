const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  phone_number: { type: String, required: true },
  additional_number: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  gender: { type: String },
  address: { type: String },
  city: { type: String },
  password: { type: String, required: true },
  aadhar_no: { type: String },
  aadhar_image: { type: String }, // store JSON string or URL
  role: { type: String, required: true, default: 'user' },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
