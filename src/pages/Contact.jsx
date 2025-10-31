import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        "YOUR_SERVICE_ID", // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "admin@monoxtrades.com",
        },
        "YOUR_PUBLIC_KEY" // replace with your EmailJS public key
      )
      .then(
        (result) => {
          setSuccessMsg("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setSuccessMsg(""), 5000);
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-12 text-center max-w-2xl">
        Reach out to us at Monox Trades. We’re here to help and answer any questions you might have.
      </p>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-white p-10 rounded-2xl shadow-xl space-y-6 transform transition hover:-translate-y-1 hover:shadow-2xl duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <div className="flex items-center gap-4 text-gray-700">
            <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
            <span className="text-lg">monox</span>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <FaPhone className="text-yellow-500 text-2xl" />
            <span className="text-lg"></span>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <FaEnvelope className="text-yellow-500 text-2xl" />
            <span className="text-lg">support@monoxtrades.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-2xl shadow-xl transform transition hover:-translate-y-1 hover:shadow-2xl duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Send a Message</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-3 transition-transform transform hover:scale-105"
            >
              Send Message <FaPaperPlane />
            </button>
          </form>
          {successMsg && (
            <p className="mt-5 text-green-600 font-semibold text-center animate-fadeIn">
              {successMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
