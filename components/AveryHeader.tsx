"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = ["Products", "Templates", "Software", "Blank Labels", "Custom Printing", "Help"];

export function AveryHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="bg-[#0039A6] text-white">
        <div className="mx-auto flex min-h-9 max-w-[1320px] items-center justify-between px-5 text-xs font-bold lg:px-10">
          <p>Ideas stick here.</p>
          <div className="hidden items-center gap-5 sm:flex"><a href="#">Order status</a><a href="#">Contact us</a><a href="#">My account</a></div>
        </div>
      </div>
      <div className="border-b border-[#F1F1F1] bg-white">
        <div className="mx-auto flex h-[96px] max-w-[1320px] items-center justify-between px-5 lg:h-[104px] lg:px-10">
          <a href="https://www.avery.com" className="flex min-h-14 min-w-[148px] items-center pr-9" aria-label="Avery home">
            <Image src="/avery-logo.png" width={648} height={308} priority alt="Avery" className="h-auto w-[108px] lg:w-[112px]" />
          </a>
          <nav className="hidden h-full items-center gap-7 text-sm font-bold text-[#000A55] lg:flex" aria-label="Main navigation">
            {navItems.map((item) => <a key={item} href="#" className={`flex h-full items-center border-b-4 pt-1 transition-colors ${item === "Software" ? "border-[#E00034] text-[#0039A6]" : "border-transparent hover:border-[#C8E5FE] hover:text-[#0039A6]"}`}>{item}</a>)}
          </nav>
          <div className="flex items-center gap-2 text-[#000A55]">
            <button className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-[#F1F1F1]" aria-label="Search"><span className="text-xl" aria-hidden="true">⌕</span></button>
            <button className="hidden min-h-11 rounded-full border-2 border-[#0039A6] px-5 text-sm font-bold text-[#0039A6] hover:bg-[#C8E5FE] sm:block">Sign in</button>
            <button className="grid min-h-11 min-w-11 place-items-center rounded-full bg-[#0039A6] text-white lg:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu"><span className="text-xl" aria-hidden="true">{open ? "×" : "☰"}</span></button>
          </div>
        </div>
      </div>
      {open && <nav id="mobile-menu" className="border-b border-[#F1F1F1] bg-white px-5 py-3 lg:hidden" aria-label="Mobile navigation">{navItems.map((item) => <a key={item} href="#" className={`block min-h-11 border-l-4 px-4 py-3 font-bold ${item === "Software" ? "border-[#E00034] bg-[#F7F7F7] text-[#0039A6]" : "border-transparent text-[#000A55]"}`}>{item}</a>)}</nav>}
    </header>
  );
}
