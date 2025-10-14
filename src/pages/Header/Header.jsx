import React from "react";
import "./header.css";
import QuoteMarquee from "../../components/marquee/QouteMarque";



const Header = () => {
  return (
    <div className="hero">
       <div className="hero-text">
        <h1>Welcome To <span>SinCUT</span></h1>
        <p>At Sincut, every small act creates a big impact. Your <span>$1</span> donation helps cleanse not just your conscience, but the world around you — transforming guilt into goodness, and turning every sin into a chance for redemption.</p>
        <div className="marquee">
          <QuoteMarquee />
        </div>
        {/* <button className="btn">$1</button> */}
        
       </div>
       

       
      
      
    </div>
  );
};

export default Header;
