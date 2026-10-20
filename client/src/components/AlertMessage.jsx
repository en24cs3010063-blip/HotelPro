import React from 'react';

const AlertMessage = ({ variant = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show d-flex align-items-center justify-content-between`}
      role="alert"
    >
      <div>{message}</div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
};

export default AlertMessage;
