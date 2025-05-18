const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { getChannel } = require('../config/rabbitmq');

// Send a notification
router.post('/notifications', async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    const newNotification = new Notification({ userId, type, message });
    await newNotification.save();

    const channel = getChannel();
    if (channel) {
      channel.sendToQueue('notification_queue', Buffer.from(JSON.stringify(newNotification)));
    }

    res.status(201).json({ success: true, message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all notifications for a user
router.get('/users/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
