"use client";

import { trackEvent } from "@/lib/analytics";

export function AverySoftwareCTA() {
  return <section className="bg-[#E00034] px-5 py-20 text-white lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-bold">Your ideas, in your hands.</p><h2 className="mt-3 max-w-3xl text-5xl font-black leading-[.98] sm:text-6xl">You have ideas. Avery makes them real.</h2><p className="mt-6 max-w-2xl text-lg leading-8">Design your next project with Avery templates, software and products made to stick.</p></div><a href="https://www.avery.com/software" onClick={() => trackEvent("background_remover_avery_cta_click")} className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-8 py-3 font-bold text-[#0039A6] hover:bg-[#C8E5FE]">Explore Avery software</a></div></section>;
}
