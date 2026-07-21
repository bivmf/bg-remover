"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { validateImageFile } from "@/lib/image-validation";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ImageDropzone } from "./ImageDropzone";
import { ProcessingStatus } from "./ProcessingStatus";
import { ResultsActions } from "./ResultsActions";
import type { ProcessedImage, ProcessingStage } from "./types";

const benefits = ["100% free to use", "AI-powered for clean results", "Download high-resolution PNG", "No sign up required"];

export function BackgroundRemoverHero() {
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [stage, setStage] = useState<ProcessingStage>("uploading");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [result, setResult] = useState<ProcessedImage>();
  const [message, setMessage] = useState("");
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  async function processFile(file: File) {
    const validation = await validateImageFile(file);
    if (!validation.valid) { setStatus("error"); setMessage(validation.error); trackEvent("background_remover_processing_failed", { reason: validation.code }); return; }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file)); setStatus("processing"); setStage("uploading"); setUploadProgress(0); setMessage("");
    trackEvent("background_remover_upload_started", { type: file.type, size: file.size });
    const formData = new FormData(); formData.append("image", file, file.name);
    const xhr = new XMLHttpRequest(); xhrRef.current = xhr; xhr.open("POST", "/api/remove-background"); xhr.timeout = 65000;
    xhr.upload.onprogress = (event) => { if (event.lengthComputable) setUploadProgress((event.loaded / event.total) * 100); };
    xhr.upload.onload = () => { setUploadProgress(100); setStage("removing"); trackEvent("background_remover_upload_completed"); };
    xhr.onload = () => {
      try {
        const payload = JSON.parse(xhr.responseText || "{}");
        if (xhr.status < 200 || xhr.status >= 300) throw new Error(payload.error || "We couldn't remove that background. Please try again.");
        setStage("preparing"); setTimeout(() => { setResult(payload); setStatus("success"); trackEvent("background_remover_processing_completed", { width: payload.width, height: payload.height }); }, 250);
      } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again."); trackEvent("background_remover_processing_failed"); }
    };
    xhr.onerror = () => { setStatus("error"); setMessage("Your connection was interrupted. Check it and try again."); trackEvent("background_remover_processing_failed", { reason: "network" }); };
    xhr.ontimeout = () => { setStatus("error"); setMessage("Background removal took too long. Try a smaller image or try again."); trackEvent("background_remover_processing_failed", { reason: "timeout" }); };
    xhr.onabort = () => { setStatus("idle"); setMessage("Processing canceled."); };
    xhr.send(formData);
  }

  function reset() { xhrRef.current?.abort(); if (result?.publicId) void fetch("/api/remove-background/cleanup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ publicId: result.publicId }), keepalive: true }).catch(() => undefined); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(undefined); setResult(undefined); setStatus("idle"); setMessage(""); setUploadProgress(0); trackEvent("background_remover_reset"); }

  return <section className="bg-[#C8E5FE] px-5 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
    <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
      <div className="lg:pb-8"><p className="inline-flex rounded-full bg-[#E00034] px-4 py-2 text-sm font-bold text-white">Free AI tool</p><h1 className="mt-6 max-w-xl text-5xl font-black leading-[.96] tracking-[-.02em] text-[#000A55] sm:text-7xl">AI background remover</h1><p className="mt-7 max-w-xl text-xl leading-8 text-[#000A55]">Remove image backgrounds instantly with AI. Get a transparent PNG in seconds.</p><ul className="mt-9 grid gap-4 text-base font-bold text-[#000A55] sm:grid-cols-2">{benefits.map((item) => <li key={item} className="flex items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[#0039A6]" aria-hidden="true">✓</span>{item}</li>)}</ul><p className="mt-10 border-l-4 border-[#E00034] pl-4 text-sm font-bold text-[#0039A6]">Your ideas, in your hands.</p></div>
      <div className="rounded-[32px] border-2 border-[#0039A6] bg-white p-3 shadow-[10px_10px_0_#0039A6] sm:p-5">
        {status === "processing" ? <ProcessingStatus stage={stage} uploadProgress={uploadProgress} onCancel={reset} /> : status === "success" && result ? <div className="text-[#000A55]"><h2 className="mb-2 text-3xl font-black">See the difference</h2><p className="mb-6">Instantly remove the background and download a transparent PNG.</p><BeforeAfterSlider image={result} /><p className="mt-3 text-sm font-medium">{result.width} × {result.height} px</p><ResultsActions image={result} onReset={reset} onError={(error) => { setMessage(error); setStatus("error"); }} /></div> : <ImageDropzone disabled={false} previewUrl={previewUrl} onFile={processFile} />}
        {status === "error" && <div className="mt-4 rounded-2xl border-2 border-[#E00034] bg-[#FFBECD] p-4 text-[#000A55]" role="alert"><p className="font-bold">We couldn’t process that image</p><p className="mt-1 text-sm">{message}</p><button type="button" onClick={reset} className="mt-3 min-h-11 font-bold text-[#0039A6] underline">Choose another image</button></div>}
        <p className="sr-only" aria-live="polite">{status === "processing" ? `${stage}. ${Math.round(uploadProgress)} percent uploaded.` : status === "success" ? "Background removal complete. Your transparent PNG is ready." : message}</p>
      </div>
    </div>
  </section>;
}
