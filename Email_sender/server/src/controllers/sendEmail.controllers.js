const sendMail = require("../middleware/mailer.js");

/**
 * Send a generic email message with custom content
 */
const sendingMessages = async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Use provided subject and message or defaults
    const emailSubject = subject || "Message from Email Sender App";
    const emailMessage =
      message || "Hello, this is a test email from the Email Sender App.";

    // Create HTML version of the message with basic formatting
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4a5568;">${emailSubject}</h2>
        <div style="margin-top: 20px; line-height: 1.6;">
          ${emailMessage
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("")}
        </div>
        <div style="margin-top: 30px; padding: 15px; background-color: #f7fafc; border-radius: 4px;">
          <p style="margin: 0; color: #718096; font-size: 0.9em;">Sent from Email Sender App</p>
        </div>
      </div>
    `;

    await sendMail({
      to: email,
      subject: emailSubject,
      text: emailMessage,
      html: htmlMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};

/**
 * Send login notification email
 */
const sendLoginNotification = async (req, res) => {
  const { email, username } = req.body;

  if (!email || !username) {
    return res.status(400).json({
      success: false,
      message: "Email and username are required",
    });
  }

  try {
    await sendMail({
      to: email,
      subject: "Login Successful",
      text: `Hello ${username}, you have successfully logged in to the Email Sender App.`,
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #4CAF50;">Login Successful</h2>
                    <p>Hello <strong>${username}</strong>,</p>
                    <p>You have successfully logged in to the Email Sender App.</p>
                    <p>If this wasn't you, please secure your account immediately.</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
                        <p style="margin: 0; color: #666;">This is an automated message, please do not reply.</p>
                    </div>
                </div>
            `,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful and notification email sent",
      user: { email, username },
    });
  } catch (error) {
    console.error("Login notification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Login successful but failed to send notification email",
      error: error.message,
      user: { email, username },
    });
  }
};

module.exports = {
  sendingMessages,
  sendLoginNotification,
};
