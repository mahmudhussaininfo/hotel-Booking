import nodemailer from "nodemailer";

const sendMail = async (to, sub, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `Hotel Booking <${process.env.EMAIL_USER}>`,
    to: to,
    subject: sub,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendMail;
