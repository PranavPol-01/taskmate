
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'pranav.s.pol144@gmail.com',
    pass: process.env.PASS,
  },
});

const sendReminderEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'pranav.s.pol144@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

export default sendReminderEmail;
