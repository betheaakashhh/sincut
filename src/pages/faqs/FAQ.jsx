import React, { useState } from "react";
import "./FAQ.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../data/Footer/Footer";

const faqData = [
  {
    question: "What is SinCut?",
    answer: "SinCut is a sacred platform that helps you confess, donate, and find personal redemption while remaining completely anonymous. It's your path to spiritual cleansing and positive impact.",
    icon: "🕊️"
  },
  {
    question: "How do I make a donation?",
    answer: "You can make a sacred donation through our secure Razorpay integration after writing your confession or directly from the donation button. Every contribution creates positive change.",
    icon: "💫"
  },
  {
    question: "Is my confession anonymous?",
    answer: "Absolutely. All confessions are completely anonymous and encrypted. Your privacy is sacred to us - what you share stays between you and your conscience.",
    icon: "🔒"
  },
  {
    question: "Can I refer friends?",
    answer: "Yes! Spread the goodness by referring friends. You'll earn spiritual rewards for every successful referral that joins our community of positive change.",
    icon: "👥"
  },
  {
    question: "How is my donation used?",
    answer: "Your donations fund various charitable initiatives worldwide - from clean water projects to education and healthcare. Every dollar creates meaningful impact.",
    icon: "🌍"
  },
  {
    question: "Can I delete my confession?",
    answer: "Confessions are automatically processed and never stored permanently. They exist only during your session for reflection and cleansing purposes.",
    icon: "✨"
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
  
    <section className="divine-faq-section">
      <Navbar />
      {/* Divine Background Elements */}
      <div className="faq-heavenly-background">
        <div className="faq-light-ray"></div>
        <div className="faq-light-ray"></div>
        <div className="faq-light-ray"></div>
        <div className="floating-wisdom">📜</div>
        <div className="floating-wisdom">💭</div>
        <div className="floating-wisdom">🔍</div>
      </div>

      <div className="faq-container">
        {/* Header Section */}
        <div className="faq-header">
          <div className="sacred-symbol">🙏</div>
          <h2 className="faq-main-title">Divine Guidance</h2>
          <p className="faq-subtitle">
            Find answers to your questions about spiritual cleansing and redemption
          </p>
          <div className="title-underline"></div>
        </div>

        {/* FAQ Items */}
        <div className="faq-items-container">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`divine-faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question-container"
                onClick={() => toggleFAQ(index)}
              >
                <div className="question-content">
                  <span className="question-icon">{item.icon}</span>
                  <h3 className="faq-question">{item.question}</h3>
                </div>
                <div className="expand-icon">
                  <div className="icon-line horizontal"></div>
                  <div className={`icon-line vertical ${activeIndex === index ? "active" : ""}`}></div>
                </div>
              </div>
              
              <div className="faq-answer-container">
                <div className="answer-content">
                  <p className="faq-answer">{item.answer}</p>
                  <div className="answer-decoration">
                    <span className="decoration-dot"></span>
                    <span className="decoration-dot"></span>
                    <span className="decoration-dot"></span>
                  </div>
                </div>
              </div>

              {/* Divine Glow Effect */}
              <div className="faq-glow-effect"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="faq-cta">
          <div className="cta-content">
            <h3 className="cta-title">Still have questions?</h3>
            <p className="cta-description">
              Our spiritual guides are here to help you on your journey to peace and redemption.
            </p>
            <button className="divine-cta-button">
              <span className="button-icon">💬</span>
              Contact Spiritual Support
            </button>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default FAQ;