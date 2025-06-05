const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Email validation utility
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const config = {
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
};

const transporter = nodemailer.createTransport(config);

/**
 * Send email with customizable content
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @param {string} options.username - Username for personalization (optional)
 * @returns {Promise} - Email send result
 */
const sendMail = async (options) => {
  // Validate email
  if (!options.to || !isValidEmail(options.to)) {
    throw new Error("Invalid email address");
  }

  try {
    const mailOptions = {
      from: `"Email Sender App" <${process.env.EMAIL}>`,
      to: options.to,
      subject: options.subject || "No Subject",
      text: options.text || "",
      html: options.html || "",
    };

    // Use promise-based approach instead of callback
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

module.exports = sendMail;
