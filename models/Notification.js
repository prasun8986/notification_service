const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String,
  type: { type: String, enum: ['email', 'sms', 'in-app'], required: true },
  content: String,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  retries: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
