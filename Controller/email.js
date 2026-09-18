const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ritikahari2006@gmail.com",
        pass: "ulfk brfk abbk gknz"
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully:", info.response);

        return true;

    } catch (error) {
        console.log("Email error:", error);
        throw error;
    }
};

module.exports = { sendEmail };