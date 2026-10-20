import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-banner text-center py-5 shadow-sm">
        <div className="container py-4">
          <div className="badge bg-light text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
            ✨ Next-Gen Hospitality Platform
          </div>
          <h1 className="display-4 fw-extrabold mb-3">
            Welcome to <span className="text-warning">HotelPro</span>
          </h1>
          <p className="lead mx-auto mb-4" style={{ maxWidth: '720px', opacity: 0.9 }}>
            Streamline your hotel operations with secure JWT authentication, real-time
            room inventory, fast reservation processing, and comprehensive management analytics.
          </p>

          <div className="d-flex justify-content-center gap-3">
            {isAuthenticated ? (
              <Link to="/profile" className="btn btn-warning btn-lg fw-bold px-4">
                View My Profile ({user?.name})
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-warning btn-lg fw-bold px-4">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container py-5 my-3">
        <div className="text-center mb-5">
          <h6 className="text-primary text-uppercase fw-bold">Platform Capabilities</h6>
          <h2 className="fw-bold">Built for Reliability, Scalability & Security</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card card-custom h-100 p-4">
              <div className="fs-1 text-primary mb-3">🔐</div>
              <h4 className="fw-bold">Robust Authentication</h4>
              <p className="text-muted">
                Industry standard JWT token architecture with secure password hashing via bcrypt,
                granular role permissions (Guest, Staff, Admin), and session handling.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-custom h-100 p-4">
              <div className="fs-1 text-primary mb-3">🛏️</div>
              <h4 className="fw-bold">Room & Inventory Tracking</h4>
              <p className="text-muted">
                Track room categories, amenities, pricing per night, and real-time availability
                without double bookings or sync conflicts.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-custom h-100 p-4">
              <div className="fs-1 text-primary mb-3">📊</div>
              <h4 className="fw-bold">Operational Insights</h4>
              <p className="text-muted">
                Admin dashboard providing live occupancy stats, booking volumes, user activity,
                and revenue tracking across all guest interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Epics Breakdown section */}
      <section className="bg-white py-5 border-top">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h6 className="text-primary text-uppercase fw-bold">Project Roadmap</h6>
              <h2 className="fw-bold mb-3">6 Epics & 19 Core Tasks</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-success me-3">Epic 1</span>
                  Authentication & User Access Management (JWT, Roles, Profile)
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-primary me-3">Epic 2</span>
                  Room Inventory & Category Management
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-primary me-3">Epic 3</span>
                  Reservation & Booking Management System
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-secondary me-3">Epic 4</span>
                  Payment Processing & Transaction Records
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-secondary me-3">Epic 5</span>
                  Guest Reviews & Customer Feedback System
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-secondary me-3">Epic 6</span>
                  Admin Dashboard & Analytics Engine
                </li>
              </ul>
            </div>
            <div className="col-lg-6 text-center">
              <div className="p-4 bg-light rounded-4 border">
                <h4 className="fw-bold mb-3">Quick Tech Stack</h4>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <span className="badge bg-dark p-2">React 18</span>
                  <span className="badge bg-dark p-2">Node.js</span>
                  <span className="badge bg-dark p-2">Express.js</span>
                  <span className="badge bg-dark p-2">MongoDB & Mongoose</span>
                  <span className="badge bg-primary p-2">Bootstrap 5</span>
                  <span className="badge bg-secondary p-2">JWT & Bcrypt</span>
                  <span className="badge bg-info text-dark p-2">Axios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
