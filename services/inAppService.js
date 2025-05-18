const Notification = require("../models/Notification");

async function saveInApp(notification) {
  const doc = new Notification(notification);
  await doc.save();
}

module.exports = saveInApp;
