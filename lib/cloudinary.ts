import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

const FOLDER = "avery-background-remover";
const POLL_INTERVAL_MS = 1500;
const PROCESSING_TIMEOUT_MS = 50_000;

export type BackgroundRemovalResult = {
  originalUrl: string;
  processedUrl: string;
  publicId: string;
  width: number;
  height: number;
};

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
}

function upload(buffer: Buffer, filename: string) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Cloudinary upload timed out.")), 25_000);
    // Requires the Cloudinary AI Background Removal add-on/feature to be enabled.
    const stream = cloudinary.uploader.upload_stream({ resource_type: "image", folder: FOLDER, filename_override: filename, use_filename: false, unique_filename: true, overwrite: false, background_removal: "cloudinary_ai" }, (error, result) => {
      clearTimeout(timer);
      if (error || !result) reject(error ?? new Error("Cloudinary returned no upload result.")); else resolve(result);
    });
    stream.end(buffer);
  });
}

function getRemovalStatus(info: unknown): string | undefined {
  if (!info || typeof info !== "object") return undefined;
  const removal = (info as Record<string, unknown>).background_removal;
  if (!removal || typeof removal !== "object") return undefined;
  const ai = (removal as Record<string, unknown>).cloudinary_ai;
  if (!ai || typeof ai !== "object") return undefined;
  const status = (ai as Record<string, unknown>).status;
  return typeof status === "string" ? status.toLowerCase() : undefined;
}

async function waitForRemoval(publicId: string, initialInfo: unknown) {
  let status = getRemovalStatus(initialInfo);
  const deadline = Date.now() + PROCESSING_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (status === "complete" || status === "completed") return;
    if (status === "failed" || status === "error") throw new Error("Cloudinary could not remove this image background.");
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    const resource = await cloudinary.api.resource(publicId, { resource_type: "image" });
    status = getRemovalStatus(resource.info);
  }
  throw new Error(status ? "Cloudinary background removal timed out." : "Cloudinary did not report background-removal status. Confirm the AI Background Removal feature is enabled.");
}

export async function removeBackground(buffer: Buffer, filename: string): Promise<BackgroundRemovalResult> {
  configureCloudinary();
  const uploaded = await upload(buffer, filename);
  await waitForRemoval(uploaded.public_id, uploaded.info);
  const processedUrl = cloudinary.url(uploaded.public_id, { secure: true, format: "png", transformation: [{ effect: "background_removal" }] });
  return { originalUrl: uploaded.secure_url, processedUrl, publicId: uploaded.public_id, width: uploaded.width, height: uploaded.height };
}

export async function deleteProcessedImage(publicId: string) {
  configureCloudinary();
  if (!publicId.startsWith(`${FOLDER}/`)) throw new Error("Invalid image identifier.");
  await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
}
