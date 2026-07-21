import { NextResponse } from "next/server";
import { deleteProcessedImage } from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const rateLimit = checkRateLimit(`cleanup:${key}`, 20);
  if (!rateLimit.allowed) return NextResponse.json({ error: "Please wait before trying cleanup again." }, { status: 429 });
  try {
    const body = await request.json() as { publicId?: unknown };
    if (typeof body.publicId !== "string") return NextResponse.json({ error: "A valid image identifier is required." }, { status: 400 });
    await deleteProcessedImage(body.publicId);
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Cloudinary cleanup failed", { type: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "We couldn't remove the temporary image right now." }, { status: 502 });
  }
}
