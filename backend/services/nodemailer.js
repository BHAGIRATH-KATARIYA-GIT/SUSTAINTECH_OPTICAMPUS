import nodemailer from "nodemailer";

export const sendMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000,
    });

    // Verify connection before sending
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const info = await transporter.sendMail({
      from: `"OptiCampus" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for OptiCampus",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; text-align: center;">
            <h2 style="color: #333;">Your OptiCampus OTP</h2>
            <p style="color: #666; margin-bottom: 20px;">Your One-Time Password is:</p>
            <h1 style="color: #4CAF50; font-size: 36px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">This OTP is valid for 10 minutes.</p>
          </div>
        </div>
      `,
    });

    console.log(`✅ OTP sent to ${email}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.error("Error details:", error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};
