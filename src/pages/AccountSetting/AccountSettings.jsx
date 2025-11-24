import React, { useState, useEffect } from "react";
import "./AccountSettings.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL||"https://sincut-razorpay.vercel.app";

const avatarOptions = [
  "dog.png",
  "cat.png",
  "man.png",
  "woman.png",
  "anime_boy.png",
  "anime_girl.png",
  "football.png",
  "avatar_1.png",
  "avatar_2.png",
  "avatar_3.png",
];

const AccountSettings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    dateOfBirth: "",
    profileImage: "avatar_1.png",
    age: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser({
          ...data.user,
          age: calculateAge(data.user.dateOfBirth),
        });
      } else {
        setMessage({ type: "error", text: "Failed to load user data" });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setMessage({ type: "error", text: "Error loading profile" });
    }
  };

  // Calculate age
  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^[0-9]*$/.test(value)) return;

    if (name === "bio" && value.length > 222) return;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Avatar selection handler
  const handleAvatarSelect = async (avatarFile) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/user/update-avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ profileImage: avatarFile }),
      });

      const data = await res.json();

      if (data.success) {
        setUser((prev) => ({ ...prev, profileImage: avatarFile }));
        setMessage({ type: "success", text: "Avatar updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error updating avatar" });
    }

    setLoading(false);
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          bio: user.bio,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Profile updated!" });
        setIsEditing(false);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error updating profile" });
    }

    setLoading(false);
  };

  return (
    <div className="account-settings-container">
      <div className="account-settings-card">
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-container">

              <img
                src={`/assets/avatars/${user.profileImage}`}
                alt="Profile"
                className="profile-image"
              />

              {/* Avatar selection grid */}
              <div className="avatar-grid">
                {avatarOptions.map((avatar, i) => (
                  <img
                    key={i}
                    src={`/assets/avatars/${avatar}`}
                    alt={avatar}
                    className={`avatar-option ${
                      avatar === user.profileImage ? "selected" : ""
                    }`}
                    onClick={() => handleAvatarSelect(avatar)}
                  />
                ))}
              </div>

            </div>
            <h2 className="user-name">{user.name}</h2>
          </div>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form className="account-settings-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                maxLength="15"
              />
            </div>

            {/* DOB */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" disabled value={user.dateOfBirth?.split("T")[0]} />
              <div className="field-note">DOB cannot be changed</div>
            </div>

            {/* Bio */}
            <div className="form-group full-width">
              <label>Bio ({user.bio?.length || 0}/222)</label>
              <textarea
                name="bio"
                rows="4"
                maxLength="222"
                value={user.bio}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            ) : (
              <>
                <button className="cancel-btn" onClick={() => setIsEditing(false)} type="button">
                  Cancel
                </button>
                <button className="save-btn" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
