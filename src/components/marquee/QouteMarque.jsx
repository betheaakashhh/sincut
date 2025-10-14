import React, { useEffect, useState } from 'react';
import { getAllQuotes } from '../../indexedDB';
import './marquee.css';

function QuoteMarquee() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      const allQuotes = await getAllQuotes();
      setQuotes(allQuotes);
    };
    fetchQuotes();
  }, []);

  // Change quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes]);

  if (quotes.length === 0) return null;

  return (
    <div className="marquee-container">
      <p className="marquee-quote">"{quotes[currentIndex].text}"</p>
    </div>
  );
}

export default QuoteMarquee;
