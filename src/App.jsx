import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/faqs/FAQ'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Bottom from './pages/Bottom/Bottom'
import { useEffect } from 'react'
import { populateQuotes } from './indexedDBInit'
import QuoteMarquee from './components/marquee/QouteMarque'
import Header from './pages/Header/Header'
import TermCondition from './pages/TermCondition/TermCondition'
import PhotoGallery from './pages/PhotoGallery/PhotoGallery'
import Program from './pages/Program/Program'
import Announce from './pages/Donate/Announce'

import ConfessSection from './pages/Confess/ConfessSection'
import ThankfulPage from './pages/PaymentSuccess/ThankfulPage' // Fixed import name

import './App.css'
import Navbar from './components/Navbar/Navbar'

import Footer from './data/Footer/Footer'
import ConfessSection from './pages/Confess/ConfessSection'
import ThankfulPage from './pages/PaymentSuccess/ThankfulPage'



const App = () => {
   useEffect(() => {
    populateQuotes();
  }, []);

  return (
    <div className='app'>
      < Navbar />
      
      <Routes>
        < Route path='/' element={<Home/>} />
        < Route path='/about' element={<About/>} />
        < Route path='/contact' element={<Contact/>} />
         < Route path='/FAQs' element={<FAQ/>} /> 
          < Route path='/terms' element={<TermCondition/>} />
< Route path='/Program' element={<Program/>} />
 < Route path='/gallery' element={<PhotoGallery />} />
< Route path='/announce' element={<Announce />} />
< Route path='/confess' element={<ConfessSection/>} />
< Route path='/thanks' element={<ThankfulPage/>} />
          
          
        
       
        </Routes> 
      {/*  <Bottom /> */}
      <Footer />
        </div>
  )
}

export default App
