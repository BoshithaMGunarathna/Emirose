const nodemailer = require('nodemailer');
const { adminQuoteNotificationTemplate } = require('../utils/emailTemplates');
const { adminQuoteResponseTemplate } = require('../utils/emailTemplates');
const { customerQuoteResponseTemplate } = require('../utils/customerEmailTemplate');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const logoPath = path.join(__dirname, '..', 'assets', 'images', 'logo.png');


let logoBase64;
try {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
} catch (error) {
    console.error('Error reading logo file:', error);
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendQuoteNotificationToAdmin = async (quote) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Quote Request',
        html: adminQuoteNotificationTemplate(quote, logoBase64),
      
        attachments: [{
            filename: 'logo.png',
            path: logoPath,
            cid: 'company-logo' 
        }]
    };

    return transporter.sendMail(mailOptions);
};

exports.sendQuoteResponseToCustomer = async (quote) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: quote.Email,
        subject: 'Your Quote Request',
        html: customerQuoteResponseTemplate(quote, logoBase64),
  
        attachments: [{
            filename: 'logo.png',
            path: logoPath,
            cid: 'company-logo'
        }]
    };

    return transporter.sendMail(mailOptions);
};

exports.sendAdminQuoteResponse = async (quoteData) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: quoteData.Email,
            subject: `Quote for Your ${quoteData.EventType} - Emirose`,
            html: adminQuoteResponseTemplate(quoteData, logoBase64),
            attachments: [{
                filename: 'logo.png',
                path: logoPath,
                cid: 'company-logo'
            }]
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Quote sent successfully' };
    } catch (error) {
        console.error('Error sending quote email:', error);
        throw new Error('Failed to send quote email');
    }
};