import React from "react";
import { FaEdit, FaFilter, FaImage, FaClock } from "react-icons/fa"; // Import icons
import ProfileIconLight from "../assets/ProfileIconLight.png"; // Import a placeholder profile icon
import "../styles/Sidebar.css";

export default function Sidebar({ onSelectChat, selectedChatId, messagesByChatId, contacts }) {
  // Get the last message for the contact
  const getLastMessage = (chatId) => {
    const messages = messagesByChatId[chatId] || [];
    if (!Array.isArray(messages) || messages.length === 0) return "No messages yet";

    // Traverse in reverse to find the latest visible (sent or matured) message
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];

      const isFutureScheduled = msg.scheduledFor && !msg.wasScheduled;
      if (isFutureScheduled) continue; // skip scheduled-in-future messages

      if (msg.type === "image") {
        return (
          <>
            <FaImage /> Image
          </>
        );
      }

      return msg.content;
    }

    // If no sent/matured message found, fall back to showing the last scheduled message
    const nextScheduled = messages
      .slice()
      .reverse()
      .find((msg) => msg.scheduledFor && !msg.wasScheduled);

    if (nextScheduled) {
      return (
        <>
          <FaClock />{" "}
          {nextScheduled.type === "image" ? (
            <>
              <FaImage /> Image
            </>
          ) : (
            nextScheduled.content
          )}
        </>
      );
    }

    return "No messages yet";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>WhatsApp</span>
        <div className="sidebar-header-icons">
          <button className="header-icon" title="New chat / New group">
            <FaEdit />
          </button>
          <button className="header-icon" title="Filter chats by">
            <FaFilter />
          </button>
        </div>
      </div>
      <ul className="chat-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`chat-item ${contact.id === selectedChatId ? "active" : ""}`}
            onClick={() => onSelectChat(contact)}
          >
            <img
              src={ProfileIconLight} // Use avatar or fallback to default
              alt={contact.name || `Chat ${contact.id}`}
              className="contact-profile"
            />
            <div className="chat-details">
              <div className="chat-name">{contact.name}</div>
              <div className="chat-last-message">{getLastMessage(contact.id)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}