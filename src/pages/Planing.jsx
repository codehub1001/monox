import React from "react";
import {
  FaBriefcase,
  FaPiggyBank,
  FaChartLine,
  FaFileInvoiceDollar,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaBriefcase className="text-yellow-500 w-8 h-8" />,
    title: "Business Planning Services",
    description:
      "Strategic business planning to help you grow, optimize operations, and maximize profits.",
  },
  {
    icon: <FaPiggyBank className="text-yellow-500 w-8 h-8" />,
    title: "Financial Planning Services",
    description:
      "Comprehensive financial advice to manage investments, budgeting, and wealth building.",
  },
  {
    icon: <FaClock className="text-yellow-500 w-8 h-8" />,
    title: "Retirement Planning Services",
    description:
      "Ensure a secure and comfortable retirement with our expert planning solutions.",
  },
  {
    icon: <FaFileInvoiceDollar className="text-yellow-500 w-8 h-8" />,
    title: "Tax Planning Services",
    description:
      "Minimize tax liabilities and maximize returns with our professional tax strategies.",
  },
  {
    icon: <FaChartLine className="text-yellow-500 w-8 h-8" />,
    title: "Investment Planning Services",
    description:
      "Optimize your investment portfolio with expert advice on crypto, stocks, and more.",
  },
  {
    icon: <FaFileAlt className="text-yellow-500 w-8 h-8" />,
    title: "Estate Planning Services",
    description:
      "Protect your assets and plan for inheritance with our detailed estate strategies.",
  },
];

const Planning = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Planning Services
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          At Monox Trades, we offer a range of planning services tailored to help
          you achieve financial success, secure your future, and grow your wealth.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-start transform transition hover:scale-105 hover:shadow-2xl duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planning;
