import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-5 my-auto">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="fw-semibold mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary px-4">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
