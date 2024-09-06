// backend/utils/emailService.js
const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (user) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // atau layanan email lain yang Anda gunakan
        auth: {
            user: process.env.EMAIL_USER, // email pengirim
            pass: process.env.EMAIL_PASS  // password email pengirim
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Email Confirmation',
        text: `Hello ${user.firstName},\n\nPlease confirm your email by clicking the link below:\n\nhttp://yourapp.com/confirm-email?token=${user.confirmationToken}\n\nThank you!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to:', user.email);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

module.exports = { sendConfirmationEmail };