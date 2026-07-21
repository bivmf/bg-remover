"use client";

import { trackEvent } from "@/lib/analytics";
import type { ProcessedImage } from "./types";

export function ResultsActions({ image, onReset, onError }: { image: ProcessedImage; onReset: () => void; onError: (message: string) => void }) {
  async function download() {
    try {
      const response = await fetch(image.processedUrl);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = "avery-transparent-image.png"; anchor.click(); URL.revokeObjectURL(url);
      trackEvent("background_remover_download", { publicId: image.publicId });
    } catch { onError("We couldn't download your PNG. Check your connection and try again."); }
  }
  return <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} className="min-h-12 rounded-full bg-[#0039A6] px-8 py-3 font-bold text-white hover:bg-[#2475E6]">Download PNG</button><button type="button" onClick={onReset} className="min-h-12 rounded-full border-2 border-[#0039A6] px-8 py-3 font-bold text-[#0039A6] hover:bg-[#C8E5FE]">Remove another background</button></div>;
}
