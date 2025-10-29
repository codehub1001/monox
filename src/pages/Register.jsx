import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countries from "../data/countries.json";
import {
  FaGlobe,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaGift,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    referral: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      username,
      email,
      mobile,
      country,
      password,
      confirmPassword,
    } = form;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !country.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("All fields except referral code are required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        country: form.country,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      if (form.referral.trim() !== "")
        payload.referralCode = form.referral.trim();

      const response = await fetch("http://monoxapi.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `🎉 Account created successfully! Referral Code: ${
            data.user?.referralCode || "Generated after login"
          }`
        );
        setForm({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          mobile: "",
          country: "",
          password: "",
          confirmPassword: "",
          referral: "",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 tracking-tight">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          You can create an account using your email or username. Registration is free!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "firstName", placeholder: "First Name", icon: <FaUser /> },
            { name: "lastName", placeholder: "Last Name", icon: <FaUser /> },
            { name: "username", placeholder: "Username", icon: <FaUser /> },
            { name: "email", placeholder: "Email", icon: <FaEnvelope />, type: "email" },
            { name: "mobile", placeholder: "Mobile Number", icon: <FaPhone />, type: "tel" },
          ].map((field) => (
            <div
              key={field.name}
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105"
            >
              {field.icon && <span className="text-gray-400 mr-2">{field.icon}</span>}
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          ))}

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
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password & Confirm Password */}
          {[
            { name: "password", placeholder: "Password", show: showPassword, setShow: setShowPassword },
            { name: "confirmPassword", placeholder: "Confirm Password", show: showConfirm, setShow: setShowConfirm },
          ].map((field) => (
            <div
              key={field.name}
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition transform hover:scale-105"
            >
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={field.show ? "text" : "password"}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full outline-none text-gray-700"
                required
              />
              <button
                type="button"
                onClick={() => field.setShow(!field.show)}
                className="ml-2 text-gray-500"
              >
                {field.show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          ))}

          {/* Referral Code */}
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

          <button
            type="submit"
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
