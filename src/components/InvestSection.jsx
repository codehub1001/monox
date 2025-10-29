import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import InvestmentPlans from "../pages/InvestmentPlans";
import { FaChartLine, FaCalendarAlt, FaClock } from "react-icons/fa";

const InvestSection = ({ token }) => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/investments/my-investments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestments(res.data.investments);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch investments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your investments...</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ===== User's Current Investments ===== */}
      {investments.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-tight">
            Your Active Investments
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investments.map((inv) => {
              const startDate = new Date(inv.startDate);
              const endDate = inv.endDate ? new Date(inv.endDate) : null;
              const now = new Date();
              const totalDays = endDate
                ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
                : null;
              const elapsedDays = Math.ceil(
                (now - startDate) / (1000 * 60 * 60 * 24)
              );
              const progress = totalDays
                ? Math.min((elapsedDays / totalDays) * 100, 100)
                : null;

              return (
                <div
                  key={inv.id}
                  className={`bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1 ${
                    !inv.isActive ? "opacity-70" : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        {inv.plan.name}
                      </h3>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          inv.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {inv.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="flex items-center gap-2">
                        <FaChartLine className="text-yellow-500" />
                        <span>
                          <strong>Invested:</strong> $
                          {inv.investedAmount.toLocaleString()}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaChartLine className="text-green-500" />
                        <span>
                          <strong>Current:</strong> $
                          {inv.currentAmount.toLocaleString()}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        <span>
                          <strong>Daily Return:</strong>{" "}
                          {(inv.plan.dailyReturn * 100).toFixed(1)}%
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-purple-500" />
                        <span>
                          <strong>Duration:</strong>{" "}
                          {startDate.toLocaleDateString()} -{" "}
                          {endDate ? endDate.toLocaleDateString() : "Unlimited"}
                        </span>
                      </p>
                    </div>

                    {progress !== null && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-700"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right font-medium">
                          {progress.toFixed(0)}% Complete
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You have no active investments yet.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Start your first investment below.
          </p>
        </div>
      )}

      {/* ===== Available Investment Plans ===== */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Explore Investment Plans
        </h2>
        <InvestmentPlans token={token} />
      </div>
    </div>
  );
};

export default InvestSection;
