import React from 'react';
import './EmailSentPopup.css'

const EmailSentPopup = ({ show, onResend, onClose }) => {
  if (!show) return null;

  return (
    <div className="email-modal">
      <div className="email-modal-content">
        <h3 className="email-modal-heading">Email has been Sent Successfully</h3>
        <div className="email-modal-image-wrapper">
          <img 
            src="/assets/emailsent.jpg" 
            alt="Email Sent" 
            className="email-modal-image"
          />
        </div>
        <p className="email-modal-message">
          An email with verificaion link has been sent to your address.Please verify your emailaddress..
        </p>
        <button type='button' className="email-modal-button resend-btn" onClick={onResend}>Resend Email</button>
        <button type='button' className="email-modal-button close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EmailSentPopup;
