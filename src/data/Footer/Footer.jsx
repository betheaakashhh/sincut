import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          Join our community
        </div>
        <div className="social-links">
          <a 
            href="https://wa.me/yournumber" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link whatsapp"
          >
            WhatsApp
          </a>
          <a 
            href="https://instagram.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link instagram"
          >
            Instagram
          </a>
          <a 
            href="https://twitter.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link twitter"
          >
            Twitter
          </a>
          <a 
            href="https://t.me/yourchannel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link telegram"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;