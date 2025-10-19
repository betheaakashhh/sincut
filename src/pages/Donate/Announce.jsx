import React, { useState, useEffect } from 'react';
import './announce.css';

const Announce = () => {
  // Hero slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Testimonials state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Hero slides data
  const slides = [
    {
      id: 1,
      leftContent: {
        title: "Welcome to Our Platform",
        description: "Discover amazing features that will transform your business and drive growth.",
        buttonText: "Get Started"
      },
      rightContent: {
        image: "🚀",
        description: "Innovative Solutions"
      }
    },
    {
      id: 2,
      leftContent: {
        title: "Premium Services",
        description: "Experience world-class services with our dedicated team of professionals.",
        buttonText: "Learn More"
      },
      rightContent: {
        image: "⭐",
        description: "Award Winning"
      }
    },
    {
      id: 3,
      leftContent: {
        title: "Future Technology",
        description: "Stay ahead with cutting-edge technology and innovative approaches.",
        buttonText: "Explore"
      },
      rightContent: {
        image: "🔮",
        description: "Next Gen Tech"
      }
    },
    {
      id: 4,
      fullContent: {
        title: "Join Thousands of Happy Customers",
        description: "Be part of our growing community and transform your digital experience.",
        buttonText: "Join Now"
      }
    },
    {
      id: 5,
      fullContent: {
        title: "24/7 Support Available",
        description: "Our dedicated support team is always ready to help you succeed.",
        buttonText: "Contact Us"
      }
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "This platform has completely transformed our marketing strategy. The results were beyond our expectations!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "StartUp Ventures",
      content: "Incredible service and support. Our business growth accelerated by 200% in just 3 months.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager",
      company: "Innovate Inc",
      content: "The user experience is seamless and the features are exactly what we needed. Highly recommended!",
      rating: 4
    },
    {
      id: 4,
      name: "David Thompson",
      role: "CTO",
      company: "Digital Solutions",
      content: "Robust, reliable, and incredibly efficient. This has become an essential tool for our team.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Operations Director",
      company: "Global Enterprises",
      content: "Outstanding platform with exceptional customer service. It streamlined our entire workflow.",
      rating: 5
    }
  ];

  // Auto slide functionality for hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Render star rating
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-background"></div>
              <div className="slide-content">
                {slide.leftContent && slide.rightContent ? (
                  <div className="split-layout">
                    <div className="left-section">
                      <h1>{slide.leftContent.title}</h1>
                      <p>{slide.leftContent.description}</p>
                      <button className="cta-button">
                        {slide.leftContent.buttonText}
                      </button>
                    </div>
                    <div className="right-section">
                      <div className="icon">{slide.rightContent.image}</div>
                      <h3>{slide.rightContent.description}</h3>
                    </div>
                  </div>
                ) : (
                  <div className="full-layout">
                    <h1>{slide.fullContent.title}</h1>
                    <p>{slide.fullContent.description}</p>
                    <button className="cta-button">
                      {slide.fullContent.buttonText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Slider Navigation */}
        <button className="slider-nav prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          ›
        </button>

        {/* Slider Indicators */}
        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-slider">
            <div className="testimonial-content">
              <div className="stars">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              <p className="testimonial-text">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="client-info">
                <h4>{testimonials[currentTestimonial].name}</h4>
                <p>{testimonials[currentTestimonial].role}</p>
                <span>{testimonials[currentTestimonial].company}</span>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="testimonial-nav">
              <button className="testimonial-prev" onClick={prevTestimonial}>
                ‹
              </button>
              <div className="testimonial-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`testimonial-indicator ${index === currentTestimonial ? 'active' : ''}`}
                    onClick={() => goToTestimonial(index)}
                  />
                ))}
              </div>
              <button className="testimonial-next" onClick={nextTestimonial}>
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announce;