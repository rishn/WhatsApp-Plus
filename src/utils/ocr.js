import Tesseract from "tesseract.js";

/**
 * Runs OCR on the provided image file.
 * @param {File} imageFile - The image file uploaded by the user.
 * @returns {Promise<string>} - The extracted text.
 */
export async function runOCR(imageFile) {
  try {
    const result = await Tesseract.recognize(imageFile, "eng", {});
    return result.data.text.trim();
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text. Please try again.");
  }
}
