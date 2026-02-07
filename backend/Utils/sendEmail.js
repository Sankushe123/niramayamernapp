const nodemailer = require('nodemailer');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function sendEmail({ to, subject, html, purpose, userDetails }) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Change this to your preferred provider if necessary
            auth: {
                user: "shubhamankushe93@gmail.com",  // Your email address
                pass: "uvvs wbtx rnqa sand",  // Your email password or app-specific password
            },
        });

        // console.log("ADMIN_EMAIL", to, subject, html, purpose, userDetails );
        

        // Email to User
        const userMailOptions = {
            from: `"Niramaya Mother and Child Care Team" <no-reply@yourcompany.com>`,
            to,
            subject,
            html: `
              <div style="background-color: #40E0D0; padding: 30px; font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden;">
                  
                  <div style="background-color: #A8E6CF; padding: 20px; text-align: center;">
                    <img src="https://res.cloudinary.com/dzmndqvb2/image/upload/v1746083936/email-13794_x0rv1t.png" alt="Mailbox" style="width: 50px;">
                  </div>
          
                  <div style="padding: 20px; text-align: left;">
                    <h2 style="color: #333;">Thank You for Contacting Us!</h2>
                    <p>Dear ${userDetails?.fullName || 'User'},</p>
                    <p>Thank you for reaching out to Niramaya Mother and Child Care. We have received your message and will get back to you shortly.</p>
                    <p><strong>Your Submitted Details:</strong></p>
                     <div style="padding: 20px; text-align: left;">
                    <h2 style="color: #333;">New ${purpose} Received!</h2>
                    <p><strong>Appointment Date & Time:</strong> ${userDetails?.formattedDate || 'Not provided'} - ${userDetails?.time || 'Not provided'}</p>
                    <p><strong>Doctor Name:</strong> ${userDetails?.doctorName}</p>
                    <p><strong>Email:</strong> ${userDetails?.email}</p>
                    <p><strong>Phone:</strong> ${userDetails?.mobileNumber}</p>
                    <p><strong>Mode of Appointment:</strong> ${userDetails?.isOnline ? "Online Consultation" : "Clinic Visit"}</p>
                    <p><strong>Message:</strong> ${userDetails?.message ? userDetails?.message : "-"}</p>
                  </div>
                  </div>
          
                  <div style="padding: 20px; text-align: center;">
                    <a href="https://niramayahealthcare.in" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                      Visit Our Website
                    </a>
                  </div>
          
                </div>
              </div>
            `,
            replyTo: process.env.REPLY_TO_EMAIL || process.env.EMAIL_USER,
            headers: {
                'X-Priority': '1',
                'X-Mailer': 'Nodemailer',
            },
        };


        // Email to Admin
        const adminMailOptions = {
            from: `"Niramaya Mother and Child Care Notification" <no-reply@yourcompany.com>`,
            to: ADMIN_EMAIL,
            subject: `New ${purpose} received from ${userDetails?.fullName || 'User'}`,
            html: `
              <div style="background-color: #40E0D0; padding: 30px; font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden;">
                  
                  <div style="background-color: #A8E6CF; padding: 20px; text-align: center;">
                    <img src="https://res.cloudinary.com/dzmndqvb2/image/upload/v1746083936/email-13794_x0rv1t.png" alt="Mailbox" style="width: 50px;">
                  </div>
          
                  <div style="padding: 20px; text-align: left;">
                    <h2 style="color: #333;">New ${purpose} Received!</h2>
                    <p><strong>Appointment Date & Time:</strong> ${userDetails?.formattedDate || 'Not provided'} - ${userDetails?.time || 'Not provided'}</p>
                    <p><strong>Patient Name:</strong> ${userDetails?.fullName}</p>
                    <p><strong>Doctor Name:</strong> ${userDetails?.doctorName}</p>
                    <p><strong>Email:</strong> ${userDetails?.email}</p>
                    <p><strong>Phone:</strong> ${userDetails?.mobileNumber}</p>
                    <p><strong>Mode of Appointment:</strong> ${userDetails?.isOnline ? "Online Consultation" : "Clinic Visit"}</p>
                    <p><strong>Message:</strong> ${userDetails?.message ? userDetails?.message : "-"}</p>
                  </div>
          
                  <div style="padding: 20px; text-align: center;">
                    <a href="mailto:${userDetails?.email}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                      Reply to ${userDetails?.fullName}
                    </a>
                  </div>
          
                </div>
              </div>
            `,
            replyTo: process.env.REPLY_TO_EMAIL || process.env.EMAIL_USER,
        };

        // Send emails
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        return { success: true, message: "Emails sent successfully" };
    } catch (error) {
        console.error("❌ Email sending error:", error);
        return { success: false, message: "Failed to send emails", error };
    }
}

module.exports = sendEmail;
