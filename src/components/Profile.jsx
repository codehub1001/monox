import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaLock, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    country: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ ...res.data, password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error fetching profile:", err);
      alert("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    if (form.password && form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      setUpdating(false);
      return;
    }

    try {
      const payload = { firstName: form.firstName, lastName: form.lastName, mobile: form.mobile, country: form.country };
      if (form.password) payload.password = form.password;

      const res = await axios.put("http://localhost:5000/api/users/me", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-between items-center">
          My Profile
          <button onClick={handleLogout} className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* First Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full outline-none text-gray-700" required />
          </div>

          {/* Last Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full outline-none text-gray-700" required />
          </div>

          {/* Username - readonly */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
            <FaUser className="text-gray-400 mr-2" />
            <input type="text" name="username" value={form.username} readOnly className="w-full outline-none text-gray-700 bg-gray-100 cursor-not-allowed" />
          </div>

          {/* Email - readonly */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input type="email" name="email" value={form.email} readOnly className="w-full outline-none text-gray-700 bg-gray-100 cursor-not-allowed" />
          </div>

          {/* Mobile */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input type="text" name="mobile" value={form.mobile} onChange={handleChange} className="w-full outline-none text-gray-700" />
          </div>

          {/* Country */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FaGlobe className="text-gray-400 mr-2" />
            <input type="text" name="country" value={form.country} onChange={handleChange} className="w-full outline-none text-gray-700" />
          </div>

          {/* Referral Code - readonly */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
            <FaGift className="text-gray-400 mr-2" />
            <input type="text" name="referralCode" value={form.referralCode} readOnly className="w-full outline-none text-gray-700 bg-gray-100 cursor-not-allowed" />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input type="password" name="password" placeholder="New Password (optional)" value={form.password} onChange={handleChange} className="w-full outline-none text-gray-700" />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input type="password" name="confirmPassword" placeholder="Confirm New Password" value={form.confirmPassword} onChange={handleChange} className="w-full outline-none text-gray-700" />
          </div>

          <button type="submit" className={`w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg ${updating ? "opacity-50 cursor-not-allowed" : ""}`} disabled={updating}>
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
