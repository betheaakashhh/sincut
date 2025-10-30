import React, { useState, useEffect } from "react";
import "./ModernHeroSection.css";

const ModernHeroSection = () => {
  const [activeSection, setActiveSection] = useState("vision");
  const [currentCareerSlide, setCurrentCareerSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuOptions = ["vision", "leadership", "career", "donation", "people"];

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const leadershipProfiles = [
    { id: 1, name: "Sarah Chen", role: "CEO & Founder", experience: "15+ years in tech" },
    { id: 2, name: "Marcus Rodriguez", role: "CTO", experience: "12+ years in engineering" },
    { id: 3, name: "Elena Petrova", role: "Head of Design", experience: "10+ years in UX" },
    { id: 4, name: "David Kim", role: "VP of Operations", experience: "14+ years in management" },
    { id: 5, name: "Aisha Johnson", role: "Head of Marketing", experience: "11+ years in growth" },
    { id: 6, name: "James Wilson", role: "Lead Developer", experience: "9+ years in software" },
    { id: 7, name: "Lisa Zhang", role: "Product Manager", experience: "8+ years in product" },
    { id: 8, name: "Ryan Cooper", role: "Data Scientist", experience: "7+ years in AI/ML" }
  ];

  const careerSlides = [
    {
      title: "Frontend Developer",
      description: "Build amazing user interfaces with modern technologies like React, Vue, and Angular.",
      requirements: ["3+ years React", "TypeScript", "CSS/SCSS"],
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Backend Engineer",
      description: "Develop scalable server-side applications and APIs using Node.js and cloud technologies.",
      requirements: ["Node.js", "AWS/Azure", "Database design"],
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "UX Designer",
      description: "Create intuitive and beautiful user experiences for our digital products.",
      requirements: ["Figma", "User research", "Prototyping"],
      location: "New York, NY",
      type: "Full-time"
    },
    {
      title: "DevOps Engineer",
      description: "Build and maintain our cloud infrastructure and CI/CD pipelines.",
      requirements: ["Docker", "Kubernetes", "AWS/GCP"],
      location: "Remote",
      type: "Contract"
    }
  ];

  const peopleCards = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      department: "Engineering",
      quote: "Building the future one line of code at a time.",
      joined: "2022"
    },
    {
      name: "Maya Patel",
      role: "Product Designer",
      department: "Design",
      quote: "Creating experiences that users love and remember.",
      joined: "2021"
    },
    {
      name: "Carlos Rivera",
      role: "Data Analyst",
      department: "Analytics",
      quote: "Turning data into actionable insights for growth.",
      joined: "2023"
    },
    {
      name: "Sophie Williams",
      role: "Marketing Lead",
      department: "Marketing",
      quote: "Connecting brands with their perfect audience.",
      joined: "2020"
    }
  ];

  const nextCareerSlide = () => {
    setCurrentCareerSlide((prev) => (prev + 1) % careerSlides.length);
  };

  const prevCareerSlide = () => {
    setCurrentCareerSlide((prev) => (prev - 1 + careerSlides.length) % careerSlides.length);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  const handleDonate = (amount = null) => {
    if (amount) {
      alert(`Thank you for your donation of $${amount}!`);
    } else {
      alert("Redirecting to donation page...");
    }
  };

  const handleReferFriend = (personName) => {
    alert(`Referral initiated for ${personName}! Share this amazing opportunity with your friends.`);
  };

  const handleApplyNow = (position) => {
    alert(`Applying for: ${position}\nWe'll review your application and get back to you soon!`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getMenuIcon = (option) => {
    switch (option) {
      case 'vision': return '🔮';
      case 'leadership': return '👑';
      case 'career': return '💼';
      case 'donation': return '❤️';
      case 'people': return '👥';
      default: return '⭐';
    }
  };

  return (
    <div className="modern-hero-section">
      {/* Animated Background */}
      <div className="modern-hero-background">
        <div className="modern-floating-orb modern-orb-1"></div>
        <div className="modern-floating-orb modern-orb-2"></div>
        <div className="modern-floating-orb modern-orb-3"></div>
        <div className="modern-grid-lines"></div>
      </div>

      <div className="modern-hero-container">
        {/* Left Menu Section - Hidden on mobile */}
        {!isMobile && (
          <div className="modern-menu-section">
            <div className="modern-menu-container">
              <h2 className="modern-menu-title">Explore Our World</h2>
              <div className="modern-menu-options">
                {menuOptions.map((option) => (
                  <button
                    key={option}
                    className={`modern-menu-option ${activeSection === option ? 'active' : ''}`}
                    onClick={() => handleSectionChange(option)}
                  >
                    <span className="modern-menu-icon">
                      {getMenuIcon(option)}
                    </span>
                    <span className="modern-menu-text">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                    <span className="modern-menu-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Content Section */}
        <div className="modern-content-section">
          <div className="modern-content-container">
            
            {/* Vision Section */}
            {activeSection === "vision" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card vision-card">
                  <h2 className="modern-content-title">
                    Our <span className="modern-gradient-text">Vision</span>
                  </h2>
                  <div className="modern-content-grid">
                    <div className="modern-grid-item">
                      <div className="modern-grid-icon">🚀</div>
                      <h3>Innovate Continuously</h3>
                      <p>We believe in pushing boundaries and creating solutions that shape the future of technology and transform industries worldwide.</p>
                    </div>
                    <div className="modern-grid-item">
                      <div className="modern-grid-icon">🌍</div>
                      <h3>Global Impact</h3>
                      <p>Our mission is to create positive change on a global scale through innovative technology that bridges gaps and connects communities.</p>
                    </div>
                    <div className="modern-grid-item">
                      <div className="modern-grid-icon">💡</div>
                      <h3>Future Ready</h3>
                      <p>We prepare today for the challenges and opportunities of tomorrow's digital landscape, ensuring sustainable growth and innovation.</p>
                    </div>
                    <div className="modern-grid-item">
                      <div className="modern-grid-icon">🤝</div>
                      <h3>Collaborative Spirit</h3>
                      <p>Great things happen when brilliant minds come together with a shared purpose, fostering creativity and breakthrough innovations.</p>
                    </div>
                  </div>
                  <div className="modern-vision-actions">
                    <button className="modern-action-btn primary" onClick={() => handleSectionChange('career')}>
                      Join Our Mission
                    </button>
                    <button className="modern-action-btn secondary" onClick={() => handleSectionChange('leadership')}>
                      Meet Our Leaders
                    </button>
                  </div>
                </div>
              </div>
            )}
            

            {/* Leadership Section */}
            {activeSection === "leadership" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card leadership-card">
                  <h2 className="modern-content-title">
                    Meet Our <span className="modern-gradient-text">Leadership</span>
                  </h2>
                  <p className="modern-section-subtitle">
                    Experienced professionals guiding our journey towards innovation and excellence
                  </p>
                  <div className="modern-leadership-grid">
                    {leadershipProfiles.map((profile) => (
                      <div key={profile.id} className="modern-profile-card">
                        <div className="modern-profile-image">
                          <div className="modern-profile-overlay"></div>
                          <div className="modern-profile-initial">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="modern-profile-info">
                          <h3>{profile.name}</h3>
                          <p className="modern-profile-role">{profile.role}</p>
                          <p className="modern-profile-exp">{profile.experience}</p>
                        </div>
                        <button 
                          className="modern-profile-btn"
                          onClick={() => alert(`Connecting you with ${profile.name}...`)}
                        >
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Career Section */}
            {activeSection === "career" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card career-card">
                  <h2 className="modern-content-title">
                    Build Your <span className="modern-gradient-text">Career</span>
                  </h2>
                  <p className="modern-section-subtitle">
                    Join our team and work on cutting-edge projects that make a difference
                  </p>
                  <div className="modern-career-slider">
                    <div className="modern-slide-container">
                      <div className="modern-slide-content">
                        <div className="modern-job-badge">
                          {careerSlides[currentCareerSlide].type}
                        </div>
                        <h3>{careerSlides[currentCareerSlide].title}</h3>
                        <p>{careerSlides[currentCareerSlide].description}</p>
                        <div className="modern-requirements">
                          {careerSlides[currentCareerSlide].requirements.map((req, index) => (
                            <span key={index} className="modern-req-tag">{req}</span>
                          ))}
                        </div>
                        <div className="modern-job-meta">
                          <span className="modern-location">
                            📍 {careerSlides[currentCareerSlide].location}
                          </span>
                          <span className="modern-slide-count">
                            {currentCareerSlide + 1} / {careerSlides.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="modern-slider-controls">
                      <button className="modern-slider-btn" onClick={prevCareerSlide}>
                        ← Previous
                      </button>
                      <div className="modern-slider-dots">
                        {careerSlides.map((_, index) => (
                          <span
                            key={index}
                            className={`modern-dot ${index === currentCareerSlide ? 'active' : ''}`}
                            onClick={() => setCurrentCareerSlide(index)}
                          ></span>
                        ))}
                      </div>
                      <button className="modern-slider-btn" onClick={nextCareerSlide}>
                        Next →
                      </button>
                    </div>
                    <button 
                      className="modern-apply-btn"
                      onClick={() => handleApplyNow(careerSlides[currentCareerSlide].title)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Donation Section */}
            {activeSection === "donation" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card donation-card">
                  <h2 className="modern-content-title">
                    Make a <span className="modern-gradient-text">Difference</span>
                  </h2>
                  <p className="modern-section-subtitle">
                    Your support fuels innovation and creates lasting impact in communities worldwide
                  </p>
                  <div className="modern-donation-content">
                    <div className="modern-donation-text">
                      <p>Every contribution helps us push the boundaries of what's possible and create solutions that matter.</p>
                      <div className="modern-impact-stats">
                        <div className="modern-stat">
                          <span className="modern-stat-number">50K+</span>
                          <span className="modern-stat-label">Lives Impacted</span>
                        </div>
                        <div className="modern-stat">
                          <span className="modern-stat-number">100+</span>
                          <span className="modern-stat-label">Projects Funded</span>
                        </div>
                        <div className="modern-stat">
                          <span className="modern-stat-number">25+</span>
                          <span className="modern-stat-label">Countries Reached</span>
                        </div>
                      </div>
                      
                      <div className="modern-quick-donate">
                        <h4>Quick Donate</h4>
                        <div className="modern-donate-amounts">
                          {[25, 50, 100, 250].map(amount => (
                            <button
                              key={amount}
                              className="modern-donate-amount-btn"
                              onClick={() => handleDonate(amount)}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="modern-donation-actions">
                      <button 
                        className="modern-donate-btn modern-donate-primary"
                        onClick={() => handleDonate()}
                      >
                        💝 Donate Now
                      </button>
                      <button 
                        className="modern-donate-btn modern-donate-secondary"
                        onClick={() => handleSectionChange('vision')}
                      >
                        Learn About Impact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* People Section */}
            {activeSection === "people" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card people-card">
                  <h2 className="modern-content-title">
                    Our <span className="modern-gradient-text">People</span>
                  </h2>
                  <p className="modern-section-subtitle">
                    Meet the talented individuals who make our mission possible every day
                  </p>
                  <div className="modern-people-grid">
                    {peopleCards.map((person, index) => (
                      <div key={index} className="modern-person-card">
                        <div className="modern-person-header">
                          <div className="modern-person-avatar">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="modern-person-info">
                            <h3>{person.name}</h3>
                            <p>{person.role}</p>
                            <div className="modern-person-meta">
                              <span className="modern-person-dept">{person.department}</span>
                              <span className="modern-person-joined">Since {person.joined}</span>
                            </div>
                          </div>
                        </div>
                        <p className="modern-person-quote">"{person.quote}"</p>
                        <div className="modern-person-actions">
                          <button 
                            className="modern-refer-btn"
                            onClick={() => handleReferFriend(person.name)}
                          >
                            👥 Refer a Friend
                          </button>
                          <button 
                            className="modern-connect-btn"
                            onClick={() => alert(`Connecting you with ${person.name}...`)}
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="modern-mobile-nav">
          <div className={`modern-nav-container ${menuOpen ? 'menu-open' : ''}`}>
            {/* Main Menu Button */}
            <button className="modern-nav-toggle" onClick={toggleMenu}>
              <span className="modern-nav-icon">
                {menuOpen ? '✕' : '☰'}
              </span>
              <span className="modern-nav-label">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </span>
            </button>

            {/* Navigation Options */}
            <div className="modern-nav-options">
              {menuOptions.map((option) => (
                <button
                  key={option}
                  className={`modern-nav-option ${activeSection === option ? 'active' : ''}`}
                  onClick={() => handleSectionChange(option)}
                >
                  <span className="modern-nav-option-icon">
                    {getMenuIcon(option)}
                  </span>
                  <span className="modern-nav-option-text">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModernHeroSection;