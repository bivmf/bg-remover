import { NextResponse } from "next/server";
import { removeBackground } from "@/lib/cloudinary";
import { sanitizeFilename, validateImageFile } from "@/lib/image-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

function clientKey(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local"; }

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(`remove:${clientKey(request)}`);
  if (!rateLimit.allowed) return NextResponse.json({ error: "Too many images were submitted. Wait a few minutes and try again." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } });
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data")) return NextResponse.json({ error: "Upload an image file using the form." }, { status: 415 });
    const formData = await request.formData();
    const image = formData.get("image");
    if (!(image instanceof File)) return NextResponse.json({ error: "Choose an image before submitting." }, { status: 400 });
    const validation = await validateImageFile(image);
    if (!validation.valid) return NextResponse.json({ error: validation.error, code: validation.code }, { status: validation.code === "size" ? 413 : 400 });
    const bytes = Buffer.from(await image.arrayBuffer());
    const result = await removeBackground(bytes, sanitizeFilename(image.name));
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Background removal failed.";
    const authFailure = /api key|api secret|cloudinary is not configured|unauthorized|authentication/i.test(message);
    const timeout = /timed out/i.test(message);
    console.error("Background removal request failed", { type: error instanceof Error ? error.name : "UnknownError", authFailure, timeout });
    return NextResponse.json({ error: authFailure ? "Image processing is temporarily unavailable. Please try again later." : timeout ? "Background removal took too long. Try a smaller image or try again." : "We couldn't remove that background. Try a different image or try again." }, { status: authFailure ? 503 : timeout ? 504 : 502 });
  }
}
