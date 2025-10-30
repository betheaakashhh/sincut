import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MultiStepRegistration.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sincut-razorpay.vercel.app';

const MultiStepRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreedToPrivacyPolicy: false,
    name: '',
    gender: '',
    occupationType: '',
    occupation: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ------------------------------------------------------------------
  // Options
  // ------------------------------------------------------------------
  const occupationOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'other', label: 'Other' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreedToPrivacyPolicy)
      newErrors.agreedToPrivacyPolicy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.occupationType) newErrors.occupationType = 'Please select your occupation type';
    if (formData.occupationType === 'other' && !formData.occupation)
      newErrors.occupation = 'Please specify your occupation';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  // ------------------------------------------------------------------
  // Submit Handler (Fixed)
  // ------------------------------------------------------------------
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        gender: formData.gender,
        occupationType: formData.occupationType,
        occupation:
          formData.occupationType === 'other'
            ? formData.occupation
            : formData.occupationType,
        agreedToPrivacyPolicy: formData.agreedToPrivacyPolicy,
      };

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('🔹 Registration response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // ✅ Save token and user to localStorage for auto-login
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // ✅ Redirect to main (protected) page
      navigate('/main');
    } catch (err) {
      console.error('❌ Registration error:', err);
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------------
  // Step Indicator UI
  // ------------------------------------------------------------------
  const StepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((step) => (
        <div key={step} className="step-item">
          <div className={`step-circle ${currentStep >= step ? 'active' : ''}`}>{step}</div>
          <div className="step-label">
            {step === 1 && 'Account Setup'}
            {step === 2 && 'Personal Info'}
            {step === 3 && 'Complete'}
          </div>
          {step < 3 && <div className="step-connector"></div>}
        </div>
      ))}
    </div>
  );

  // ------------------------------------------------------------------
  // JSX
  // ------------------------------------------------------------------
  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h2>Create Your Account</h2>
          <p>Join our community in just a few steps</p>
        </div>

        <StepIndicator />

        <div className="form-container">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="step-content slide-in">
              <h3>Account Setup</h3>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min. 6 characters)"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreedToPrivacyPolicy"
                    checked={formData.agreedToPrivacyPolicy}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  I agree to the{' '}
                  <a href="#privacy" className="link">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#terms" className="link">
                    Terms of Service
                  </a>
                </label>
                {errors.agreedToPrivacyPolicy && (
                  <span className="error-text">{errors.agreedToPrivacyPolicy}</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="step-content slide-in">
              <h3>Personal Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="radio-group">
                  {genderOptions.map((option) => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value={option.value}
                        checked={formData.gender === option.value}
                        onChange={handleChange}
                      />
                      <span className="radio-custom"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>

              <div className="form-group">
                <label>Occupation Type</label>
                <div className="occupation-grid">
                  {occupationOptions.map((option) => (
                    <label key={option.value} className="occupation-option">
                      <input
                        type="radio"
                        name="occupationType"
                        value={option.value}
                        checked={formData.occupationType === option.value}
                        onChange={handleChange}
                      />
                      <div className="occupation-card">
                        <span className="occupation-icon">
                          {option.value === 'employed' && '💼'}
                          {option.value === 'unemployed' && '🎯'}
                          {option.value === 'student' && '🎓'}
                          {option.value === 'entrepreneur' && '🚀'}
                          {option.value === 'other' && '🔮'}
                        </span>
                        <span className="occupation-label">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.occupationType && (
                  <span className="error-text">{errors.occupationType}</span>
                )}
              </div>

              {formData.occupationType === 'other' && (
                <div className="form-group">
                  <label>Specify Your Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Please specify your occupation"
                    className={errors.occupation ? 'error' : ''}
                  />
                  {errors.occupation && (
                    <span className="error-text">{errors.occupation}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="step-content slide-in completion-step">
              <div className="completion-icon">🎉</div>
              <h3>Almost There!</h3>
              <p className="completion-text">
                Welcome to our community! We're excited to have you on board.
              </p>

              <div className="summary-card">
                <div className="summary-item">
                  <strong>Email:</strong> {formData.email}
                </div>
                <div className="summary-item">
                  <strong>Name:</strong> {formData.name}
                </div>
                <div className="summary-item">
                  <strong>Gender:</strong>{' '}
                  {genderOptions.find((g) => g.value === formData.gender)?.label}
                </div>
                <div className="summary-item">
                  <strong>Occupation:</strong>{' '}
                  {formData.occupationType === 'other'
                    ? formData.occupation
                    : formData.occupationType}
                </div>
              </div>

              {errors.submit && <div className="error-message">{errors.submit}</div>}
            </div>
          )}

          {/* BUTTONS */}
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary"
                disabled={loading}
              >
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-success"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            )}
          </div>
        </div>

        <div className="login-link">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="link">
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;
