# 📄 Product Specification: WhatsApp Plus – Smart Features for Enhanced Messaging

## 🧠 Overview

**WhatsApp Plus** is a privacy-focused, on-device solution built for WhatsApp Web. It empowers users with two powerful features:
1. **Smart Scan**: Extract actionable content from shared images — such as UPI QR codes, invoice numbers, or handwritten notes — without leaving the chat interface or compromising data privacy.
2. **Scheduled Send**: Plan and automate the delivery of messages and images at a specified time, ensuring timely communication.

---

## 📹 Demo

Watch WhatsApp Plus in action: 
<p align="center">
  <a href="https://drive.google.com/file/d/1w3yzi3O1wO7HWPpdN8QJA0Xh7XT0H9DL/view">
    <img src="https://github.com/user-attachments/assets/0bbc3f9b-7999-48b4-a290-f9cf7c930dc2" alt="Watch Windows Opera Demo" width="600">
  </a>
</p>

---

## 🎯 Problem Statement

Users often face challenges such as:
1. Extracting actionable information from images (e.g., QR codes, invoices, notes).
2. Scheduling messages for future delivery without relying on external tools.

These limitations introduce **workflow friction**, **latency**, and **privacy concerns**, especially in fast-paced scenarios.

---

## ✅ Solution

WhatsApp Plus integrates **Smart Scan** and **Scheduled Send** directly into WhatsApp Web, enabling:
- In-chat image analysis with contextual actions.
- Seamless scheduling of messages and images for future delivery.

All processing happens **on-device**, ensuring:
- Minimal latency
- Maximum privacy
- Smooth UX

---

## 🧪 Core Features

### **Smart Scan**
| Feature               | Description |
|----------------------|-------------|
| Text Extraction       | Extracts and highlights plain text from images |
| UPI QR Code Detection | Detects UPI QR codes and generates actionable buttons |
| Contextual Actions    | "Copy", "Pay via UPI", "Translate" |
| Responsive Modals     | Click outside or sidebar to close |
| Toast Notifications   | Feedback for actions (e.g., “Text copied!”) |

---

### **Scheduled Send**
| Feature                       | Description |
|------------------------------|-------------|
| Message Scheduling            | Schedule text messages and images for future delivery |
| Precise Timing                | Set delivery times with an intuitive date-time picker |
| Automation                    | Ensure timely communication without manual intervention |
| Flexibility                   | Supports one-time scheduling or recurring messages |
| Forwarding Scheduled Messages | Allows users to forward scheduled messages and images to other chats seamlessly. |

---

## 👤 Target Users

- General WhatsApp users
- Business owners managing invoices and reminders
- Students and professionals sharing notes or scheduling tasks
- Anyone exchanging information via image or planning future communication

---

## 🖼️ Screenshots

### **1. Image Preview Modal**
The `ImagePreviewModal` allows users to view and analyze images. Extracted text and QR codes are displayed with actionable buttons.

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/ImagePreviewModal.png?raw=true" alt="Image Preview Modal" />
</p>

---

### **2. UPI Payment Modal**
The `UPIPaymentModal` detects UPI QR codes and provides options to copy the UPI link or initiate payments.

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/UPIPaymentModal.png?raw=true" alt="UPI Payment Modal" />
</p>

---

### **3. Scheduled Send Utility**
The `Scheduled Send` feature allows users to schedule text messages and images for future delivery.

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/ScheduledSendUtility.png?raw=true" alt="Scheduled Send Utility" />
</p>

---

### **4. Forward Message Modal**
The `ForwardMessageModal` allows users to forward text messages and images, even scheduled ones to other chats.

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/ForwardMessageModal.png?raw=true" alt="Foward Message Modal" />
</p>

---

## 🔧 Technical Architecture

### Stack:
- **Frontend**: React (Create React App), CSS Modules
- **OCR Engine**: `Tesseract.js` (text), `jsQR` (QR codes)
- **Scheduling Engine**: JavaScript-based date-time handling
- **Data Handling**: All processing is run client-side — no data leaves the browser

### Feature Architecture Flow
<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/SmartScanFeatureArchitectureFlow.png?raw=true" alt="Smart Scan Feature Architecture Flow" />
</p>

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/ScheduledSendFeatureArchitectureFlow.png?raw=true" alt="Scheduled Send Feature Architecture Flow" />
</p>

### Component Breakdown:
1. `ImagePreviewModal` – displays uploaded image + OCR results
2. `UPIPaymentModal` – detects QR and enables UPI actions
3. `ScheduledSendDatePicker` – enables users to schedule messages and images
4. `ForwardMessageModal` - allows forwarding of messages, including scheduled ones
5. `useOcr()` hook – abstracts Tesseract/QR logic
6. `toast.ts` – minimal WhatsApp-styled feedback system

---

## 📱 User Flow

### **Smart Scan**
1. **User uploads or clicks on an image**
2. Modal opens with “Analyze” button
3. OCR runs on-device:
   - Text is displayed for copy/translation
   - QR codes are parsed for UPI info
4. User takes contextual action:
   - Copy / Pay / Translate

### **Scheduled Send**
1. **User composes a message or selects an image**
2. Opens the scheduling modal
3. Selects a date and time for delivery
4. Message is queued for delivery
5. Toast notification confirms scheduling

---

## 📈 Rollout Strategy

| Phase        | Description |
|--------------|-------------|
| **Internal Demo**  | Deploy on Render, validate with known users |
| **Beta Users**     | Enable via feature flag for early feedback |
| **Gradual Rollout**| 5% → 25% → 100% adoption on WhatsApp Web clones |
| **Official Release** | Optimize, polish UX, and publish write-ups |

---

## 🧪 Edge Cases & Considerations

### **Smart Scan**
- ❓ **Multiple QR codes in image?** → Show options for user to choose
- 💬 **Non-UPI QR codes?** → Graceful fallback with “Copy raw QR content”
- 📷 **Blurred or dark images?** → Add toast prompt to try clearer photo

### **Scheduled Send**
- 🕒 **Conflicting scheduled times?** → Queue messages in order of creation
- 📅 **Recurring messages?** → Add support for weekly/monthly scheduling
- 🌐 **Time zone handling?** → Ensure accurate delivery across regions

---

## 🛠 Future Enhancements

- 🔠 Multilingual OCR support
- 🔄 Barcode & event ticket scanning
- 📇 Add to Contacts, Open URLs
- 📦 Browser Extension version
- 🔁 Recurring message scheduling

---

## 📌 Status

### **🟢 Prototype complete and live.** 

WhatsApp Plus is ready for demo, feedback, and iterations.
👉 [Demo Link](https://whatsapp-plus.onrender.com)  

---

## 🤝 Call for Feedback

If you're a PM, engineer, or UX researcher passionate about productivity tools, messaging apps, or computer vision —  
👉 [Let’s connect on LinkedIn!](https://linkedin.com/in/rishaanjacob)  
I’d love to hear your thoughts on WhatsApp Plus.