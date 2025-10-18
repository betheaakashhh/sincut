import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, setMenu] = useState("Home")
    const [sticky, setSticky] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [logoText, setLogoText] = useState("SinCUT")
    const [isScrolling, setIsScrolling] = useState(false)

    // Logo transformation texts
    const logoTransformations = [
        "SinCUT", "Karma", "Grace", "Peace", "Redemption", 
        "Forgiveness", "Hope", "Light", "Divine", "Sacred"
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setSticky(true)
                setIsScrolling(true)
            } else {
                setSticky(false)
                setIsScrolling(false)
            }
        }

        // Logo text transformation interval
        const logoInterval = setInterval(() => {
            if (!isScrolling) {
                const currentIndex = logoTransformations.indexOf(logoText)
                const nextIndex = (currentIndex + 1) % logoTransformations.length
                setLogoText(logoTransformations[nextIndex])
            }
        }, 3000)

        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearInterval(logoInterval)
        }
    }, [logoText, isScrolling])

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
        // Prevent body scroll when mobile menu is open
        if (!mobileMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }

    const handleNavClick = (menuItem) => {
        setMenu(menuItem)
        setMobileMenu(false)
        document.body.style.overflow = 'unset' // Restore scroll when menu item is clicked
    }

    // Close mobile menu when clicking on overlay background
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('mobile-nav-overlay')) {
            setMobileMenu(false)
            document.body.style.overflow = 'unset'
        }
    }

    return (
        <nav className={`divine-navbar ${sticky ? 'sticky' : ''} ${mobileMenu ? 'mobile-open' : ''}`}>
            {/* Heavenly Background Glow */}
            <div className="nav-heavenly-glow"></div>
            
            {/* Floating Particles */}
            <div className="nav-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            <div className="nav-container">
                {/* Animated Logo */}
                <div className="logo-container">
                    <h1 className={`divine-logo ${sticky ? 'scrolled' : ''}`}>
                        <span className="logo-text">{logoText}</span>
                        <div className="logo-glow"></div>
                        <div className="logo-sparkle">✨</div>
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <ul className="nav-links">
                    <li className={menu === "Home" ? "active" : ""}>
                        <Link to="/" onClick={() => handleNavClick("Home")}>
                            <span className="nav-icon">🏠</span>
                            Home
                            <div className="nav-glow"></div>
                        </Link>
                    </li>
                    <li className={menu === "About" ? "active" : ""}>
                        <Link to="/about" onClick={() => handleNavClick("About")}>
                            <span className="nav-icon">📖</span>
                            About
                            <div className="nav-glow"></div>
                        </Link>
                    </li>
                    <li className={menu === "Contact" ? "active" : ""}>
                        <Link to="/contact" onClick={() => handleNavClick("Contact")}>
                            <span className="nav-icon">💬</span>
                            Contact
                            <div className="nav-glow"></div>
                        </Link>
                    </li>
                    <li className={menu === "FAQs" ? "active" : ""}>
                        <Link to="/FAQs" onClick={() => handleNavClick("FAQs")}>
                            <span className="nav-icon">❓</span>
                            FAQs
                            <div className="nav-glow"></div>
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <div className={`menu-icon ${mobileMenu ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>

            {/* Mobile Navigation Overlay - Fixed Position */}
            <div 
                className={`mobile-nav-overlay ${mobileMenu ? 'active' : ''}`}
                onClick={handleOverlayClick}
            >
                <div className="mobile-nav-content">
                    {/* Close Button at Top */}
                    <div className="mobile-nav-header">
                        <div className="mobile-header-top">
                            <h2 className="mobile-logo">SinCUT</h2>
                            <button 
                                className="mobile-close-btn"
                                onClick={toggleMenu}
                                aria-label="Close menu"
                            >
                                <div className="close-icon">✕</div>
                            </button>
                        </div>
                        <div className="mobile-nav-glow"></div>
                        <p className="mobile-welcome-text">Welcome to your spiritual journey</p>
                    </div>
                    
                    {/* Navigation Links - Centered */}
                    <div className="mobile-nav-center">
                        <ul className="mobile-nav-links">
                            <li className={menu === "Home" ? "active" : ""}>
                                <Link to="/" onClick={() => handleNavClick("Home")}>
                                    <span className="nav-icon">🏠</span>
                                    <span className="nav-text">Home</span>
                                    <div className="mobile-glow"></div>
                                </Link>
                            </li>
                            <li className={menu === "About" ? "active" : ""}>
                                <Link to="/about" onClick={() => handleNavClick("About")}>
                                    <span className="nav-icon">📖</span>
                                    <span className="nav-text">About</span>
                                    <div className="mobile-glow"></div>
                                </Link>
                            </li>
                            <li className={menu === "Contact" ? "active" : ""}>
                                <Link to="/contact" onClick={() => handleNavClick("Contact")}>
                                    <span className="nav-icon">💬</span>
                                    <span className="nav-text">Contact</span>
                                    <div className="mobile-glow"></div>
                                </Link>
                            </li>
                            <li className={menu === "FAQs" ? "active" : ""}>
                                <Link to="/FAQs" onClick={() => handleNavClick("FAQs")}>
                                    <span className="nav-icon">❓</span>
                                    <span className="nav-text">FAQs</span>
                                    <div className="mobile-glow"></div>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Nav Footer */}
                    <div className="mobile-nav-footer">
                        <div className="scroll-indicator">
                            <div className="scroll-arrow">↓</div>
                            <p className="divine-quote">
                                "Your journey to peace begins here"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
