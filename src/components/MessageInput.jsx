import React, { useState } from "react";
import {
  FaPaperclip,
  FaRegPaperPlane,
  FaRegSmile,
  FaMicrophone,
  FaClock
} from "react-icons/fa";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import its CSS
import "../styles/MessageInput.css";

export default function MessageInput({ onSendText, onScheduleText, onSendImage, isProcessing }) {
  const [inputText, setInputText] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null); // Will store Date object
  const [showPicker, setShowPicker] = useState(false);

  const handleSend = () => {
    if (isProcessing || (!inputText.trim())) return;

    if (showPicker && scheduleDate) { // scheduleDate is a Date object
      // Convert scheduleDate (Date object) to ISO string for your backend/onScheduleText
      // Make sure it includes seconds if your backend expects it, otherwise keep it to minute
      const scheduleTimeISO = scheduleDate.toISOString(); // YYYY-MM-DDTHH:mm

      // **Robust Validation before sending/scheduling**
      const currentDateTime = new Date();
      // Adjust currentDateTime to match the precision of react-datepicker's selection (usually minute)
      currentDateTime.setSeconds(0);
      currentDateTime.setMilliseconds(0);

      // If the selected date/time is in the past, prevent sending
      if (scheduleDate < currentDateTime) {
        alert("The selected time for scheduling is in the past. Please choose a future time.");
        setScheduleDate(null); // Clear the invalid input
        return; // Prevent scheduling
      }

      onScheduleText(inputText, scheduleTimeISO);

    } else {
      // normal message
      onSendText(inputText);
    }

    setInputText("");
    setScheduleDate(null);
    setShowPicker(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach((file) => onSendImage(file));
    }
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

  return (
    <div className="message-input">
      <button className="icon-button emoji-button" title="Emojis, GIFs, Stickers">
        <FaRegSmile />
      </button>

      <label htmlFor="image-upload" className="icon-button attach-button" title="Attach">
        <FaPaperclip />
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <input
        type="text"
        placeholder="Type a message"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={isProcessing}
      />

      {showPicker && (
        <DatePicker
          selected={scheduleDate} // Use scheduleDate state
          onChange={(date) => setScheduleDate(date)} // DatePicker gives you a Date object
          showTimeSelect // Enable time selection
          dateFormat="Pp" // Format for both date and time (e.g., Jun 15, 2025, 5:36 PM)
          minDate={new Date()} // Disable past dates
          filterTime={filterPassedTime} // Apply custom time filtering for current day
          timeIntervals={5} // Optional: Set time intervals (e.g., 5, 10, 15, 30 minutes)
          className="schedule-input" // Apply your existing CSS
          placeholderText="Select date and time"
          // Ensure the initial selection is always in the future when opening
          // by setting selected to new Date() if scheduleDate is null or in past
          // This prevents the picker from opening on a past time if scheduleDate was pre-filled with one
          popperPlacement="top-end" // Optional: Adjust picker's position
          showPopperArrow={false} // Optional: Hide the arrow
        />
      )}

      <button
        onClick={() => {
          setShowPicker(!showPicker);
          // When showing the picker, if scheduleDate is null or in the past,
          // set it to the current time to guide the user to a valid selection.
          if (!showPicker && (!scheduleDate || scheduleDate < new Date())) {
            const now = new Date();
            // Round up to the next interval if timeIntervals is used, e.g., if now is 5:36 and interval is 15, set to 5:45
            const interval =5; // Match timeIntervals
            const minutes = now.getMinutes();
            const remainder = minutes % interval;
            if (remainder !== 0) {
              now.setMinutes(minutes + (interval - remainder));
            }
            now.setSeconds(0);
            now.setMilliseconds(0);
            setScheduleDate(now);
          }
        }}
        className={`icon-button ${showPicker ? "active" : ""}`}
        title="Schedule message"
      >
        <FaClock />
      </button>

      <button
        onClick={handleSend}
        title={showPicker && scheduleDate ? "Schedule Message" : inputText.trim() ? "Send message" : "Record a voice message"}
      >
        {inputText.trim() ? <FaRegPaperPlane /> : <FaMicrophone />}
      </button>
    </div>
  );
}