import React, { useEffect, useState } from 'react'
import menu_icon from '../../assets/menu.png'
import close_icon from '../../assets/close.png'
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
        }, 3000) // Change every 3 seconds

        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearInterval(logoInterval)
        }
    }, [logoText, isScrolling])

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    const handleNavClick = (menuItem) => {
        setMenu(menuItem)
        setMobileMenu(false)
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

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${mobileMenu ? 'active' : ''}`}>
                <div className="mobile-nav-content">
                    <div className="mobile-nav-header">
                        <h2 className="mobile-logo">SinCUT</h2>
                        <div className="mobile-nav-glow"></div>
                    </div>
                    
                    <ul className="mobile-nav-links">
                        <li className={menu === "Home" ? "active" : ""}>
                            <Link to="/" onClick={() => handleNavClick("Home")}>
                                <span className="nav-icon">🏠</span>
                                Home
                                <div className="mobile-glow"></div>
                            </Link>
                        </li>
                        <li className={menu === "About" ? "active" : ""}>
                            <Link to="/about" onClick={() => handleNavClick("About")}>
                                <span className="nav-icon">📖</span>
                                About
                                <div className="mobile-glow"></div>
                            </Link>
                        </li>
                        <li className={menu === "Contact" ? "active" : ""}>
                            <Link to="/contact" onClick={() => handleNavClick("Contact")}>
                                <span className="nav-icon">💬</span>
                                Contact
                                <div className="mobile-glow"></div>
                            </Link>
                        </li>
                        <li className={menu === "FAQs" ? "active" : ""}>
                            <Link to="/FAQs" onClick={() => handleNavClick("FAQs")}>
                                <span className="nav-icon">❓</span>
                                FAQs
                                <div className="mobile-glow"></div>
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Nav Footer */}
                    <div className="mobile-nav-footer">
                        <p className="divine-quote">
                            "Your journey to peace begins here"
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
