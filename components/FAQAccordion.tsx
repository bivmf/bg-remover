"use client";

import { FAQS } from "@/lib/constants";

export function FAQAccordion() {
  return <section className="bg-white py-20 lg:py-24"><div className="mx-auto grid max-w-[1120px] gap-10 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-10"><div><p className="font-bold text-[#E00034]">Good to know</p><h2 className="mt-2 text-4xl font-black leading-tight text-[#000A55] sm:text-5xl">Questions, answered.</h2><p className="mt-5 max-w-sm leading-7 text-[#000A55]">Everything you need to start making transparent images for labels, stickers and more.</p></div><div className="divide-y-2 divide-[#C8E5FE] border-y-2 border-[#0039A6]">{FAQS.map((faq) => <details key={faq.question} className="group"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold text-[#000A55] marker:content-none">{faq.question}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#C8E5FE] text-2xl text-[#0039A6] group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span></summary><p className="pb-6 pr-12 leading-7 text-[#000A55]">{faq.answer}</p></details>)}</div></div></section>;
}
