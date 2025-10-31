import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaWallet,
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
  FaPlus,
  FaMinus,
  FaSignOutAlt,
  FaBars,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = "";
      if (activeTab === "users")
        url = "https://monoxapi.onrender.com/api/admin/users";
      if (activeTab === "deposits")
        url = "https://monoxapi.onrender.com/api/admin/deposits/pending";
      if (activeTab === "withdrawals")
        url = "https://monoxapi.onrender.com/api/admin/withdrawals/pending";
      if (activeTab === "investments")
        url = "https://monoxapi.onrender.com/api/admin/investments/active";

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (activeTab === "users") setUsers(data.users || []);
      if (activeTab === "deposits") setDeposits(data.deposits || []);
      if (activeTab === "withdrawals") setWithdrawals(data.withdrawals || []);
      if (activeTab === "investments") setInvestments(data.investments || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleAction = async (id, type, action, amount = null) => {
    try {
      let url = "";
      let options = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      };

      if (type === "wallet") {
        url = `https://monoxapi.onrender.com/api/admin/wallet/${id}/update`;
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify({
          type: action === "topup" ? "credit" : "debit",
          amount,
        });
      }

      if (type === "deposit") {
        url = `https://monoxapi.onrender.com/api/admin/deposits/${id}/${action}`;
      } else if (type === "withdraw") {
        url = `https://monoxapi.onrender.com/api/admin/withdrawals/${id}/${action}`;
      }

      const res = await fetch(url, options);
      if (!res.ok) {
        console.error("HTTP error:", res.status);
        return alert(`Server returned ${res.status} (${res.statusText})`);
      }

      const data = await res.json();
      if (!data.success) return alert(data.message);

      alert(data.message);
      fetchData();
    } catch (err) {
      console.error("handleAction error:", err);
      alert("Failed to perform action.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const statusBadge = (status) => {
    const colors = {
      PENDING: "bg-yellow-200 text-yellow-800",
      SUCCESS: "bg-green-200 text-green-800",
      FAILED: "bg-red-200 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          colors[status?.toUpperCase()] || "bg-gray-200 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  // Calculate progress percentage for investments
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();
    if (now >= end) return 100;
    if (now <= start) return 0;
    return Math.round(((now - start) / (end - start)) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar for mobile */}
      <div className="md:hidden bg-yellow-400 p-3 flex justify-between items-center text-white">
        <h2 className="text-lg font-bold">Monox Admin</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimesCircle size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-yellow-400 text-white flex flex-col p-4 transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center hidden md:block">
          Monox Admin
        </h2>
        <nav className="space-y-3 flex-1">
          <button
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "users"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaUsers className="inline-block mr-2" /> Users
          </button>
          <button
            onClick={() => {
              setActiveTab("deposits");
              setSidebarOpen(false);
            }}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "deposits"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaMoneyBillWave className="inline-block mr-2" /> Deposits
          </button>
          <button
            onClick={() => {
              setActiveTab("withdrawals");
              setSidebarOpen(false);
            }}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "withdrawals"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaWallet className="inline-block mr-2" /> Withdrawals
          </button>
          <button
            onClick={() => {
              setActiveTab("investments");
              setSidebarOpen(false);
            }}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "investments"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaMoneyBillWave className="inline-block mr-2" /> Investments
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 mt-2 md:mt-0 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : (
          <>
            {/* Header */}
            <div className="mb-5 flex justify-between items-center flex-wrap gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                {activeTab} Management
              </h1>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleString()}
              </span>
            </div>

            {/* USERS TABLE */}
            {activeTab === "users" && (
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full text-sm md:text-base text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Wallet</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-2 px-4">{user.username}</td>
                          <td className="py-2 px-4 break-all">{user.email}</td>
                          <td className="py-2 px-4">
                            {user.wallet?.balance || 0} USD
                          </td>
                          <td className="py-2 px-4">{user.role}</td>
                          <td className="py-2 px-4 flex flex-wrap gap-2 items-center">
                            <input
                              type="number"
                              placeholder="Amount"
                              value={walletAmount[user.id] || ""}
                              onChange={(e) =>
                                setWalletAmount({
                                  ...walletAmount,
                                  [user.id]: e.target.value,
                                })
                              }
                              className="w-20 px-2 py-1 border rounded text-sm"
                            />
                            <button
                              onClick={() => {
                                const amount = parseFloat(walletAmount[user.id]);
                                if (!amount || amount <= 0)
                                  return alert("Invalid amount");
                                handleAction(user.id, "wallet", "topup", amount);
                                setWalletAmount({
                                  ...walletAmount,
                                  [user.id]: "",
                                });
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                            >
                              <FaPlus /> Top Up
                            </button>
                            <button
                              onClick={() => {
                                const amount = parseFloat(walletAmount[user.id]);
                                if (!amount || amount <= 0)
                                  return alert("Invalid amount");
                                if (amount > (user.wallet?.balance || 0))
                                  return alert("Insufficient balance");
                                handleAction(user.id, "wallet", "debit", amount);
                                setWalletAmount({
                                  ...walletAmount,
                                  [user.id]: "",
                                });
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                            >
                              <FaMinus /> Debit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-gray-500 py-4"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* DEPOSITS TABLE */}
            {activeTab === "deposits" && (
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full text-sm md:text-base text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.length > 0 ? (
                      deposits.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-2 px-4">{tx.user.username}</td>
                          <td className="py-2 px-4">{tx.amount} USD</td>
                          <td className="py-2 px-4">{statusBadge(tx.status)}</td>
                          <td className="py-2 px-4 flex gap-2">
                            {tx.status.toLowerCase() === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleAction(tx.id, "deposit", "approve")
                                  }
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction(tx.id, "deposit", "decline")
                                  }
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-gray-500 py-4"
                        >
                          No pending deposits.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* WITHDRAWALS TABLE */}
            {activeTab === "withdrawals" && (
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full text-sm md:text-base text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.length > 0 ? (
                      withdrawals.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-2 px-4">{tx.user.username}</td>
                          <td className="py-2 px-4">{tx.amount} USD</td>
                          <td className="py-2 px-4">{statusBadge(tx.status)}</td>
                          <td className="py-2 px-4 flex gap-2">
                            {tx.status.toLowerCase() === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleAction(tx.id, "withdraw", "approve")
                                  }
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction(tx.id, "withdraw", "decline")
                                  }
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-gray-500 py-4"
                        >
                          No pending withdrawals.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* INVESTMENTS TABLE */}
            {activeTab === "investments" && (
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full text-sm md:text-base text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Plan</th>
                      <th className="py-3 px-4 text-left">Invested Amount</th>
                      <th className="py-3 px-4 text-left">Current Amount</th>
                      <th className="py-3 px-4 text-left">Profit</th>
                      <th className="py-3 px-4 text-left">Progress</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments.length > 0 ? (
                      investments.map((inv) => {
                        const profit = inv.currentAmount - inv.investedAmount;
                        const progress = calculateProgress(
                          inv.startDate,
                          inv.endDate
                        );
                        return (
                          <tr
                            key={inv.id}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="py-2 px-4">{inv.user?.username}</td>
                            <td className="py-2 px-4">{inv.plan?.name}</td>
                            <td className="py-2 px-4">{inv.investedAmount} USD</td>
                            <td className="py-2 px-4">{inv.currentAmount} USD</td>
                            <td className="py-2 px-4">
                              {profit.toFixed(2)} USD
                            </td>
                            <td className="py-2 px-4 w-48">
                              <div className="bg-gray-200 rounded-full h-3 w-full">
                                <div
                                  className={`bg-green-500 h-3 rounded-full`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">
                                {progress}%
                              </span>
                            </td>
                            <td className="py-2 px-4">{statusBadge(inv.status)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-gray-500 py-4">
                          No active investments.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
