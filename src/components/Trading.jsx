import React from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaBitcoin,
  FaGlobe,
  FaChartBar,
  FaChartPie,
  FaArrowRight,
} from "react-icons/fa";

const tradingOptions = [
  {
    title: "Copy Trading",
    description:
      "Copy the strategies of successful traders, track their performance, and watch your investments grow with minimal effort.",
    icon: <FaChartLine className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Crypto Trading",
    description:
      "Our crypto experts are at the forefront of this rapidly evolving market, helping you gain from the volatility and potential of digital assets.",
    icon: <FaBitcoin className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Forex Trading",
    description:
      "Our top forex traders navigate currency pairs with precision, allowing you to capitalize on global currency fluctuations.",
    icon: <FaGlobe className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Indices Trading",
    description:
      "Invest in the broader market without the need for complex analysis. Follow our leading indices traders who specialize in maximizing returns from market indices.",
    icon: <FaChartBar className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Futures Trading",
    description:
      "Futures trading offers a dynamic way to engage with the financial markets and diversify your investment portfolio.",
    icon: <FaChartPie className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Stocks Trading",
    description:
      "Our stock trading experts consistently outperform the market, and with copy trading, you can share in their success.",
    icon: <FaChartLine className="text-yellow-500 text-4xl" />,
  },
];

const TradingSection = () => {
  return (
    <section className="relative bg-[#faf7f1] text-gray-900 py-20 px-6 md:px-16 overflow-hidden">
      {/* Gold overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/40 to-transparent pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center mb-14 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-yellow-600"
        >
          Mirror Trades
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold mt-3 text-gray-800"
        >
          Unlock Success with a Single Click
        </motion.h3>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Choose from our professional trading categories designed to help you
          grow and diversify your portfolio effortlessly.
        </p>
      </div>

      {/* Trading Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {tradingOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group bg-white border border-yellow-200 rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] hover:border-yellow-500 transition-all duration-300"
          >
            <div className="mb-4">{option.icon}</div>
            <h4 className="text-2xl font-bold text-yellow-600 mb-3">
              {option.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {option.description}
            </p>

            <button className="mt-6 flex items-center gap-2 text-yellow-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
              Learn More <FaArrowRight />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TradingSection;
