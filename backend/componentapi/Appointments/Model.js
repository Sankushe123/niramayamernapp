const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  doctorName: { type: String, required: true, trim: true, maxlength: 100 },
  mobileNumber: { type: String, required: true, trim: true, maxlength: 15 },
  email: { type: String, required: true, trim: true, maxlength: 100, lowercase: true },
  message: { type: String, default: '' },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Store time as HH:mm string
  isOnline: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

