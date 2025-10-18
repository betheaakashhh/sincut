import React, { useState, useRef, useEffect } from 'react';
import './sharebutton.css';

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef(null);

  // Current page URL
  const currentUrl = window.location.href;
  const shareMessage = "Check out this amazing confession platform! Find your inner peace and redemption.";

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Share functions
  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage + '\n' + currentUrl)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const shareViaTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const shareViaTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    }
  };

  const shareViaEmail = () => {
    const subject = "Amazing Confession Platform";
    const body = `${shareMessage}\n\n${currentUrl}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setIsOpen(false);
  };

  return (
    <div className="share-button-container" ref={shareRef}>
      {/* Main Share Button */}
      <button 
        className={`share-main-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="share-icon">🔗</span>
        <span className="share-text">Refer Friend</span>
        <span className={`share-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* Share Options Menu */}
      <div className={`share-options ${isOpen ? 'open' : ''}`}>
        <div className="share-options-content">
          <div className="share-header">
            <h4>Share via</h4>
            <div className="share-close" onClick={() => setIsOpen(false)}>×</div>
          </div>
          
          <div className="share-grid">
            <button className="share-option whatsapp" onClick={shareViaWhatsApp}>
              <span className="option-icon">💚</span>
              <span className="option-text">WhatsApp</span>
            </button>

            <button className="share-option facebook" onClick={shareViaFacebook}>
              <span className="option-icon">🌐</span>
              <span className="option-text">Facebook</span>
            </button>

            <button className="share-option twitter" onClick={shareViaTwitter}>
              <span className="option-icon">🐦</span>
              <span className="option-text">Twitter</span>
            </button>

            <button className="share-option telegram" onClick={shareViaTelegram}>
              <span className="option-icon">✈️</span>
              <span className="option-text">Telegram</span>
            </button>

            <button className="share-option email" onClick={shareViaEmail}>
              <span className="option-icon">📧</span>
              <span className="option-text">Email</span>
            </button>

            <button className="share-option copy" onClick={copyToClipboard}>
              <span className="option-icon">{copied ? '✅' : '📋'}</span>
              <span className="option-text">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {copied && (
        <div className="copy-toast">
          <span>✅ Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
