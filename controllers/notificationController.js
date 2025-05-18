const Notification = require("../models/Notification");
const publishNotification = require("../queues/publisher");

exports.sendNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    await publishNotification(notification);
    res.status(200).json({ message: "Notification queued." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ userId: req.params.id });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
