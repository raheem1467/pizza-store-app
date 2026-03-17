import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../services/authService";
import { updateUserData } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data.user || response.data);
      } catch (err) {
        toast.error("Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        phone: profile.phone,
        address: profile.address,
        name: profile.name
      });
      dispatch(updateUserData({ name: profile.name }));
      toast.success("Profile updated successfully! ✨");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-refined-container">
      <div className="profile-refined-card">
        <div className="profile-refined-header">
          <div className="profile-refined-avatar">
            👤
          </div>
          <h2 className="fw-bold mb-1">{profile.name}</h2>
          <p className="text-muted small mb-0">{profile.email}</p>
        </div>

        <div className="profile-refined-body">
          <form onSubmit={handleUpdate}>
            {/* FULL NAME */}
            <div className="profile-item-group">
              <label className="profile-item-label">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  className="profile-refined-input"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              ) : (
                <div className="profile-item-value">{profile.name || "N/A"}</div>
              )}
            </div>

            {/* EMAIL (Read Only) */}
            <div className="profile-item-group">
              <label className="profile-item-label">Email Address</label>
              <div className="profile-item-value text-secondary">{profile.email}</div>
            </div>

            {/* PHONE */}
            <div className="profile-item-group">
              <label className="profile-item-label">Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  className="profile-refined-input"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="10 digit phone number"
                  pattern="[0-9]{10}"
                  required
                />
              ) : (
                <div className="profile-item-value">{profile.phone || "Not provided"}</div>
              )}
            </div>

            {/* ADDRESS */}
            <div className="profile-item-group">
              <label className="profile-item-label">Delivery Address</label>
              {isEditing ? (
                <textarea
                  className="profile-refined-input"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  rows="3"
                  placeholder="Your full delivery address"
                  required
                ></textarea>
              ) : (
                <div className="profile-item-value" style={{ lineHeight: "1.6", border: "none" }}>
                  {profile.address || "No address provided"}
                </div>
              )}
            </div>

            <div className="mt-5">
              {!isEditing ? (
                <button
                  type="button"
                  className="profile-refined-btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile Information
                </button>
              ) : (
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="profile-refined-btn-cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="profile-refined-btn-save"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
