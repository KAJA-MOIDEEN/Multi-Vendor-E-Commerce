import nodemailer from 'nodemailer'
import adminModel from '../models/admin.model.js';


const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    }
)

export const sendMailForRegistration = async(adminData)=>{
    console.log("From Registe");
    try {
        await transporter.sendMail({
            to: adminData.email,
            subject: 'Request for registration as Vendor',
            html: `<h1>Request for user registration is done successfully</h1>
                    <p>Dear ${adminData.name},</p>
                    <p>Your request to register as a vendor has been received and processed successfully.</p>
                    <p>Thank you,</p>
                    <p>Your Company</p>`
        })
        
    } catch (error) {
        console.log(error);
        
    }

   

    

}

const sendMail = async(req, res) => {
    const { _id, status } = req.body;

    try {
        const vendorMail = await adminModel.findById(_id);
        console.log("frommailsend", vendorMail.email);

        const sendActivationMail = {
            to: vendorMail.email,
            subject: 'Account Activated',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <h1 style="color: #4CAF50; text-align: center;">Congratulations!</h1>
                    <p style="font-size: 16px; color: #333;">
                        Your account has been activated. You can now log in and start using the platform.
                    </p>
                    <div style="text-align: center;">
                        <a href="http://localhost:5174/" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Go to Dashboard
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #999; margin-top: 20px;">
                        If you did not request this, please contact support.
                    </p>
                </div>
            `
        };

        const sendDeactivationMail = {
            to: vendorMail.email,
            subject: 'Account Deactivated',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f44336; border-radius: 10px;">
                    <h1 style="color: #f44336; text-align: center;">Account Deactivated</h1>
                    <p style="font-size: 16px; color: #333;">
                        Your account has been deactivated. If you need further assistance, please contact our support.
                    </p>
                    <div style="text-align: center;">
                        <a href="mailto:${process.env.NODEMAILER_EMAIL}" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Contact Support
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #999; margin-top: 20px;">
                        We're here to help you resolve any issues.
                    </p>
                </div>
            `
        };

        if (status) {
            await transporter.sendMail(sendActivationMail);
            // Return success message
            console.log({ message: 'Activation email sent successfully.' });
        } else {
            await transporter.sendMail(sendDeactivationMail);
            // Return success message
            console.log({ message: 'Deactivation email sent successfully.' });
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return res.json({ error: 'Error sending email' });
    }
};

export {sendMail} 