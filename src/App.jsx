import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import About from './components/AboutSeection';
import TradingSection from './components/Trading';
import Services from './components/Services';
import Subscribe from './components/Subscribe';
import HowToGetStarted from './components/HowToGetStarted';
import MirrorTrades from './pages/MirrorTrades';
import Planing from './pages/Planing';

import Contact from './pages/Contact';
import AboutUS from './pages/AboutUS';
import CoinSlider from './components/CoinSlider';
import Register from './pages/Register';
import Login from './pages/Login';
import CryptoTrading from './components/CryptoTrading';
import CopyTrading from './components/CopyTrading';
import ForexTrading from './components/ForexTrading';
import FuturesTrading from './components/FuturesTrading';
import StocksTrading from './components/StocksTrading';
import IndicesTrading from './components/IndicesTrading';

const App = () => {
  return (
    <Router>
      {/* Header stays outside Routes if you want it on all pages */}
      <Header />
      
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
      </Routes>
    </Router>
  );
};

export default App;
