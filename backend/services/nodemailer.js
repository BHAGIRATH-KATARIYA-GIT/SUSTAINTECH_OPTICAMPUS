import nodemailer from "nodemailer";

export const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"OptiCampus" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for OptiCampus",
    html: `<h2>Your OTP is <b>${otp}</b></h2>`,
  });
};
