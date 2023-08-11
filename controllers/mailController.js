import sgMail from '@sendgrid/mail';
import asyncHandler from 'express-async-handler';
import Subscribers from '../models/subscriberModel.js';
import Verification from '../models/verificationModel.js';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
}
export const sendEmail = asyncHandler(async (req, res) => {
    try {
        const { recipient } = req.body;
        const mailTemplate = `
        <!DOCTYPE html>
        <html>        
        <head>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, sans-serif;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
        
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
        
                .emoji {
                    font-size: 48px;
                    margin-bottom: 10px;
                }
        
                .message {
                    font-size: 18px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #3498db;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <table style="width: 100%;background-color: rgb(255, 255, 255);padding:20px 0px 40px 0px">
                <tbody>
                    <tr>
                        <td>
                            <div class="container">
                                <div class="header">
                                    <div class="emoji">🌟</div>
                                    <h1>Welcome to Our Community!</h1>
                                </div>
                                <div class="message">
                                    <p>We're thrilled to have you join us. Get ready for exciting updates, insightful content,
                                        and valuable resources delivered straight to your inbox.</p>
                                    <p>If you ever have questions, suggestions, or just want to say hello, don't hesitate to
                                        reach out to us.</p>
                                    <p>Let's embark on this journey together!</p>
                                </div>
                                <div class="button">
                                    <a href="#" style="color: white; text-decoration: none;">Explore Now</a>
                                </div>
                                <div class="footer">
                                    <p style="padding:20px 0px 10px 0px;">Best regards,</p>
                                    <p>Narayana</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>           
        `;
        const SubscriptionMsg = {
            to: recipient,
            from: process.env.SENDER_MAIL_ID,
            subject: 'Welcome to Our Community!',
            html: mailTemplate,
            tags: ['important']
        };
        await sgMail.send(SubscriptionMsg);
        res.status(200).json({ message: 'Sent Mail successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});

export const subscribe = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        await Subscribers.addSubscriber(email);
        const SubscriptionTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                * {
                    margin: 0px;
                    padding: 0px;
                    box-sizing: border-box;
                    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                }
            </style>
        </head>
        <body>
            <table style="width: 100%;background-color: rgb(255, 255, 255);padding:20px 0px 40px 0px">
                <tbody>
                    <tr>
                        <td>
                            <div class="container">
                                <div style="display:flex;justify-content:center;align-items:center;">
                                    <div>
                                        <h2 style="padding:20px 0px;">🎉Thank You for Subscribing!🎉</h2>
                                        <p style="padding:10px 0px;font-size:18px;">We're excited to have you as a part of our
                                            community.</p>
                                        <p style="padding:10px 0px;font-size:18px;">You will now receive updates, insights, and
                                            valuable resources straight to your inbox.</p>
                                        <p style="padding:10px 0px;font-size:18px;">Feel free to reach out if you have any
                                            questions
                                            or suggestions.</p>
                                        <p style="padding:30px 0px 10px 0px;font-size:18px;">Best regards,</p>
                                        <p style="font-size: 18px;">Narayana</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>
        `;
        const SubscriptionMsg = {
            to: email,
            from: process.env.SENDER_MAIL_ID,
            subject: '🎉Thank You for Subscribing!🎉',
            html: SubscriptionTemplate,
            tags: ['important']
        };
        await sgMail.send(SubscriptionMsg);
        res.status(200).json({ message: 'Subscribed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while subscribing' });
    }
});

export const unsubscribe = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        const unsubscribedSubscriber = await Subscribers.removeSubscriber(email);
        if (!unsubscribedSubscriber) {
            return res.status(400).json({ error: 'Email not found or already unsubscribed' });
        }
        console.log(`Unsubscribed email: ${email}`);
        res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while unsubscribing' });
    }
});
export const verifyCode = asyncHandler(async (req, res) => {
    try {
        const { email, code } = req.body;
        const verificationDoc = await Verification.findOne({ email });
        if (!verificationDoc || verificationDoc.expiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired verification code' });
        }
        if (code !== verificationDoc.code) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }
        await Verification.findOneAndDelete({ email });
        res.status(200).json({ message: 'Verification code is valid' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while verifying the code' });
    }
});

export const sendVerificationCode = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        let verificationDoc = await Verification.findOne({ email });

        if (!verificationDoc || verificationDoc.expiresAt < Date.now()) {
            const verificationCode = generateVerificationCode();
            if (!verificationDoc) {
                verificationDoc = new Verification({
                    email,
                });
            }
            verificationDoc.code = verificationCode;
            verificationDoc.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
            await verificationDoc.save();
            // Create the verification code email template
            const verificationTemplate = `
                <html>
                <head>
                    <style>
                        /* Your custom styles here */
                    </style>
                </head>
                <body>
                    <table style="width: 100%;padding:20px 10px 40px 10px">
                        <tbody>
                            <tr>
                                <td>
                                    <div style="display:flex;justify-content:center;align-items:center;">
                                        <div>
                                            <h2 style="padding:20px 0px;">🔐 Your Verification Code 🔐</h2>
                                            <p style="padding:10px 0px;font-size:18px;">Use the following code to verify your email:</p>
                                            <h1 style="font-size: 36px;">${verificationCode}</h1>
                                            <p style="padding:10px 0px;font-size:18px;">This code is valid for 15 minutes.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
            </html>
            `;

            // Send the verification code email
            const verificationMsg = {
                to: email,
                from: process.env.SENDER_MAIL_ID,
                subject: 'Verification Code for Email Confirmation',
                html: verificationTemplate,
                tags: ['verification'],
            };
            await sgMail.send(verificationMsg);
        } else {
            // Re-send the existing verification code
            const verificationTemplate = `
            <html>
            <head>
                <style>
                    /* Your custom styles here */
                </style>
            </head>
            <body>
                <table style="width: 100%;padding:20px 10px 40px 10px">
                    <tbody>
                        <tr>
                            <td>
                                <div style="display:flex;justify-content:center;align-items:center;">
                                    <div>
                                        <h2 style="padding:20px 0px;">🔐 Your Verification Code 🔐</h2>
                                        <p style="padding:10px 0px;font-size:18px;">Use the following code to verify your email:</p>
                                        <h1 style="font-size: 36px;">${verificationDoc.code}</h1>
                                        <p style="padding:10px 0px;font-size:18px;">This code is valid for 15 minutes.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
            `;

            // Send the verification code email
            const verificationMsg = {
                to: email,
                from: process.env.SENDER_MAIL_ID,
                subject: 'Resent Verification Code for Email Confirmation',
                html: verificationTemplate,
                tags: ['verification'],
            };
            await sgMail.send(verificationMsg);
        }

        res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the verification code' });
    }
});
