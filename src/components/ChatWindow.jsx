import React, { useState, useEffect } from "react";
import { FaLock, FaVideo, FaPhone, FaSearch, FaShare } from "react-icons/fa"; // Import icons
import { runOCR } from "../utils/ocr";
import MessageInput from "./MessageInput";
import ImagePreviewModal from "./ImagePreviewModal";
import FullScreenImageModal from "./FullScreenImageModal"; // Import the new modal
import WhatsAppLogo from "../assets/WhatsApp.png"; // Import WhatsApp logo
import ProfileIconLight from "../assets/ProfileIconLight.png"; // Import a placeholder profile icon
import "../styles/ChatWindow.css";

export default function ChatWindow({ selectedChatId, messagesByChatId, updateMessagesForChat, onForward, contacts }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null); // State for full-screen image

  const messages = messagesByChatId[selectedChatId] || [];

  useEffect(() => {
    if (!selectedChatId) return; // Ensure a chat is selected

    const interval = setInterval(() => {
      const now = new Date();
      const updatedMessages = messages.map((msg) => {
        if (msg.scheduledFor && msg.scheduledFor <= now) {
          return {
            ...msg,
            wasScheduled: true,
          };
        }
        return msg;
      });

      updateMessagesForChat(selectedChatId, updatedMessages); // Update messages for the selected chat
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedChatId, messages]); // Dependencies

  const addMessage = (sender, content, type = "text", scheduledFor = null) => {
    const updatedMessages = [
      ...messages,
      {
        id: new Date(), // Ensure unique ID
        sender,
        content,
        type,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null, // Store as Date object
      },
    ];
    updateMessagesForChat(selectedChatId, updatedMessages);
  };

  const handleSendText = (text) => {
    addMessage("user", text, "text");
  };

  const handleScheduleText = (text, dateTime) => {
    addMessage("user", text, "text", dateTime);
  };

  const handleSendImage = (file) => {
    setPreviewImages((prev) => [...prev, file]);
  };

  const handleAnalyzeImage = async (image) => {
    setIsProcessing(true);
    try {
      const extractedText = await runOCR(image);
      return extractedText || "(No text detected)";
    } catch (err) {
      return err.message;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendImages = (images, scheduledFor = null) => {
    const updatedMessages = [
      ...messages,
      ...images.map((image, index) => ({
        id: new Date(), // ensure unique + consistent sorting
        sender: "user",
        content: URL.createObjectURL(image),
        type: "image",
        scheduledFor: new Date(scheduledFor),
      })),
    ];
    updateMessagesForChat(selectedChatId, updatedMessages);
    setPreviewImages([]);
  };

  const handleForwardClick = (event, message) => {
    const rect = event.target.getBoundingClientRect(); // Get the position of the clicked element
    const position = { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
    onForward(message, position); // Pass the message and position to the parent
  };

  if (!selectedChatId) {
    return (
      <div className="chat-window">
        <div className="chat-placeholder">
          <div className="placeholder-content">
            <img src={WhatsAppLogo} alt="WhatsApp Logo" className="whatsapp-logo" />
            <h1>WhatsApp Web</h1>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
          </div>
          <div className="placeholder-footer">
            <FaLock className="lock-icon" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-left">
          <img src={ProfileIconLight} alt="Profile" className="profile-icon" />
          <span><strong>{contacts.find((contact) => contact.id === selectedChatId).name}</strong></span>
        </div>
        <div className="chat-header-right">
          <button className="header-icon" title="Video call">
            <FaVideo />
          </button>
          <button className="header-icon" title="Voice call">
            <FaPhone />
          </button>
          <button className="header-icon" title="Search within chat">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="chat-messages">
        {(Array.isArray(messages) ? messages : [])
          .slice() // shallow copy
          .map((msg) => {
            const isScheduled = msg.scheduledFor && !msg.wasScheduled;

            return (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.type === "image" ? (
                  <img
                    src={msg.content}
                    alt="Sent"
                    className="sent-image"
                    onClick={() => setFullscreenImage(msg.content)}
                  />
                ) : (
                  msg.content
                )}
                {isScheduled && (
                  <div className="scheduled-time">
                    {`(Scheduled for: ${msg.scheduledFor.toLocaleString()})`}
                  </div>
                )}
                <button
                  className={`forward-button ${msg.sender === "user" ? "left" : "right"}`}
                  title="Forward message"
                  onClick={(e) => handleForwardClick(e, msg)}
                >
                  <FaShare />
                </button>
              </div>
            );
          })}
      </div>
      <MessageInput
        onSendText={handleSendText}
        onSendImage={handleSendImage}
        onScheduleText={handleScheduleText} // New
        isProcessing={isProcessing}
      />

      {previewImages.length > 0 && (
        <ImagePreviewModal
          images={previewImages}
          onClose={() => setPreviewImages([])}
          onAnalyze={handleAnalyzeImage}
          onSend={handleSendImages}
          onUpdateImages={(updatedImages) => setPreviewImages(updatedImages)}
        />
      )}
      {fullscreenImage && (
        <FullScreenImageModal
          image={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
          onAnalyze={handleAnalyzeImage}
        />
      )}
    </div>
  );
}