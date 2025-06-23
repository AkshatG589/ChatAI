const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, username, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER, // 👉 from .env
      pass: process.env.SMTP_PASS, // 👉 from .env (Gmail App Password)
    },
  });

  const info = await transporter.sendMail({
    from: `"chatgpt clone" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Hello ${username}, your OTP is ${otp}. It expires in 1 minute.`,
  });

  console.log("✅ OTP sent to:", email);
  return info.messageId;
};

module.exports = sendOTPEmail;