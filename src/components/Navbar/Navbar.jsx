import React, { useEffect, useState } from 'react'
import menu_icon from '../../assets/menu.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {

    const [menu, setMenu] = useState("Home")
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        window.scrollY > 10 ? setSticky(true) : setSticky(false);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const [mobileMenu, setMobileMenu] = useState(false);
    const toggleMenu = () =>{
     mobileMenu? setMobileMenu(false) : setMobileMenu(true);  
      };
      
       
  return (
    
    <nav className={`container ${sticky ? 'dark-mode': ''}`}>
      <h1>SinCUT</h1>
      <ul className={mobileMenu?'':'mobile-menu'}>
        <li className={menu==="Home"?"active":""} onClick={()=>{setMenu("Home");setMobileMenu(false);}}><Link to="/">Home</Link></li>
        <li className={menu==="About"?"active":""} onClick={()=>{setMenu("About"); setMobileMenu(false);}}><Link to="/about">About</Link></li>
        <li className={menu==="Contact"?"active":""} onClick={()=>{setMenu("Contact"); setMobileMenu(false);}}><Link to="/contact">Contact</Link></li>
        <li className={menu==="FAQs"?"active":""} onClick={()=>{setMenu("FAQs"); setMobileMenu(false);}}><Link to="/FAQs">FAQs</Link></li>
      </ul>
    
    <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
    </nav>
    
  )
}

export default Navbar