const amqp = require("amqplib");
const sendEmail = require("../services/emailService");
const sendSMS = require("../services/smsService");
const saveInApp = require("../services/inAppService");
const Notification = require("../models/Notification");

async function startConsumer() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue("notifications");

  channel.consume("notifications", async (msg) => {
    const notification = JSON.parse(msg.content.toString());
    try {
      if (notification.type === "email") await sendEmail(notification);
      if (notification.type === "sms") await sendSMS(notification);
      if (notification.type === "in-app") await saveInApp(notification);

      await Notification.updateOne(
        { _id: notification._id },
        { $set: { status: "sent" } }
      );
      channel.ack(msg);
    } catch (err) {
      console.error("Error sending notification:", err.message);
      await Notification.updateOne(
        { _id: notification._id },
        {
          $set: { status: "failed" },
          $inc: { retries: 1 }
        }
      );
      if (notification.retries < 3) {
        notification.retries++;
        setTimeout(() => {
          channel.sendToQueue("notifications", Buffer.from(JSON.stringify(notification)));
        }, 3000);
      } else {
        channel.ack(msg);
      }
    }
  });

  console.log("🚀 Notification consumer started");
}

module.exports = startConsumer;
