// App.js - Fix the /main route structure
import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom' // Add Outlet
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/faqs/FAQ'
import './App.css'
import { useEffect } from 'react'
import { populateQuotes } from './indexedDBInit'
import TermCondition from './pages/TermCondition/TermCondition'
import PhotoGallery from './pages/PhotoGallery/PhotoGallery'
import Announce from './pages/Donate/Announce'
import ConfessSection from './pages/Confess/ConfessSection'
import ThankfulPage from './pages/PaymentSuccess/ThankfulPage'
import HeroSectionTest from './pages/Hero/HeroSectionTest'
import LoginPage from './pages/LoginPage/LoginPage'
import MultiStepRegistration from './pages/SignUp/MultiStepRegistration'
import Home1 from './pages/Home1/Home.1'
import AccountSetting from './pages/AccountSetting/CoinDashboard'
import DebugAuth from './data/DebugAuth'

import CoinDashboard from './pages/AccountSetting/CoinDashboard'
import AccountSettings from './pages/AccountSetting/AccountSettings'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return !token ? children : <Navigate to="/main" />;
};

const App = () => {
  useEffect(() => {
    populateQuotes();
  }, []);

  return (
    <div className='app'>
      <Routes>
        < Route path='/' element={<Home />} />
        < Route path='/about' element={<About/>} />
        < Route path='/contact' element={<Contact/>} />
        < Route path='/FAQs' element={<FAQ/>} /> 
        < Route path='/dashboard' element={<CoinDashboard />} />
        < Route path='/accountsetting' element={<AccountSettings />} />
        < Route path='/terms' element={<TermCondition />} />
        < Route path='/gallery' element={<ProtectedRoute><PhotoGallery /></ProtectedRoute>} />
        < Route path='/announce' element={<Announce />} />
        
        {/* FIXED: Main route with nested routes */}
        <Route path="/main" element={
          <ProtectedRoute>
            <Home1/>
            <Outlet /> 
          </ProtectedRoute>
        }>
          <Route path="thankful" element={<ThankfulPage/>} />
          {/* Add other nested routes here if needed */}
        </Route>
        
        <Route path='/confess' element={<ConfessSection/>} />
        <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute><MultiStepRegistration /></PublicRoute>} />
        <Route path='/debug-auth' element={<DebugAuth />} />
        
      </Routes>
    </div>
  )
}

export default App;