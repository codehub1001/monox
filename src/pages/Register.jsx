import React, { useState } from "react";
import { Link } from "react-router-dom";
import countries from '../data/countries.json';
import { FaGlobe, FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaGift } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
    referral: "", // optional
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, username, email, mobile, country, password, confirmPassword } = form;
    if (!firstName || !lastName || !username || !email || !mobile || !country || !password || !confirmPassword) {
      alert("All fields are required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log("Register data:", form);
      // TODO: Add API call here
      setTimeout(() => {
        alert("Account created successfully!");
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 tracking-tight">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          You can create account using email or username and the registration is fully free
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Country */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaGlobe className="text-gray-400 mr-2" />
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full outline-none text-gray-700 bg-transparent"
              required
            >
              <option value="" disabled>Select Country</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="ml-2 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Referral Code (Optional) */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105">
            <FaGift className="text-gray-400 mr-2" />
            <input
              type="text"
              name="referral"
              placeholder="Referral Code (Optional)"
              value={form.referral}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
