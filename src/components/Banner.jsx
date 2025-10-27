import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const carouselData = [
  {
    image:
      "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    title: "Trade Smarter with Monox Trades",
    subtitle:
      "Copy top traders, grow your crypto portfolio, and invest with confidence.",
  },
  {
    image:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    title: "Invest in Top Performing Cryptos",
    subtitle:
      "Monitor top traders and maximize your returns with smart investments.",
  },
  {
    image:
      "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    title: "Secure and Transparent Platform",
    subtitle: "Trade and invest with full transparency and real-time updates.",
  },
];

const cryptoIcons = [
  "https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/svg/color/btc.svg",
  "https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/svg/color/eth.svg",
  "https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/svg/color/bnb.svg",
  "https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/svg/color/ada.svg",
  "https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/svg/color/sol.svg",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const total = carouselData.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [total]);

  // Pre-generate coins with smaller sizes
  const coins = Array.from({ length: 50 }, (_, i) => ({
    icon: cryptoIcons[i % cryptoIcons.length],
    left: Math.random() * 100,
    size: 10 + Math.random() * 10, // smaller coins: 10-20px
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 10,
  }));

  return (
    <section className="relative w-full mt-12 h-[90vh] overflow-hidden rounded-t-[5rem] shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
      {/* Falling coins container */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {coins.map((coin, i) => (
          <img
            key={i}
            src={coin.icon}
            alt="coin"
            className="absolute"
            style={{
              left: `${coin.left}%`,
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              animation: `fall ${coin.duration}s linear ${coin.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Carousel slides */}
      {carouselData.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-[5rem]"
          />
          <div className="absolute inset-0 bg-black/50 z-10 rounded-t-[5rem]" />
          <div className="absolute z-30 left-6 md:left-16 top-1/2 -translate-y-1/2 text-white max-w-2xl space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90">{slide.subtitle}</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-lg font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-400 hover:text-black transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel arrows */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-white/80 text-black p-3 rounded-full shadow-lg hover:bg-white transition"
      >
        <FiChevronLeft size={28} />
      </button>
      <button
        onClick={() =>
          setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-white/80 text-black p-3 rounded-full shadow-lg hover:bg-white transition"
      >
        <FiChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {carouselData.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === current ? "bg-yellow-400" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity:1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity:1; }
        }
      `}</style>
    </section>
  );
};

export default Banner;
