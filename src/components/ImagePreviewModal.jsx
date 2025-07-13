import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes, FaPlus, FaRegPaperPlane, FaRegTrashAlt, FaQrcode, FaCopy, FaClock } from "react-icons/fa";
import { useToast } from "./ToastProvider";
import jsQR from "jsqr";
import DatePicker from "react-datepicker";
import UPIPaymentModal from "./UPIPaymentModal"; // Import the UPI modal
import "react-datepicker/dist/react-datepicker.css";
import "../styles/ImagePreviewModal.css";

export default function ImagePreviewModal({ images, onClose, onAnalyze, onSend, onUpdateImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState({}); // Store analysis data for each image
  const [upiLink, setUpiLink] = useState(null); // State for UPI link
  const [showPicker, setShowPicker] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const { showToast } = useToast(); // Get showToast function

  const currentImage = images[currentIndex];

  const handleOverlayClick = (e) => {
    // Check if the click is outside the modal
    if (
      e.target.classList.contains("image-preview-modal-overlay") || // Click on overlay
      e.target.closest(".sidebar") // Click inside the sidebar
    ) {
      onClose(); // Close the modal
    }
  };

  const handleAnalyze = async () => {
    const extractedText = await onAnalyze(currentImage);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = URL.createObjectURL(currentImage);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const qrCode = jsQR(imageData.data, img.width, img.height);

      const qrCodes = qrCode ? [qrCode.data] : [];

      // Update analysis data for the current image
      setAnalysisData((prev) => ({
        ...prev,
        [currentIndex]: {
          ocrText: extractedText.split("\n"),
          qrCodes,
        },
      }));
    };
  };

  useEffect(() => {
    // Check for UPI link in the QR codes of the current image
    const currentData = analysisData[currentIndex];
    if (currentData && currentData.qrCodes) {
      const upiMatch = currentData.qrCodes.find((url) => url.match(/upi:\/\/[^\s]+/));
      if (upiMatch) {
        setUpiLink(upiMatch); // Set the UPI link
      } else {
        setUpiLink(null); // Clear UPI link if not found
      }
    } else {
      setUpiLink(null); // Clear UPI link if no data exists
    }
  }, [currentIndex, analysisData]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Text copied!"); // Show toast
  };

  const handleDeleteImage = () => {
    if (images.length === 1) {
      onClose();
    } else {
      const updatedImages = images.filter((_, index) => index !== currentIndex);
      const newIndex = currentIndex === updatedImages.length ? currentIndex - 1 : currentIndex;
      setCurrentIndex(newIndex);
      onUpdateImages(updatedImages);

      // Remove analysis data for the deleted image
      setAnalysisData((prev) => {
        const updatedData = { ...prev };
        delete updatedData[currentIndex];
        return updatedData;
      });
    }
  };

  const handleAddMoreImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...images, ...files];
      onUpdateImages(newImages);
    }
    e.target.value = "";
  };

  // Function to filter times for the current day
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    // Only filter times if the selected date is today
    if (selectedDate.getDate() === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()) {
      return selectedDate.getTime() > currentDate.getTime();
    }
    // For other days (future days), all times are allowed
    return true;
  };

  const currentData = analysisData[currentIndex] || { ocrText: [], qrCodes: [] };

  return (
    <>
      <div className="image-preview-modal-overlay" onClick={handleOverlayClick}>
        <div className="image-preview-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="icon-button edit-button" title="Edit">
              <FaEdit />
            </button>
            <button className="icon-button lens-button" onClick={handleAnalyze} title="Analyze">
              <FaQrcode />
            </button>
            <button className="icon-button delete-button" onClick={handleDeleteImage} title="Delete">
              <FaRegTrashAlt />
            </button>
            <button className="icon-button close-button" onClick={onClose} title="Close">
              <FaTimes />
            </button>
          </div>

          <div className="modal-content">
            <img src={URL.createObjectURL(currentImage)} alt="Preview" className="preview-image" />
            <div className="image-navigation">
              {images.length > 1 && (
                <>
                  <button
                    className="nav-button"
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                  >
                    ◀
                  </button>
                  <span>{`${currentIndex + 1} / ${images.length}`}</span>
                  <button
                    className="nav-button"
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))}
                    disabled={currentIndex === images.length - 1}
                  >
                    ▶
                  </button>
                </>
              )}
            </div>
            {currentData.qrCodes.length > 0 && (
              <div className="qr-code-section">
                <h4>QR Codes Detected:</h4>
                {currentData.qrCodes.map((url, index) => (
                  <div key={index} className="text-part">
                    <span>{url}</span>
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(url)}
                      title="Copy QR code URL"
                    >
                      <FaCopy />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {currentData.ocrText.length > 0 && (
              <div className="ocr-text-section">
                <h4>Extracted Text:</h4>
                {currentData.ocrText.map((part, index) => (
                  part && <div key={index} className="text-part">
                    <span>{part}</span>
                    <button
                      className="copy-button"
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

          <div className="modal-footer">
            <label htmlFor="add-more-images" className="icon-button add-more-button">
              <FaPlus />
            </label>
            <input
              type="file"
              id="add-more-images"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleAddMoreImages}
            />

            {showPicker && (
              <DatePicker
                selected={scheduleTime ? new Date(scheduleTime) : null}
                onChange={(date) => setScheduleTime(date.toISOString())}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                filterTime={filterPassedTime}
                timeIntervals={5}
                className="schedule-input"
                placeholderText="Select date and time"
                popperPlacement="top-end"
                showPopperArrow={false}
              />
            )}

            <button
              onClick={() => {
                setShowPicker(!showPicker);
                // When showing the picker, if scheduleDate is null or in the past,
                // set it to the current time to guide the user to a valid selection.
                if (!showPicker && (!scheduleTime || scheduleTime < new Date())) {
                  const now = new Date();
                  // Round up to the next interval if timeIntervals is used, e.g., if now is 5:36 and interval is 15, set to 5:45
                  const interval = 5; // Match timeIntervals
                  const minutes = now.getMinutes();
                  const remainder = minutes % interval;
                  if (remainder !== 0) {
                    now.setMinutes(minutes + (interval - remainder));
                  }
                  now.setSeconds(0);
                  now.setMilliseconds(0);
                  setScheduleTime(now);
                }
              }}
              className={`icon-button ${showPicker ? "active" : ""}`}
              title="Schedule message"
            >
              <FaClock />
            </button>

            <button
              className="send-button"
              onClick={() => {
                if (showPicker && scheduleTime) {
                  onSend(images, scheduleTime); // scheduled send
                } else {
                  onSend(images, null); // immediate send
                }
                setScheduleTime("");
                setShowPicker(false);
              }}
              title={
                showPicker && scheduleTime
                  ? "Send Scheduled Image"
                  : "Send Now"
              }
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
      {upiLink && (
        <UPIPaymentModal upiLink={upiLink} onClose={() => setUpiLink(null)} />
      )}
    </>
  );
}