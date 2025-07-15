import React, { useState, useEffect } from "react";
import ProfileIconLight from "../assets/ProfileIconLight.png"; // Import a placeholder profile icon
import "../styles/ForwardMessageModal.css";

export default function ForwardMessageModal({ contacts, onClose, onForward, position }) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredContacts = contacts.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const modal = document.querySelector(".forward-modal");
    if (modal && position) {
      const modalWidth = 300; // Approximate width of the modal
      const modalHeight = 400; // Approximate height of the modal
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = position.top;
      let left = position.left;

      // Adjust position to ensure modal remains visible
      if (position.top + modalHeight > viewportHeight) {
        top = position.top - modalHeight; // Move modal above the clicked element
      }
      if (position.left + modalWidth * 2 > viewportWidth) {
        left = position.left - modalWidth; // Move modal to the left of the clicked element
      }
      if (position.top < 0) {
        top = position.top + modalHeight; // Move modal below the clicked element
      }
      if (position.left < 0) {
        left = position.left + modalWidth; // Move modal to the right of the clicked element
      }

      modal.style.top = `${top}px`;
      modal.style.left = `${left}px`;
    }
  }, [position]);

  return (
    <div className="forward-modal-overlay" onClick={onClose}>
      <div className="forward-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Forward to...</h3>
        <div className="search-bar">
          <div className="search-input-wrapper">
            <div className="selected-tags">
              {selectedIds.map((id) => {
                const contact = contacts.find((c) => c.id === id);
                return (
                  <span key={id} className="tag">
                    {contact.name || `Chat ${id}`}
                    <button
                      className="remove-tag"
                      onClick={() => toggleSelect(id)}
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
            </div>
            <input
              type="text"
              placeholder={selectedIds.length === 0 ? "Search" : ""}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {selectedIds.length > 0 && <button
          className="forward-text-button"
          onClick={() => onForward(selectedIds)}
        >
          Forward
        </button>}
        <div className="section-header">Frequently contacted</div>
        <ul className="contact-list">
          {filteredContacts.slice(0, 2).map((contact) => (
            <li key={contact.id} className="contact-item" onClick={() => toggleSelect(contact.id)}>
              <img
                src={ProfileIconLight} // Use avatar or fallback to default
                alt={contact.name || `Chat ${contact.id}`}
                className="contact-avatar"
              />
              <div>
                <div className="contact-name">{contact.name || `Chat ${contact.id}`}</div>
                <div className="contact-last-message">Hey there! I am using WhatsApp.</div>
              </div>
              <input
                type="checkbox"
                checked={selectedIds.includes(contact.id)}
                onClick={() => toggleSelect(contact.id)}
                onChange={() => toggleSelect(contact.id)}
              />
            </li>
          ))}
        </ul>
        <div className="section-header">Recent</div>
        <ul className="contact-list">
          {filteredContacts.slice(2).map((contact) => (
            <li key={contact.id} className="contact-item" onClick={() => toggleSelect(contact.id)}>
              <img
                src={ProfileIconLight} // Use avatar or fallback to default
                alt={contact.name || `Chat ${contact.id}`}
                className="contact-avatar"
              />
              <div>
                <div className="contact-name">{contact.name || `Chat ${contact.id}`}</div>
                <div className="contact-last-message">Hey there! I am using WhatsApp.</div>
              </div>
              <input
                type="checkbox"
                checked={selectedIds.includes(contact.id)}
                onChange={() => toggleSelect(contact.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}