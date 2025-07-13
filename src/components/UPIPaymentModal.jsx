import React from "react";
import { useToast } from "./ToastProvider";
import GPayLogo from "../assets/GPay.png";
import PaytmLogo from "../assets/Paytm.png";
import PhonePeLogo from "../assets/PhonePe.png";
import WhatsAppPayLogo from "../assets/WhatsAppPay.png";
import "../styles/UPIPaymentModal.css";

export default function UPIPaymentModal({ upiLink, onClose }) {
  const { showToast } = useToast(); // Get showToast function

  const handleCopy = () => {
    navigator.clipboard.writeText(upiLink);
    showToast("Text copied!"); // Show toast
  };

  return (
    <div className="upi-modal-overlay" onClick={onClose}>
      <div className="upi-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="upi-modal-header">
          <h3>UPI Payment Detected</h3>
          <button className="upi-close-button" onClick={onClose} title="Close">
            ✖
          </button>
        </div>

        {/* Content */}
        <div className="upi-modal-content">
          <p>You can pay using one of the apps below:</p>
          <div className="upi-apps">
            <div className="upi-app">
              <img src={GPayLogo} alt="GPay" className="upi-logo" />
              <span>GPay</span>
            </div>
            <div className="upi-app">
              <img src={PhonePeLogo} alt="PhonePe" className="upi-logo" />
              <span>PhonePe</span>
            </div>
            <div className="upi-app">
              <img src={PaytmLogo} alt="Paytm" className="upi-logo" />
              <span>Paytm</span>
            </div>
            <div className="upi-app">
              <img src={WhatsAppPayLogo} alt="WhatsApp Pay" className="upi-logo" />
              <span>WhatsApp Pay</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="upi-modal-footer">
          <button className="copy-button" onClick={handleCopy}>
            Copy UPI Link
          </button>
        </div>
      </div>
    </div>
  );
}