import React, { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext();
let toastTimeout = null; // Global flag to prevent multiple calls

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    if (toastTimeout) return; // Prevent multiple calls
    setToast(message);
    toastTimeout = setTimeout(() => {
      toastTimeout = null;
      setToast(null); // Clear the toast after duration
    }, 2500); // Reset after toast duration
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}