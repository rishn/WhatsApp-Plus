import React, { useEffect, useState } from "react";
import "../styles/Toast.css";

export default function Toast({ message, onClose }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log("Toast mounted");
    const fadeTimer = setTimeout(() => {
      setFadeOut(true); // Trigger fade-out animation
    }, 2500); // Start fade-out after 2 seconds

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [onClose]);

  return (
    <div className={`toast ${fadeOut ? "fade-out" : ""}`}>
      {message}
    </div>
  );
}