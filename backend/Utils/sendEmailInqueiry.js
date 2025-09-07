const nodemailer = require('nodemailer');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
async function sendEmail({ name, email, phone, message }) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Change this to your preferred provider if necessary
            auth: {
                user: "shubhamankushe93@gmail.com",  // Your email address
                pass: "uvvs wbtx rnqa sand",  // Your email password or app-specific password
            },
        });

        const adminMailOptions = {
            from: `"Niramaya Contact Form" <no-reply@yourcompany.com>`,
            to: ADMIN_EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || '-'}</p>
                <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
            `,
        };
       
        await transporter.sendMail(adminMailOptions);

        return { success: true };
    } catch (error) {
        console.error("❌ Email sending error:", error);
        return { success: false, error };
    }
}

module.exports = sendEmail;
