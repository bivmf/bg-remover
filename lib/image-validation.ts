import { MAX_FILE_SIZE, SUPPORTED_IMAGE_TYPES } from "./constants";

export type ValidationResult = { valid: true } | { valid: false; code: "empty" | "size" | "type" | "signature"; error: string };

const isJpeg = (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
const isPng = (bytes: Uint8Array) => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
const isWebp = (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";

export function hasValidImageSignature(bytes: Uint8Array, mimeType: string) {
  if (mimeType === "image/jpeg") return isJpeg(bytes);
  if (mimeType === "image/png") return isPng(bytes);
  if (mimeType === "image/webp") return isWebp(bytes);
  return false;
}

export async function validateImageFile(file: Blob & { type: string; size: number }): Promise<ValidationResult> {
  if (!file || file.size === 0) return { valid: false, code: "empty", error: "Choose an image that contains data." };
  if (file.size > MAX_FILE_SIZE) return { valid: false, code: "size", error: "That image is larger than 25MB. Choose a smaller file and try again." };
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number])) return { valid: false, code: "type", error: "Choose a JPG, PNG, or WEBP image." };
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (!hasValidImageSignature(bytes, file.type)) return { valid: false, code: "signature", error: "That file does not appear to be a valid image. Try exporting it again." };
  return { valid: true };
}

export function sanitizeFilename(name: string) {
  const safe = name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-{2,}/g, "-").replace(/^[-.]+|[-.]+$/g, "");
  return (safe || "image").slice(0, 100);
}
