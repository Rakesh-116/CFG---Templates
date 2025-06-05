import React, { useState } from "react";
import axios from "axios";

const Home = ({ user }) => {
  const [emailForm, setEmailForm] = useState({
    recipientEmail: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailForm({
      ...emailForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!emailForm.recipientEmail || !validateEmail(emailForm.recipientEmail)) {
      setSendStatus({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    if (!emailForm.message.trim()) {
      setSendStatus({
        success: false,
        message: "Message cannot be empty",
      });
      return;
    }

    setSending(true);
    setSendStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/sendEmail",
        {
          email: emailForm.recipientEmail,
          subject: emailForm.subject,
          message: emailForm.message,
        }
      );

      if (response.data.success) {
        setSendStatus({
          success: true,
          message: "Email sent successfully!",
        });
        // Reset form after successful send
        setEmailForm({
          recipientEmail: "",
          subject: "",
          message: "",
        });
      } else {
        setSendStatus({
          success: false,
          message: response.data.message || "Failed to send email",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSendStatus({
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while sending the email",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-8 space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user.username}!
        </h2>
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-700 font-medium">Login successful!</p>
          <p className="text-green-600 mt-1">
            You are logged in with: {user.email}
          </p>
          <p className="text-green-600 mt-1">
            A login notification has been sent to your email.
          </p>
        </div>
      </div>

      {/* Email sending section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Send an Email</h2>

        {sendStatus && (
          <div
            className={`p-4 mb-6 text-sm rounded-lg ${
              sendStatus.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {sendStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="recipientEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Recipient Email
            </label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              value={emailForm.recipientEmail}
              onChange={handleChange}
              placeholder="Enter recipient's email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={emailForm.subject}
              onChange={handleChange}
              placeholder="Email subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={emailForm.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors"
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
