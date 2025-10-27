import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CoinSlider = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // 1. Crypto prices (Coingecko)
      const cryptoRes = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 5,
            page: 1,
            sparkline: false,
          },
        }
      );

      // 2. FX rates (USD base)
      const fxRes = await axios.get("https://api.exchangerate.host/latest", {
        params: {
          base: "USD",
          symbols: "EUR,GBP,JPY,AUD",
        },
      });

      const fxRates = fxRes.data?.rates || {};
      const fxData = Object.entries(fxRates).map(([key, value]) => ({
        symbol: `USD/${key}`,
        price: value,
        change: 0,
        type: "fx",
      }));

      // 3. Commodities (sample values as free alternative)
      const commoditiesData = [
        { symbol: "XAU/USD", price: 1975.5, change: 0, type: "commodity" }, // Gold
        { symbol: "XAG/USD", price: 23.4, change: 0, type: "commodity" },   // Silver
        { symbol: "WTI/USD", price: 86.2, change: 0, type: "commodity" },   // Oil
      ];

      // Merge all
      const formattedData = [
        ...cryptoRes.data.map((c) => ({
          symbol: c.symbol.toUpperCase() + "/USD",
          price: c.current_price,
          change: c.price_change_percentage_24h,
          image: c.image,
          type: "crypto",
        })),
        ...fxData,
        ...commoditiesData,
      ];

      // Duplicate for smooth scroll
      setData([...formattedData, ...formattedData]);
    } catch (err) {
      console.error("Error fetching market data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-50 border-t border-b border-gray-200 py-2">
      <motion.div
        className="flex gap-4 px-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {data.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="bg-white/80 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 min-w-[140px] flex items-center gap-2 text-xs"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.symbol}
                className="w-5 h-5 object-contain"
              />
            )}
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-gray-900">{item.symbol}</span>
              <span className="text-gray-700">
                ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {item.change !== 0 && (
              <span className={`ml-auto font-medium ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {item.change >= 0 ? `+${item.change.toFixed(2)}%` : `${item.change.toFixed(2)}%`}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CoinSlider;
