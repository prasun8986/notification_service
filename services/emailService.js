const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(notification) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: notification.userId,
    subject: "Notification",
    text: notification.content
  };
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
