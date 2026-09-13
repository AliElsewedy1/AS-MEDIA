import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-pill" id="appToast" role="status" aria-live="polite">
      <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-green)' }}></i>
      <span id="toastMsg">{message}</span>
    </div>
  );
};
