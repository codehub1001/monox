import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegSquare } from "react-icons/fa";

const features = [
  {
    id: "01",
    title: "Empowering Traders",
    desc: "We help traders of all experience levels thrive with data-driven tools, education, and insights.",
  },
  {
    id: "02",
    title: "Operational Excellence",
    desc: "Our systems optimize performance, accuracy, and growth for a seamless trading experience.",
  },
  {
    id: "03",
    title: "Smart Innovation",
    desc: "We integrate AI, automation, and analytics to revolutionize trading across global markets.",
  },
  {
    id: "04",
    title: "Risk Management",
    desc: "We protect every trade with advanced security and intelligent portfolio risk controls.",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#000] py-24 px-6 md:px-12 lg:px-20 overflow-hidden text-white">
      {/* Animated Background Shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(212,175,55,0.12),transparent_70%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,215,0,0.1),transparent_70%)] animate-pulse-slow"></div>

      <motion.div
        className="relative max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.div
          className="inline-block mb-5 px-5 py-2 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-semibold border border-yellow-500/30"
          variants={cardVariants}
        >
          About Monox Trade
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white drop-shadow-[0_0_15px_rgba(245,215,123,0.3)]"
          variants={cardVariants}
        >
          Empowering Traders of All <br className="hidden md:block" />
          Experience Levels
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-10"
          variants={cardVariants}
        >
          Monox Trade redefines the digital trading landscape with cutting-edge
          innovation, real-time analytics, and gold-standard security — empowering
          traders to trade confidently and profitably.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          variants={cardVariants}
        >
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold px-8 py-3 rounded-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(245,215,123,0.4)] transition flex items-center gap-2">
            Discover more <FaArrowRight />
          </button>
          <button className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 transition">
            Let’s talk <FaRegSquare size={14} />
          </button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {features.map((item) => (
            <motion.div
              key={item.id}
              className="relative group p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-yellow-400/20 hover:border-yellow-400/40 shadow-[0_0_20px_rgba(245,215,123,0.08)] hover:shadow-[0_0_35px_rgba(245,215,123,0.25)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03]"
              variants={cardVariants}
            >
              {/* ID Number */}
              <span className="absolute top-5 right-6 text-yellow-600/20 text-5xl font-extrabold group-hover:text-yellow-400/40 transition">
                {item.id}
              </span>

              {/* Icon */}
              <div className="bg-yellow-400/10 p-3 w-fit rounded-full mb-6 shadow-inner group-hover:bg-yellow-400/20 transition">
                <FaRegSquare size={20} className="text-yellow-400" />
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Glow Animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
