import React, { useState, useEffect } from "react";
import { ToastProvider } from "./components/ToastProvider";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ForwardMessageModal from "./components/ForwardMessageModal"; // Import ForwardMessageModal
import TestUPIQR from "./assets/TestUPIQR.png"; // Import the test image
import TestInvoice from "./assets/TestInvoice.png"; // Import the test image
import "./App.css";

export default function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [messageToForward, setMessageToForward] = useState(null);
  const [modalPosition, setModalPosition] = useState(null); // State for modal position
  const [messagesByChatId, setMessagesByChatId] = useState(() => {
    const now = new Date();    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const fiveSecondsAgo = new Date(yesterday.getTime() - 5000);
    const tenSecondsAgo = new Date(yesterday.getTime() - 10000);
    const fifteenSecondsAgo = new Date(yesterday.getTime() - 15000);
    const twentySecondsAgo = new Date(yesterday.getTime() - 20000);

    return {
      1: [
        { id: twentySecondsAgo, sender: "bot", content: "Hey there! Upload an image to scan text.", type: "text" },
        { id: fifteenSecondsAgo, sender: "bot", content: "Please pay via the UPI ID shared below.", type: "text" },
        { id: tenSecondsAgo, sender: "bot", content: TestUPIQR, type: "image" }, // Add the image message
        { id: fiveSecondsAgo, sender: "bot", content: "I'm sharing the invoice here.", type: "text" },
        { id: yesterday, sender: "bot", content: TestInvoice, type: "image" }, // Add the image message
      ],
      2: [
        { id: twentySecondsAgo, sender: "bot", content: "Hey there! Upload an image to scan text.", type: "text" },
      ],
      3: [
        { id: twentySecondsAgo, sender: "bot", content: "Hey there! Upload an image to scan text.", type: "text" },
        { id: fifteenSecondsAgo, sender: "bot", content: TestInvoice, type: "image" }, // Add the image message
        { id: tenSecondsAgo, sender: "bot", content: "I'm sharing the invoice here.", type: "text" },
      ],
    };
  });

  const contacts = [
    { id: 1, name: "Consultancy Solutions" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Support Agent" },
  ];

  const handleForwardMessage = (selectedIds) => {
    if (!messageToForward) return;
  
    const updatedMessagesByChatId = { ...messagesByChatId };
  
    selectedIds.forEach((id) => {
      const newMessage = {
        ...messageToForward,
        sender: "user", // Set the sender to "user" for forwarded messages
        id: new Date(), // Ensure unique ID
        scheduledFor: messageToForward.scheduledFor, // Keep the scheduled time
      };
      updatedMessagesByChatId[id] = [...(updatedMessagesByChatId[id] || []), newMessage];
    });
  
    setMessagesByChatId(updatedMessagesByChatId);
    setShowForwardModal(false);
    setMessageToForward(null);
  };

  const updateMessagesForChat = (chatId, updatedMessages) => {
    setMessagesByChatId((prev) => ({
      ...prev,
      [chatId]: updatedMessages,
    }));
  };

  // Global interval to check for scheduled messages
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setMessagesByChatId((prev) => {
        const updatedChats = { ...prev };

        Object.keys(updatedChats).forEach((chatId) => {
          updatedChats[chatId] = updatedChats[chatId].map((msg) => {
            if (msg.scheduledFor && msg.scheduledFor <= now && !msg.wasScheduled) {
              return { ...msg, wasScheduled: true };
            }
            return msg;
          }).sort((a, b) => {
            // Sort messages by scheduled time or ID
            if (a.wasScheduled && b.wasScheduled) {
              return a.scheduledFor === b.scheduledFor ? a.id - b.id : a.scheduledFor - b.scheduledFor;
            }

            if (a.wasScheduled) {
              return a.scheduledFor ?? a.id - b.id;
            }

            if (b.wasScheduled) {
              return a.id - b.scheduledFor ?? b.id;
            }

            return a.id - b.id;
          });
        });

        return updatedChats;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ToastProvider>
      <div className="app-container">
        <Sidebar
          onSelectChat={setSelectedChat}
          selectedChatId={selectedChat?.id}
          messagesByChatId={messagesByChatId}
          contacts={contacts}
        />
        <ChatWindow
          selectedChatId={selectedChat?.id}
          messagesByChatId={messagesByChatId}
          updateMessagesForChat={updateMessagesForChat}
          onForward={(message, position) => {
            setMessageToForward(message);
            setModalPosition(position); // Set the modal position
            setShowForwardModal(true);
          }}
          contacts={contacts}
        />
        {showForwardModal && (
          <ForwardMessageModal
            contacts={contacts}
            onClose={() => setShowForwardModal(false)}
            onForward={handleForwardMessage}
            position={modalPosition} // Pass the modal position
          />
        )}
      </div>
    </ToastProvider>
  );
}