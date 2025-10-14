import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "What is SinCut?",
    answer:
      "SinCut is a platform that helps you confess, donate, and find personal redemption while remaining anonymous.",
  },
  {
    question: "How do I make a donation?",
    answer:
      "You can make a donation through our secure Razorpay integration after writing your confession or directly from the donation button.",
  },
  {
    question: "Is my confession anonymous?",
    answer:
      "Yes, all confessions are completely anonymous unless you choose to share them.",
  },
  {
    question: "Can I refer friends?",
    answer:
      "Yes! You can refer friends and earn rewards for every successful referral on SinCut.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
        >
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
          </div>
          <div className="faq-answer">{item.answer}</div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;
