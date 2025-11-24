import React, { useState, useEffect } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    dateOfBirth: '',
    profileImage: '',
    age: null
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      
      if (data.success) {
        setUser({
          ...data.user,
          age: calculateAge(data.user.dateOfBirth)
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage({ type: 'error', text: 'Failed to load user data' });
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Phone number validation (numbers only)
    if (name === 'phone') {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value) && value !== '') {
        return;
      }
    }
    
    // Bio length validation
    if (name === 'bio' && value.length > 222) {
      setMessage({ type: 'error', text: 'Bio must be 222 characters or less' });
      return;
    }

    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select a valid image file' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await fetch('/api/user/upload-profile-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => ({ ...prev, profileImage: data.imageUrl }));
        setMessage({ type: 'success', text: 'Profile image updated successfully' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to upload image' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error uploading image' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          bio: user.bio
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchUserData(); // Reset form with original data
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="account-settings-container">
      <div className="account-settings-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-container">
              <img 
                src={user.profileImage || '/default-avatar.png'} 
                alt="Profile" 
                className="profile-image"
              />
              <label htmlFor="profileImageUpload" className="image-upload-label">
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  disabled={loading}
                />
                <span className="upload-icon">📷</span>
              </label>
            </div>
            <h2 className="user-name">{user.name || 'User Name'}</h2>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Account Settings Form */}
        <form className="account-settings-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your phone number"
                maxLength="15"
              />
            </div>

            {/* Date of Birth Field - Not Editable */}
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''}
                disabled
                className="disabled-field"
              />
              {user.age !== null && (
                <div className="age-display">Age: {user.age} years</div>
              )}
              <div className="field-note">Date of birth cannot be changed</div>
            </div>

            {/* Bio Field */}
            <div className="form-group full-width">
              <label htmlFor="bio">
                Bio <span className="char-count">({user.bio?.length || 0}/222)</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Tell us something about yourself..."
                maxLength="222"
                rows="4"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            {!isEditing ? (
              <button 
                type="button" 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;