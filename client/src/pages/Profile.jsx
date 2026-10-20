import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      country: user?.address?.country || '',
      zipCode: user?.address?.zipCode || ''
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('addr_')) {
      const field = name.replace('addr_', '');
      setProfileData({
        ...profileData,
        address: { ...profileData.address, [field]: value }
      });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    setSavingProfile(true);

    try {
      await updateProfile(profileData);
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMsg({
        type: 'danger',
        text: err.response?.data?.message || 'Failed to update profile.'
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPassMsg({ type: 'danger', text: 'New passwords do not match.' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPassMsg({ type: 'danger', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setSavingPass(true);

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPassMsg({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      setPassMsg({
        type: 'danger',
        text: err.response?.data?.message || 'Failed to update password.'
      });
    } finally {
      setSavingPass(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* User Card */}
        <div className="col-lg-4">
          <div className="card card-custom p-4 text-center">
            <img
              src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
              alt={user?.name}
              className="rounded-circle mx-auto mb-3 shadow-sm border border-3 border-primary"
              width="110"
              height="110"
              style={{ objectFit: 'cover' }}
            />
            <h4 className="fw-bold mb-1">{user?.name}</h4>
            <p className="text-muted small mb-2">{user?.email}</p>
            <div>
              <span className={`badge badge-role badge-${user?.role}`}>
                Role: {user?.role}
              </span>
            </div>
            <hr />
            <div className="text-start small">
              <p className="mb-1"><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
              <p className="mb-1"><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
              <p className="mb-0"><strong>Status:</strong> <span className="text-success fw-bold">Active</span></p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="col-lg-8">
          <div className="card card-custom p-4 mb-4">
            <h5 className="fw-bold mb-3">Edit Profile Information</h5>

            <AlertMessage
              variant={profileMsg.type}
              message={profileMsg.text}
              onClose={() => setProfileMsg({ type: '', text: '' })}
            />

            <form onSubmit={handleProfileSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Avatar Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="avatar"
                    value={profileData.avatar}
                    onChange={handleProfileChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addr_street"
                    value={profileData.address.street}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addr_city"
                    value={profileData.address.city}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">State / Province</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addr_state"
                    value={profileData.address.state}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addr_country"
                    value={profileData.address.country}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addr_zipCode"
                    value={profileData.address.zipCode}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={savingProfile}>
                {savingProfile ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="card card-custom p-4">
            <h5 className="fw-bold mb-3">Change Account Password</h5>

            <AlertMessage
              variant={passMsg.type}
              message={passMsg.text}
              onClose={() => setPassMsg({ type: '', text: '' })}
            />

            <form onSubmit={handlePasswordSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.confirmNewPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-outline-danger" disabled={savingPass}>
                {savingPass ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
