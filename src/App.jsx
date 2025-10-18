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
          
        
       
        </Routes> 
      {/*  <Bottom /> */}
        </div>
  )
}

export default App