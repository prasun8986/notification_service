const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

async function sendSMS(notification) {
  await client.messages.create({
    body: notification.content,
    from: process.env.TWILIO_PHONE,
    to: notification.userId
  });
}

module.exports = sendSMS;
