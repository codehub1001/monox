import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaChartLine, FaClock, FaDollarSign, FaArrowRight } from "react-icons/fa";

const InvestmentPlans = ({ token }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activatingPlan, setActivatingPlan] = useState(null);

  // ✅ Fetch all investment plans
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://monoxapi.onrender.com/api/investments/plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(res.data.plans || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch investment plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ✅ Activate investment plan
  const handleActivate = async (plan) => {
    try {
      setActivatingPlan(plan.id);

      // ✅ Ensure correct payload
      const payload = {
        planId: Number(plan.id),
        amount: Number(plan.amount), // backend expects amount
      };

      const res = await axios.post("https://monoxapi.onrender.com/api/investments", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Investment plan activated successfully!");
    } catch (err) {
      console.error("Activation error:", err);
      toast.error(err.response?.data?.error || "Failed to activate plan");
    } finally {
      setActivatingPlan(null);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading investment plans...
      </p>
    );

  if (plans.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No investment plans available.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="relative bg-gradient-to-br from-white to-yellow-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300"
        >
          {/* Decorative background glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-200/10 to-transparent blur-xl -z-10"></div>

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
            <FaChartLine className="text-yellow-500 text-2xl" />
          </div>

          <div className="space-y-2 mb-4 text-gray-700">
            <p className="flex items-center gap-2">
              <FaDollarSign className="text-yellow-500" /> Minimum:{" "}
              <span className="font-semibold">${plan.amount}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-yellow-500" /> Duration:{" "}
              <span className="font-semibold">{plan.duration} days</span>
            </p>
            <p className="flex items-center gap-2">
              <FaArrowRight className="text-yellow-500" /> Daily Return:{" "}
              <span className="font-semibold">
                {plan.dailyReturn
                  ? `${(plan.dailyReturn * 100).toFixed(1)}%`
                  : `${plan.profitRate || 0}%`}
              </span>
            </p>
          </div>

          <button
            onClick={() => handleActivate(plan)}
            disabled={activatingPlan === plan.id}
            className={`w-full py-2.5 mt-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              activatingPlan === plan.id
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {activatingPlan === plan.id ? (
              <span className="animate-pulse">Activating...</span>
            ) : (
              <>
                <span>Activate Plan</span>
                <FaArrowRight className="text-white" />
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default InvestmentPlans;
