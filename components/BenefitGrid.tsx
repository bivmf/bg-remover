import { RETENTION_COPY } from "@/lib/constants";

const benefits = [
  { marker: "AI", title: "AI-powered", copy: "Advanced AI technology delivers clean, precise background removal.", className: "bg-[#C8E5FE] text-[#000A55]" },
  { marker: "HQ", title: "High quality", copy: "Download transparent PNGs ready for printing and digital use.", className: "bg-[#FFBECD] text-[#000A55]" },
  { marker: "$0", title: "100% free", copy: "No hidden fees. No sign up required.", className: "bg-[#0039A6] text-white" },
  { marker: "✓", title: "Secure & private", copy: RETENTION_COPY, className: "bg-[#F1F1F1] text-[#000A55]" },
];

export function BenefitGrid() {
  return <section className="bg-white py-20 lg:py-24"><div className="mx-auto max-w-[1320px] px-5 lg:px-10"><div className="mb-10 max-w-2xl"><p className="font-bold text-[#E00034]">Made for making</p><h2 className="mt-2 text-4xl font-black leading-tight text-[#000A55] sm:text-5xl">Fast, focused and ready for your next idea.</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((benefit) => <article key={benefit.title} className={`min-h-64 rounded-[28px] p-7 ${benefit.className}`}><span className="grid h-12 w-12 place-items-center rounded-full border-2 border-current font-black" aria-hidden="true">{benefit.marker}</span><h3 className="mt-8 text-2xl font-black">{benefit.title}</h3><p className="mt-3 leading-7">{benefit.copy}</p></article>)}</div></div></section>;
}
