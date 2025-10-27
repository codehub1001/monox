import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Banner from './components/Banner';
import About from './components/About';
import TradingSection from './components/Trading';
import Services from './components/Services';
import Subscribe from './components/Subscribe';
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route 
        path='/'
        element={
          <>
          <Header/>
          <Banner/>
          <About/>
          <TradingSection/>
          <Services/>
          <Subscribe/>
          </>
        }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App