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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = "";
      if (activeTab === "users") url = "http://localhost:5000/api/admin/users";
      if (activeTab === "deposits")
        url = "http://localhost:5000/api/admin/deposits/pending";
      if (activeTab === "withdrawals")
        url = "http://localhost:5000/api/admin/withdrawals/pending";

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (activeTab === "users") setUsers(data.users || []);
      if (activeTab === "deposits") setDeposits(data.deposits || []);
      if (activeTab === "withdrawals") setWithdrawals(data.withdrawals || []);
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

      // Wallet top-up or debit
      if (type === "wallet") {
        url = `http://localhost:5000/api/admin/wallet/${id}/update`;
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify({
          type: action === "topup" ? "credit" : "debit",
          amount,
        });
      }

      // Deposit or Withdraw approve/decline
      if (type === "deposit" || type === "withdraw") {
        url = `http://localhost:5000/api/admin/${type}/${id}/${action}`;
        options.method = "POST";
      }

      const res = await fetch(url, options);
      const data = await res.json();

      if (!data.success) return alert(data.message);
      alert(data.message);
      fetchData();
    } catch (err) {
      console.error(err);
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
      APPROVED: "bg-green-200 text-green-800",
      DECLINED: "bg-red-200 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          colors[status.toUpperCase()] || "bg-gray-200 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-400 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Monox Admin</h2>
        <nav className="space-y-3 flex-1">
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "users"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaUsers className="inline-block mr-2" /> Users
          </button>
          <button
            onClick={() => setActiveTab("deposits")}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "deposits"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaMoneyBillWave className="inline-block mr-2" /> Deposits
          </button>
          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "withdrawals"
                ? "bg-white text-yellow-500"
                : "hover:bg-yellow-500/20"
            }`}
          >
            <FaWallet className="inline-block mr-2" /> Withdrawals
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
      <main className="flex-1 p-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Users Table */}
            {activeTab === "users" && (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Wallet Balance</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Wallet Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{user.username}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">
                          {user.wallet?.balance || 0} USD
                        </td>
                        <td className="py-2 px-4">{user.role}</td>
                        <td className="py-2 px-4 flex gap-2 items-center">
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
                            className="w-20 px-2 py-1 border rounded"
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
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
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
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                          >
                            <FaMinus /> Debit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Deposits Table */}
            {activeTab === "deposits" && (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((tx) => (
                      <tr key={tx.id} className="border-b hover:bg-gray-50">
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Withdrawals Table */}
            {activeTab === "withdrawals" && (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((tx) => (
                      <tr key={tx.id} className="border-b hover:bg-gray-50">
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
                    ))}
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
