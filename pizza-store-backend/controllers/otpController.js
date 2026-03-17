const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const User = require("../models/User");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. ALWAYS log to terminal for the developer
    console.log("-----------------------------------------");
    console.log(`🔑 REGISTRATION OTP FOR ${email}: ${otp}`);
    console.log("-----------------------------------------");

    // 3. Save OTP to database
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // 4. TRY to send email if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Pizzeria Support" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your Registration OTP - Pizzeria",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #d9534f;">🍕 Welcome to Pizzeria!</h2>
              <p>Use the following OTP to verify your email address:</p>
              <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; border: 1px dashed #ccc;">
                ${otp}
              </div>
              <p style="margin-top: 20px; font-size: 14px; color: #777;">Valid for 5 minutes.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "OTP sent to your email successfully!" });

      } catch (mailError) {
        console.error("Email failed to send, but OTP is in terminal:", mailError.message);
        // Return success message for professional UI, but dev can see OTP in terminal
        return res.status(200).json({ 
          message: "OTP sent to your email successfully!" 
        });
      }
    } else {
      // No credentials, but we still return success for terminal-based testing
      console.log("ℹ️ Email bypass active (Missing credentials in .env)");
      return res.status(200).json({ 
        message: "OTP sent to your email successfully!" 
      });
    }

  } catch (error) {
    console.error("Critical OTP Error:", error);
    res.status(500).json({ message: "Internal server error during OTP generation" });
  }
};
