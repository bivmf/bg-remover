export function Breadcrumbs() {
  return <nav className="mx-auto max-w-[1320px] px-5 py-4 text-sm font-medium text-[#0039A6] lg:px-10" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a className="underline-offset-4 hover:underline" href="https://www.avery.com">Home</a></li><li aria-hidden="true">/</li><li><a className="underline-offset-4 hover:underline" href="#">Software</a></li><li aria-hidden="true">/</li><li aria-current="page" className="font-bold text-[#000A55]">Background remover</li></ol></nav>;
}
