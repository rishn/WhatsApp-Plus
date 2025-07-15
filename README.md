# WhatsApp Plus - Smart Features for Enhanced Messaging

**Empowering WhatsApp users with advanced features like OCR and Scheduled Messaging.**

---

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/WhatsAppPlus.png?raw=true" alt="WhatsApp Plus" width="300"/>
</p>

## 📖 Overview

**WhatsApp Plus** integrates powerful features into WhatsApp Web, enabling users to:
- Extract text and QR data from images with **Smart Scan**.
- Schedule messages and images for future delivery with **Scheduled Send**.

This privacy-first, on-device solution enhances productivity and streamlines communication.

---

## 📹 Demos

Watch WhatsApp Plus in action: 
<p align="center">
  <a href="https://drive.google.com/file/d/1w3yzi3O1wO7HWPpdN8QJA0Xh7XT0H9DL/view">
    <img src="https://github.com/user-attachments/assets/0bbc3f9b-7999-48b4-a290-f9cf7c930dc2" alt="Watch Smart Scan Windows Opera Demo" width="600">
  </a>
</p>

<p align="center">
  <a href="https://drive.google.com/file/d/1nPPux3LqDjCP-mYC7YgkmHHIGD2ru1fw/view">
    <img src="https://github.com/user-attachments/assets/3fda7e86-0b27-4638-a61c-6f1ba34ec1c5" alt="Watch Scheduled Send Windows Opera Demo" width="600">
  </a>
</p>

---

## 🚀 Try the Prototype Live

👉 **Check out the prototype here:** [WhatsApp Plus](https://whatsapp-plus.onrender.com)  
> _Test it with images of invoices, QR codes, or handwritten notes!_

---

## 🚨 Problem Overview

### **User Pain Points**
WhatsApp users often face challenges such as:
1. Extracting actionable information from images (e.g., QR codes, invoices, notes).
2. Scheduling messages for future delivery without relying on external tools.

These limitations introduce **workflow friction**, **latency**, and **privacy concerns**, especially in fast-paced scenarios.

---

## 💡 Solution: WhatsApp Plus

WhatsApp Plus integrates **Smart Scan** and **Scheduled Send** directly into WhatsApp Web, enabling users to:
- Extract actionable content from images without leaving the app.
- Schedule messages and images for future delivery seamlessly.

---

## 📖 Features

### **Smart Scan**
#### Overview
Smart Scan enables WhatsApp users to instantly extract text and QR data from images — with privacy-first, on-device OCR.

#### Key Features
- **Extraction**: Extracts clean, copyable text from any image.
- **UPI QR Code Detection**: Detect UPI IDs and QR codes for payments.
- **Contextual Actions**:
  - Copy text or UPI links.
  - Initiate payments via UPI apps (e.g., GPay, PhonePe, Paytm, WhatsApp Pay).
  - Translate text (future enhancement).
- **Responsive UI**:
  - Close modals by clicking outside the modal or on the sidebar.

---

### **Scheduled Send**
#### Overview
Scheduled Send allows users to plan and automate the delivery of messages and images at a specified time, ensuring timely communication.

#### Key Features
- **Message Scheduling**: Schedule text messages and images for future delivery.
- **Precise Timing**: Set delivery times with an intuitive date-time picker.
- **Automation**: Ensure timely communication without manual intervention.
- **Flexibility**: Supports one-time scheduling or recurring messages.
- **Forwarding Messages**: Allows users to forward content including scheduled ones, to other chats, ensuring seamless sharing of scheduled content across conversations.

---

## 🖼️ Screenshots

### **1. Image Preview Modal**
The `ImagePreviewModal` allows users to view and analyze images. Extracted text and QR codes are displayed with actionable buttons.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/ImagePreviewModal.png?raw=true" alt="Image Preview Modal" />
</p>

---

### **2. UPI Payment Modal**
The `UPIPaymentModal` detects UPI QR codes and provides options to copy the UPI link or initiate payments.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/UPIPaymentModal.png?raw=true" alt="UPI Payment Modal" />
</p>

---

### **3. Scheduled Send Utility**
The `Scheduled Send` feature allows users to schedule text messages and images for future delivery.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/ScheduledSendUtility.png?raw=true" alt="Scheduled Send Utility" />
</p>

---

### **4. Forward Message Modal**
The `ForwardMessageModal` allows users to forward text messages and images, even scheduled ones to other chats.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/ForwardMessageModal.png?raw=true" alt="Forward Message Modal" />
</p>

---

## 🛠️ Technical Details

### **Architecture**
- **OCR Engine**: Uses lightweight libraries like `Tesseract.js` and `jsQR` for text and QR code detection.
- **Scheduling Engine**: Built with React and JavaScript, leveraging precise date-time handling.
- **On-Device Processing**: Ensures user privacy and low latency.

### Feature Architecture Flow
<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/SmartScanFeatureArchitectureFlow.png?raw=true" alt="Feature Architecture Flow" />
</p>

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/ScheduledSendFeatureArchitectureFlow.png?raw=true" alt="Feature Architecture Flow" />
</p>

### **Key Components**
1. **ImagePreviewModal**:
   - Displays images with extracted text and QR codes.
   - Allows users to copy text or analyze images.
2. **UPIPaymentModal**:
   - Detects UPI QR codes and provides actionable options.
3. **Scheduled Send**:
   - Enables users to schedule text messages and images for future delivery.
4. **ForwardMessageModal**:
   - Allows users to forward text messages and images, including scheduled ones.
5. **Toast Notifications**:
   - Provides feedback (e.g., "Text copied!" or "Message scheduled!") using a light-themed WhatsApp-style UI.

---

## 📊 Benefits

### **For Users**
#### Smart Scan
- **Time Efficiency**: Reduces OCR processing time from ~30 seconds (third-party apps) to ~3 seconds.
- **Privacy**: On-device processing ensures secure data handling.
- **Convenience**: No switching apps. No copy-pasting. Just scan and act.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/SmartScanUXComparison.png?raw=true" alt="Feature Architecture Flow" />
</p>

#### Scheduled Send
- **Convenience**: Enables users to plan communications in advance, reducing last-minute stress.
- **Consistency**: Ensures messages are delivered at optimal times, improving engagement rates.
- **Flexibility**: Supports one-time scheduling or recurring messages for ongoing campaigns.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/ScheduledSendUseCase.png?raw=true" alt="Feature Architecture Flow" />
</p>

---

### **For Businesses**
#### Smart Scan
- **Faster Payments**: Accelerates QR-based checkouts and payments.
- **Improved Productivity**: Streamlines workflows for SMBs and micro-entrepreneurs.
- **Enhanced Engagement**: Increases time spent within WhatsApp.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/SmartScanTimeSavings.png?raw=true" alt="Feature Architecture Flow" />
</p>

#### Scheduled Send
- **Improved Productivity**: Frees up time by automating routine communication tasks.
- **Enhanced Engagement**: Delivers messages when recipients are most likely to respond, boosting effectiveness.
- **Scalable**: Handles large recipient lists without compromising delivery speed or accuracy.

<p align="center">
  <img src="https://github.com/rishn/WhatsApp-Plus/blob/main/assets/ScheduledSendAdoptionGrowth.png?raw=true" alt="Feature Architecture Flow" />
</p>

---

## 🏆 Competitive Advantage

| Platform               | Built-in OCR   | Scheduled Messaging | Contextual Actions             | Needs External App |
|------------------------|----------------|----------------------|--------------------------------|---------------------|
| **Google Lens**        | ✅ Yes          | ❌ No                | ✅ Rich                         | ❌ No               |
| **iMessage (iOS)**     | ✅ Live Text    | ❌ No                | ✅ Copy, Translate, Call        | ❌ No               |
| **Telegram**           | ❌ No           | ✅ Yes               | ❌ Limited                      | ✅ Yes              |
| **WhatsApp (Now)**     | ❌ Partial      | ❌ No                | ❌ Very Limited                 | ✅ Yes              |
| **WhatsApp Plus**      | ✅ Yes          | ✅ Yes               | ✅ Copy, Pay, Schedule          | ❌ No               |

---

## 📈 Future Enhancements

- **Multilingual OCR**: Auto-detect languages and provide translation suggestions.
- **Advanced Scheduling**: Add recurring message scheduling.
- **Barcode Scanning**: Extend support to barcodes and event tickets.

---

## 🧑‍💻 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rishn/WhatsApp-Plus.git
   cd WhatsApp-Plus
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
4. Open the app in your browser:
    ```bash
    http://localhost:3000
    ```

---

## 🙌 Acknowledgments
- **Libraries Used**:
  - [Tesseract.js](https://github.com/naptha/tesseract.js) - For text recognition.
  - [jsQR](https://github.com/cozmo/jsQR) - For QR code detection.

- **Inspiration**:
  - WhatsApp's existing UPI QR detection.
  - Google Lens for its seamless OCR capabilities.
  - Microsoft Teams Messaging for its intuitive scheduling interface, inspiring Scheduled Send.