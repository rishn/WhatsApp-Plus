import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSearchPlus, FaSearchMinus, FaRegStar, FaRegSmile, FaQrcode, FaCopy } from "react-icons/fa";
import jsQR from "jsqr";
import { useToast } from "./ToastProvider";
import UPIPaymentModal from "./UPIPaymentModal"; // Import the UPI modal
import "../styles/FullScreenImageModal.css";

export default function FullScreenImageModal({ image, onClose, onAnalyze }) {
  const [ocrTextParts, setOcrTextParts] = useState([]);
  const [qrCodeUrls, setQrCodeUrls] = useState([]);
  const [showFooter, setShowFooter] = useState(false); // State to control footer visibility
  const [upiLink, setUpiLink] = useState(null); // State for UPI link
  const { showToast } = useToast(); // Get showToast function

  const handleAnalyze = async () => {
    setQrCodeUrls([]); // Reset QR code URLs
    setOcrTextParts([]); // Reset OCR text parts
    
    const extractedText = await onAnalyze(image);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const qrCode = jsQR(imageData.data, img.width, img.height);

      if (qrCode) {
        setQrCodeUrls((prev) => [...prev, qrCode.data]);
      }
    };

    setOcrTextParts(extractedText.split("\n"));
    setShowFooter(true); // Show the footer after analysis
  };

  useEffect(() => {
    // Check for UPI link
    const upiMatch = qrCodeUrls.find((url) => url.match(/upi:\/\/[^\s]+/));
    if (upiMatch) {
      setUpiLink(upiMatch); // Set the UPI link
    }
  }, [qrCodeUrls]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Text copied!"); // Show toast
  };

  return (
    <>
      <div className="fullscreen-image-modal-overlay">
        <div className="fullscreen-image-modal">
          {/* Header */}
          <div className="full-screen-modal-header">
            <button className="full-screen-icon-button" onClick={onClose} title="Go Back">
              <FaArrowLeft />
            </button>
            <div className="header-icons">
              <button className="full-screen-icon-button" onClick={handleAnalyze} title="Analyze">
                <FaQrcode />
              </button>
              <button className="full-screen-icon-button" title="Zoom In">
                <FaSearchPlus />
              </button>
              <button className="full-screen-icon-button" title="Zoom Out">
                <FaSearchMinus />
              </button>
              <button className="full-screen-icon-button" title="Favorite">
                <FaRegStar />
              </button>
              <button className="full-screen-icon-button" title="React">
                <FaRegSmile />
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className="full-screen-modal-content"
            onClick={onClose} // Close modal when clicking on empty space
          >
            <img
              src={image}
              alt="Full View"
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()} // Prevent click propagation to modal close
            />
          </div>

          {/* QR Codes and Extracted Text */}
          {showFooter && (
            <div className="full-screen-modal-footer">
              <div className="full-screen-footer-content">
                {qrCodeUrls.length > 0 && (
                  <div className="full-screen-qr-code-section">
                    <h4>QR Codes:</h4>
                    {qrCodeUrls.map((url, index) => (
                      <div key={index} className="full-screen-text-part">
                        <span>{url}</span>
                        <button
                          className="full-screen-copy-button"
                          onClick={() => handleCopy(url)}
                          title="Copy text"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {ocrTextParts.length > 0 && (
                  <div className="full-screen-ocr-text-section">
                    <h4>Extracted Text:</h4>
                    {ocrTextParts.map((part, index) => (
                      part && <div key={index} className="full-screen-text-part">
                        <span>{part}</span>
                        <button
                          className="full-screen-copy-button"
                          onClick={() => handleCopy(part)}
                          title="Copy text"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {upiLink && (
        <UPIPaymentModal upiLink={upiLink} onClose={() => setUpiLink(null)} />
      )}
    </>
  );
}