import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white-50 py-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h5 className="text-white fw-bold mb-1">
              <span className="text-primary">Hotel</span>Pro
            </h5>
            <p className="small mb-0">
              Modern, scalable, and secure hotel management platform.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="small text-muted">
              &copy; {new Date().getFullYear()} HotelPro. Built with React & Node.js.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
