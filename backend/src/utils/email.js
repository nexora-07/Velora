const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const email = process.env.EMAIL;
  // Trim spaces automatically in case .env has formatted app passwords
  const password = process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.replace(/\s+/g, '') : '';

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false, // Prevents local SSL handshake failures
    },
  });

  const mailOptions = {
    from: `Shopsy <${email}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;