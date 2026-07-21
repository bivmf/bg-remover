"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProcessedImage } from "./types";

export function BeforeAfterSlider({ image }: { image: ProcessedImage }) {
  const [position, setPosition] = useState(50);
  return <div className="relative overflow-hidden rounded-[24px] border-2 border-[#0039A6] bg-[#F1F1F1]">
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image src={image.originalUrl} alt="Original uploaded image" fill unoptimized sizes="(max-width: 1024px) 90vw, 580px" className="object-contain" />
      <div className="checkerboard absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><Image src={image.processedUrl} alt="Image with its background removed" fill unoptimized sizes="(max-width: 1024px) 90vw, 580px" className="object-contain" /></div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${position}%` }}><span className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[#0039A6] text-white shadow-lg" aria-hidden="true">↔</span></div>
      <span className="absolute left-3 top-3 rounded-full bg-[#000A55] px-3 py-1.5 text-xs font-bold text-white">Original</span><span className="absolute right-3 top-3 rounded-full bg-[#E00034] px-3 py-1.5 text-xs font-bold text-white">Background removed</span>
    </div>
    <label className="block bg-white px-5 py-4 text-sm font-bold text-[#000A55]">Move comparison divider
      <input className="mt-2 block w-full accent-[#0039A6]" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Before and after comparison position" />
    </label>
  </div>;
}
