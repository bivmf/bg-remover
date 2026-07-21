export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const RETENTION_COPY = process.env.NEXT_PUBLIC_IMAGE_RETENTION_COPY ?? "Images are processed securely and retained only as needed to provide the tool.";

export const FAQS = [
  { question: "Is Avery’s background remover free?", answer: "Yes. The Avery background remover is free to use and does not require an account." },
  { question: "Which image formats are supported?", answer: "You can upload JPG, JPEG, PNG, and WEBP images up to 25MB." },
  { question: "How do I make an image background transparent?", answer: "Upload an image, wait for AI background removal to finish, then download the result as a transparent PNG." },
  { question: "Can I remove a white background?", answer: "Yes. The AI identifies the main subject and can remove white, solid-color, or more complex backgrounds." },
  { question: "Is there a limit to how many images I can process?", answer: "There is no published daily limit for normal use, though temporary rate limits protect the service from abuse." },
  { question: "Are uploaded images stored?", answer: RETENTION_COPY },
  { question: "Can I use the transparent PNG for printing?", answer: "Yes. Download the high-resolution PNG and place it in an Avery design for stickers, labels, badges, or packaging." },
  { question: "Does this work on mobile?", answer: "Yes. On a phone or tablet, choose an image from your photo library or take a new photo, then download the transparent PNG." },
] as const;

export const USE_CASES = [
  { title: "Design custom stickers", label: "Stickers", href: "https://www.avery.com/custom-printing/stickers", accent: "#C8E5FE" },
  { title: "Create product labels", label: "Labels", href: "https://www.avery.com/custom-printing/labels", accent: "#FFBECD" },
  { title: "Make name badges", label: "Badges", href: "https://www.avery.com/templates/category/name-badges", accent: "#F1F1F1" },
  { title: "Build custom packaging", label: "Packaging", href: "https://www.avery.com/custom-printing", accent: "#0039A6" },
] as const;
