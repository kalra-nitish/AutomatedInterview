const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const sendTestLink = (email, testLink) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Technical Test Invitation',
        text: `Please take the technical test using the following link: ${testLink}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email', error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    });
};

module.exports = { sendTestLink };