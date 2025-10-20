import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/faqs/FAQ'
import TermCondition from './pages/TermCondition/TermCondition'
import PhotoGallery from './pages/PhotoGallery/PhotoGallery'
import Program from './pages/Program/Program'
import Announce from './pages/Donate/Announce'
import ConfessSection from './pages/Confess/ConfessSection'
import ThankfulPage from './pages/PaymentSuccess/Thankfulpage' // Fixed import name

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './data/Footer/Footer'
import { useEffect } from 'react'
import { populateQuotes } from './indexedDBInit'

const App = () => {
  useEffect(() => {
    populateQuotes();
  }, []);

  return (
    <Router>
      <div className='app'>
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/faqs' element={<FAQ />} />
            <Route path='/terms' element={<TermCondition />} />
            <Route path='/program' element={<Program />} />
            <Route path='/gallery' element={<PhotoGallery />} />
            <Route path='/announce' element={<Announce />} />
            <Route path='/confess' element={<ConfessSection />} />
            <Route path='/thanks' element={<ThankfulPage />} />
            
            {/* Optional: 404 page */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

// Simple 404 component (optional)
const NotFound = () => {
  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center',
      minHeight: '50vh'
    }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}

export default App