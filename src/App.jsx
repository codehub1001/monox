import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Banner from './components/Banner';
import About from './components/AboutSeection';
import TradingSection from './components/Trading';
import Services from './components/Services';
import Subscribe from './components/Subscribe';
import HowToGetStarted from './components/HowToGetStarted';
import CoinSlider from './components/CoinSlider';
import MirrorTrades from './pages/MirrorTrades';
import Planing from './pages/Planing';
import Contact from './pages/Contact';
import AboutUS from './pages/AboutUS';
import Register from './pages/Register';
import Login from './pages/Login';
import CryptoTrading from './components/CryptoTrading';
import CopyTrading from './components/CopyTrading';
import ForexTrading from './components/ForexTrading';
import FuturesTrading from './components/FuturesTrading';
import StocksTrading from './components/StocksTrading';
import IndicesTrading from './components/IndicesTrading';
import UserDashboard from './pages/UserDashboard';
import Profile from './components/Profile';
import AdminDashboard from './pages/AdminDashboard';

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Header/Footer on these paths
  const hideLayout = ['/userdashboard', '/admindashboard'];

  return (
    <>
      {!hideLayout.includes(location.pathname) && <Header />}
      {children}
      {!hideLayout.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <About />
                <TradingSection />
                <Services />
                <Subscribe />
                <HowToGetStarted />
                <CoinSlider/>
              </>
            }
          />
          <Route path="/mirror-trades" element={<MirrorTrades />} />
          <Route path="/planning-services" element={<Planing />} />
          <Route path="/about" element={<AboutUS/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cryto-trading" element={<CryptoTrading/>} />
          <Route path="/copy-trading" element={<CopyTrading/>} />
          <Route path="/forex-trading" element={<ForexTrading/>} />
          <Route path="/indices-trading" element={<IndicesTrading/>} />
          <Route path="/stocks-trading" element={<StocksTrading/>} />
          <Route path="/futures-trading" element={<FuturesTrading/>} />
          <Route path="/userdashboard" element={<UserDashboard/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
