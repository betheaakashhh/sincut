import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/faqs/FAQ'

import './App.css'

// import Navbar from './components/Navbar/Navbar'

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

/*=========================================================================================================================
Protecting the routes based on authentication status
===========================================================================================================================*/ 
// Protected Route Component

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to main if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
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
          < Route path='/terms' element={<TermCondition/>} />

 < Route path='/gallery' element={<ProtectedRoute><PhotoGallery /></ProtectedRoute>} />
< Route path='/announce' element={<Announce />} />
< Route path='/main' element={<ProtectedRoute><Home1 /></ProtectedRoute>} />
< Route path='/confess' element={<ConfessSection/>} />
< Route path='/thanks' element={<ThankfulPage/>} />
<Route path = '/login' element= {<PublicRoute> <LoginPage /> </PublicRoute>} />
<Route path = '/signup' element= {<PublicRoute ><MultiStepRegistration /></PublicRoute>} />

          
          
        
       
        </Routes> 
      {/*  <Bottom /> */}
      
        </div>
  )
}

export default App;
