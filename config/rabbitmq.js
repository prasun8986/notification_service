const amqp = require('amqplib');
let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('notification_queue');
    console.log('✅ Connected to RabbitMQ');
  } catch (error) {
    console.error('❌ RabbitMQ connection error:', error);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
