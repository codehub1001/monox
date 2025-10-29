import React, { useState, useEffect } from "react";
import {
  FaWallet,
  FaChartLine,
  FaUserCircle,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaBitcoin,
  FaPowerOff,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { io } from "socket.io-client";

// --- Profile Component ---
const Profile = ({ profile, loading }) => {
  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10 text-red-500">Profile not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto"
    >
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-yellow-400 text-6xl mb-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base text-center">{profile.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="font-semibold break-words">{profile.mobile || "Not provided"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Country</p>
          <p className="font-semibold">{profile.country || "N/A"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Wallet Balance</p>
          <p className="font-semibold">${profile.wallet?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Active Investments</p>
          <p className="font-semibold">{profile.investments?.length || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
          <p className="text-gray-500 text-sm">Referral Code</p>
          <p className="font-semibold text-yellow-500 break-words">{profile.referralCode}</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Metric Card ---
const MetricCard = ({ title, value, icon, actions }) => (
  <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-5 rounded-xl shadow flex flex-col justify-between transition-all">
    <div className="flex items-center justify-between">
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className="text-yellow-400 text-2xl">{icon}</div>
    </div>
    <h2 className="text-xl sm:text-2xl font-bold mt-2">{value}</h2>
    {actions && <div className="flex mt-3 space-x-2 flex-wrap">{actions}</div>}
  </motion.div>
);

const UserDashboard = () => {
  const [wallet, setWallet] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [btcPrice, setBtcPrice] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletModal, setWalletModal] = useState({ open: false, type: "" });
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  // --- Fetch dashboard data ---
  const fetchDashboardData = async () => {
    try {
      setLoadingDashboard(true);
      const [walletRes, txRes] = await Promise.all([
        axios.get("http://localhost:5000/api/wallet", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/wallet/transactions", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const balance = walletRes.data?.balance ?? 0;
      setWallet(balance);
      setTransactions(txRes.data || []);
      setProfile(prev => prev ? { ...prev, wallet: balance } : prev);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoadingDashboard(false);
    }
  };

  // --- Fetch profile ---
  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await axios.get("http://localhost:5000/api/users/me", { headers: { Authorization: `Bearer ${token}` } });
      const userData = res.data;
      setProfile({
        ...userData,
        wallet: profile?.wallet ?? 0,
        investments: userData.investments || [],
      });
      setInvestments(userData.investments || []);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  // --- Fetch BTC price ---
  const fetchBtcPrice = async () => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
      setBtcPrice(res.data.bitcoin.usd);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchProfile();
    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 60000);

    const socket = io("http://localhost:5000");
    if (profile?.id) {
      socket.on(`wallet-update-${profile.id}`, (data) => {
        setWallet(data.balance);
        setProfile(prev => prev ? { ...prev, wallet: data.balance } : prev);
      });
    }

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [profile?.id]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleWalletAction = async () => {
    if (!amount || isNaN(amount) || amount <= 0) return;
    try {
      const endpoint = walletModal.type === "deposit" ? "/wallet/deposit" : "/wallet/withdraw";
      await axios.post(`http://localhost:5000/api${endpoint}`, { amount: Number(amount) }, { headers: { Authorization: `Bearer ${token}` } });
      setWalletModal({ open: false, type: "" });
      setAmount("");
      fetchDashboardData();
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Transaction failed");
    }
  };

  const portfolioHistory = investments.map((inv, idx) => ({ date: `Day ${idx + 1}`, value: inv.amount + wallet }));

  if (loadingDashboard && view === "dashboard") return <p className="text-center mt-20 text-gray-500">Loading dashboard...</p>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 bg-white shadow-lg h-full w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          <h1 className="text-2xl font-bold text-yellow-400">Monox</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-600 text-xl"><FaTimes /></button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[{ name: "Dashboard", icon: <FaChartLine />, view: "dashboard" }, { name: "Profile", icon: <FaUserCircle />, view: "profile" }].map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.05 }} onClick={() => { setView(item.view); setSidebarOpen(false); }} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${view === item.view ? "bg-yellow-400 text-white shadow-md" : "text-gray-700 hover:bg-yellow-50"}`}>
              <span className="text-lg mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </motion.div>
          ))}
        </nav>
        <div className="border-t p-4">
          <button onClick={handleLogout} className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all"><FaPowerOff className="mr-2" /> Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="flex items-center justify-between bg-white px-4 sm:px-6 h-16 shadow sticky top-0 z-50">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-700 text-2xl z-50"><FaBars /></button>
            <FaBitcoin className="text-yellow-500 text-lg sm:text-xl" />
            <span className="font-semibold text-gray-700 text-sm sm:text-base">${btcPrice}</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-lg cursor-pointer" />
            <div onClick={() => setView("profile")} className="flex items-center cursor-pointer">
              <FaUserCircle className="text-gray-600 text-2xl" />
              <span className="ml-2 text-gray-700 font-medium hidden sm:inline">{profile?.firstName}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {view === "dashboard" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard title="Wallet Balance" value={`$${wallet.toLocaleString()}`} icon={<FaWallet />} actions={[
                  <button key="deposit" onClick={() => setWalletModal({ open: true, type: "deposit" })} className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500 text-xs sm:text-sm">Deposit</button>,
                  <button key="withdraw" onClick={() => setWalletModal({ open: true, type: "withdraw" })} className="bg-red-400 px-3 py-1 rounded text-white hover:bg-red-500 text-xs sm:text-sm">Withdraw</button>,
                ]}/>
                <MetricCard title="Active Investments" value={investments.length} icon={<FaArrowUp />} />
                <MetricCard title="Pending Transactions" value={transactions.filter(tx => tx.status === "pending").length} icon={<FaArrowDown />}/>
                <MetricCard title="Total Transactions" value={transactions.length} icon={<FaChartLine />}/>
              </div>

              <div className="bg-white p-4 rounded-xl shadow mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Portfolio Value</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={portfolioHistory}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-gray-700">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="py-2 px-3 text-left">Type</th>
                        <th className="py-2 px-3 text-left">Amount</th>
                        <th className="py-2 px-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id} className="border-b hover:bg-yellow-50 transition-all">
                          <td className="py-2 px-3">{tx.type}</td>
                          <td className="py-2 px-3">${tx.amount}</td>
                          <td className="py-2 px-3">{tx.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : <Profile profile={profile} loading={loadingProfile}/>}

          {walletModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl p-6 w-80">
                <h2 className="text-xl font-semibold mb-4">{walletModal.type === "deposit" ? "Deposit Funds" : "Withdraw Funds"}</h2>
                <input type="number" className="w-full border p-2 rounded mb-4" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setWalletModal({ open: false, type: "" })} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                  <button onClick={handleWalletAction} className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white">{walletModal.type === "deposit" ? "Deposit" : "Withdraw"}</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
