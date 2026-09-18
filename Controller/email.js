const nodemailer =require("nodemailer");
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"ritikahari2006@gmail.com",
        pass:"ulfk brfk abbk gknz"
    }
});
const sendEmail=async(to,subject,text)=>{
    try{
        const mailOptions={
            from:"ritikahari2006@gmail.com",   
            to:to,
            subject:subject,
            text:text
        };
        const info=await transporter.sendMail(mailOptions);
        console.log("Email sent  successfully:",info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }   
    return false;
};
module.exports={sendEmail};