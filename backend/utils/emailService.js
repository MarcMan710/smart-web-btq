// backend/utils/emailService.js
// Importing nodemailer for sending emails
const nodemailer = require('nodemailer');

// Function to send a confirmation email to a user
const sendConfirmationEmail = async (user) => {
    // Create a transporter using nodemailer with Gmail service (or any other email service used)
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or any other email service you are using
        auth: {
            user: process.env.EMAIL_USER, // sender's email
            pass: process.env.EMAIL_PASS  // sender's email password
        }
    });

    // Define email content and recipient
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Email Confirmation',
        text: `Hello ${user.firstName},\n\nPlease confirm your email by clicking the link below:\n\nhttp://yourapp.com/confirm-email?token=${user.confirmationToken}\n\nThank you!`
    };

    try {
        // Send the email using the transporter
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to:', user.email);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

module.exports = { sendConfirmationEmail };