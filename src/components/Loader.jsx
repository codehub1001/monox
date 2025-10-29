import React from "react";
import { motion } from "framer-motion";
import { FaBitcoin, FaEthereum, FaDollarSign } from "react-icons/fa";

const coins = [
  { icon: <FaBitcoin />, color: "text-yellow-400" },
  { icon: <FaEthereum />, color: "text-purple-500" },
  { icon: <FaDollarSign />, color: "text-green-400" },
];

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 z-50">
      {/* Orbiting Coins */}
      <div className="relative w-44 h-44 mb-8">
        {coins.map((coin, index) => (
          <motion.div
            key={index}
            className={`absolute text-5xl sm:text-6xl ${coin.color} drop-shadow-lg`}
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            animate={{
              rotate: [0, 360],
              x: [
                0,
                Math.cos((index * 2 * Math.PI) / coins.length) * 70,
                0,
              ],
              y: [
                0,
                Math.sin((index * 2 * Math.PI) / coins.length) * 70,
                0,
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + index * 0.5,
              ease: "easeInOut",
            }}
          >
            {coin.icon}
          </motion.div>
        ))}
      </div>

      {/* Logo/Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [20, 0, 20] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="text-yellow-400 text-3xl sm:text-4xl font-extrabold mb-6 drop-shadow-lg"
      >
        Monox Trades
      </motion.h2>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 3 + 2;
          const delay = Math.random() * 2;
          const xMove = Math.random() * 30 - 15;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-yellow-400 opacity-60"
              style={{
                width: size,
                height: size,
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                filter: "blur(1px)",
              }}
              animate={{
                y: ["0%", "100%"],
                x: [0, xMove],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Bouncing Glow Dots */}
      <div className="flex space-x-3 mt-14">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: ["0%", "-50%", "0%"], scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2, ease: "easeInOut" }}
            className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
