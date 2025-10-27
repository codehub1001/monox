import React from "react";
import { FaEnvelope } from "react-icons/fa";

const Subscribe = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between rounded-3xl bg-[#f7fbff] shadow-md p-8 lg:p-12 relative overflow-hidden">
        {/* Left Side Text */}
        <div className="max-w-xl z-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Subscribe to our mailing list & stay up to date
          </h2>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            At Bip Trades, we believe in empowering traders of all experience
            levels by providing a seamless platform for copy trading.
          </p>

          {/* Email Form */}
          <form className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:space-x-3 justify-center lg:justify-start">
            <div className="flex items-center w-full sm:w-72 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 text-sm text-gray-700 focus:outline-none bg-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="mt-8 lg:mt-0 lg:ml-10">
          <img
            src='https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt="Subscribe illustration"
            className="w-[320px] sm:w-[380px] lg:w-[420px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
