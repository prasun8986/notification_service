const amqp = require("amqplib");

async function publishNotification(notification) {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue("notifications");
  channel.sendToQueue("notifications", Buffer.from(JSON.stringify(notification)));
  setTimeout(() => conn.close(), 500);
}

module.exports = publishNotification;
