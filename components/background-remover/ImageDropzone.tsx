"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = { disabled: boolean; previewUrl?: string; onFile: (file: File) => void };

export function ImageDropzone({ disabled, previewUrl, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const handleFiles = (files: FileList | null) => { if (files?.[0]) onFile(files[0]); };
  return (
    <div className={`grid min-h-[410px] place-items-center rounded-[24px] border-2 border-dashed px-6 py-10 text-center transition-colors ${dragActive ? "border-[#E00034] bg-[#FFBECD]" : "border-[#2475E6] bg-[#F7F7F7]"}`}
      onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragActive(true); }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => { event.preventDefault(); if (event.currentTarget === event.target) setDragActive(false); }}
      onDrop={(event) => { event.preventDefault(); setDragActive(false); if (!disabled) handleFiles(event.dataTransfer.files); }}>
      <div className="w-full">
        {previewUrl ? <div className="relative mx-auto mb-6 h-48 w-full"><Image src={previewUrl} alt="Selected image preview" fill unoptimized sizes="(max-width: 1024px) 90vw, 520px" className="rounded-2xl object-contain" /></div> : <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#C8E5FE] text-3xl font-black text-[#0039A6]" aria-hidden="true">↑</div>}
        <h2 className="mt-5 text-2xl font-black text-[#000A55]">Drag &amp; drop an image here</h2>
        <p className="mt-2 text-[#000A55]">or</p>
        <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()} className="mt-5 min-h-12 rounded-full bg-[#0039A6] px-9 py-3 font-bold text-white hover:bg-[#2475E6] disabled:cursor-not-allowed disabled:opacity-60">Upload image</button>
        <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" capture={undefined} onChange={(event) => handleFiles(event.target.files)} disabled={disabled} aria-label="Choose a JPG, PNG, or WEBP image" />
        <p className="mt-5 text-sm font-medium text-[#000A55]">JPG, PNG, WEBP up to 25MB</p>
      </div>
    </div>
  );
}
