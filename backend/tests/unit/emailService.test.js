    // Successfully sends a confirmation email to the user
    it('should send a confirmation email when user details are valid', async () => {
        const nodemailer = require('nodemailer');
        const sendConfirmationEmail = require('../utils/emailService').sendConfirmationEmail;
        const user = { email: 'test@example.com', firstName: 'John', confirmationToken: '12345' };
    
        const sendMailMock = jest.fn().mockResolvedValue('Email sent');
        nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: sendMailMock });
    
        await sendConfirmationEmail(user);
    
        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Email Confirmation',
            text: `Hello ${user.firstName},\n\nPlease confirm your email by clicking the link below:\n\nhttp://yourapp.com/confirm-email?token=${user.confirmationToken}\n\nThank you!`
        });
    });

        // Handles missing or invalid user email gracefully
    it('should handle missing or invalid user email gracefully', async () => {
        const nodemailer = require('nodemailer');
        const sendConfirmationEmail = require('../utils/emailService').sendConfirmationEmail;
        const user = { email: '', firstName: 'John', confirmationToken: '12345' };
    
        const sendMailMock = jest.fn();
        nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: sendMailMock });
    
        await sendConfirmationEmail(user);
    
        expect(sendMailMock).not.toHaveBeenCalled();
    });