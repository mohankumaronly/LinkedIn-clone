require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
const handlebars = require('handlebars');

const verifyMail = async (token, email) => {
    try {
        const emailTemplateSource = fs.readFileSync(
            path.join(__dirname, "template.hbs"),
            "utf-8"
        );

        const template = handlebars.compile(emailTemplateSource);
        const htmlToSend = template({ token: encodeURIComponent(token) });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailConfigurations = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: htmlToSend,
        };
        const info = await transporter.sendMail(mailConfigurations);
        console.log('Email sent successfully');
        console.log(info);
        
    } catch (error) {
        console.error("Error in verifyMail:", error);
        throw error;
    }
}
module.exports = { verifyMail };