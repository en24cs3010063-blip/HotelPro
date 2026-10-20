import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import AlertMessage from '../components/AlertMessage';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [alert, setAlert] = useState({ type: '', text: '' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (roleFilter) params.role = roleFilter;

      const res = await api.get('/users', { params });
      setUsers(res.data.data);
    } catch (err) {
      setAlert({
        type: 'danger',
        text: err.response?.data?.message || 'Failed to fetch users'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/users/stats/overview');
      setStats(res.data.stats);
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [roleFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setAlert({ type: 'success', text: `User role updated to ${newRole}` });
      fetchUsers();
      fetchStats();
    } catch (err) {
      setAlert({
        type: 'danger',
        text: err.response?.data?.message || 'Failed to update user role'
      });
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      await api.put(`/users/${userId}`, { isActive: !currentStatus });
      setAlert({
        type: 'success',
        text: `User ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
      fetchUsers();
      fetchStats();
    } catch (err) {
      setAlert({
        type: 'danger',
        text: err.response?.data?.message || 'Failed to change user status'
      });
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user?')) {
      return;
    }

    try {
      await api.delete(`/users/${userId}`);
      setAlert({ type: 'success', text: 'User removed successfully.' });
      fetchUsers();
      fetchStats();
    } catch (err) {
      setAlert({
        type: 'danger',
        text: err.response?.data?.message || 'Failed to delete user'
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">User Management</h2>
          <p className="text-muted small mb-0">
            Manage hotel staff, guests, and administrative permissions.
          </p>
        </div>
      </div>

      <AlertMessage
        variant={alert.type}
        message={alert.text}
        onClose={() => setAlert({ type: '', text: '' })}
      />

      {/* Overview Stats Cards */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card card-custom p-3 text-center border-start border-primary border-4">
              <span className="text-muted small">Total Accounts</span>
              <h3 className="fw-bold mb-0 text-primary">{stats.totalUsers}</h3>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card card-custom p-3 text-center border-start border-info border-4">
              <span className="text-muted small">Guests</span>
              <h3 className="fw-bold mb-0 text-info">{stats.guests}</h3>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card card-custom p-3 text-center border-start border-warning border-4">
              <span className="text-muted small">Staff</span>
              <h3 className="fw-bold mb-0 text-warning">{stats.staff}</h3>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card card-custom p-3 text-center border-start border-danger border-4">
              <span className="text-muted small">Admins</span>
              <h3 className="fw-bold mb-0 text-danger">{stats.admins}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="card card-custom p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary px-3">
                Search
              </button>
            </form>
          </div>
          <div className="col-md-4 ms-auto">
            <div className="d-flex align-items-center gap-2">
              <label className="fw-semibold text-nowrap small">Filter Role:</label>
              <select
                className="form-select form-select-sm"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="guest">Guests</option>
                <option value="staff">Staff</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card card-custom overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" className="ps-4">User</th>
                <th scope="col">Phone</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Joined</th>
                <th scope="col" className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No users found matching the criteria.
                  </td>
                </tr>
              ) : (
                users.map((item) => (
                  <tr key={item._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
                          alt={item.name}
                          className="rounded-circle me-3"
                          width="38"
                          height="38"
                        />
                        <div>
                          <div className="fw-bold">{item.name}</div>
                          <div className="text-muted small">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.phone || '—'}</td>
                    <td>
                      <select
                        className="form-select form-select-sm w-auto"
                        value={item.role}
                        onChange={(e) => handleRoleChange(item._id, e.target.value)}
                      >
                        <option value="guest">Guest</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleStatusToggle(item._id, item.isActive)}
                        className={`badge border-0 ${
                          item.isActive ? 'bg-success' : 'bg-secondary'
                        }`}
                        title="Click to toggle status"
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="small text-muted">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                        title="Delete user"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
