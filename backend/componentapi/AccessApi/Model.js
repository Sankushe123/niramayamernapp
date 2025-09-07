const mongoose = require("mongoose");

const RoleAccessSchema = new mongoose.Schema({
  _id	: mongoose.Schema.Types.ObjectId,
  role: { type: String, required: true },
  module: { type: String, required: true },
  can_read: { type: Boolean, default: false },
  can_write: { type: Boolean, default: false },
  can_delete: { type: Boolean, default: false },
  can_all: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.models.RoleAccess || mongoose.model("RoleAccess", RoleAccessSchema);
