import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-500">Monox Trades</h2>
          <p className="text-gray-400">
            Empowering your financial journey with secure trading, planning services, and expert insights.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-500"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-500"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-500"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-500">Home</a></li>
            <li><a href="/services" className="hover:text-yellow-500">Services</a></li>
            <li><a href="/contact" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-yellow-500" /> 123 Monox Street</p>
          <p className="flex items-center gap-2"><FaPhone className="text-yellow-500" /> </p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-yellow-500" /> support@monoxtrades.com</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Monox Trades. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
