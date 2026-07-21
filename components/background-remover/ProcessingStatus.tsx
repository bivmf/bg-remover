import type { ProcessingStage } from "./types";

const stages: { key: ProcessingStage; label: string }[] = [
  { key: "uploading", label: "Uploading image" },
  { key: "removing", label: "Removing background" },
  { key: "preparing", label: "Preparing transparent PNG" },
];

export function ProcessingStatus({ stage, uploadProgress, onCancel }: { stage: ProcessingStage; uploadProgress: number; onCancel: () => void }) {
  const activeIndex = stages.findIndex((item) => item.key === stage);
  const progress = stage === "uploading" ? Math.max(5, uploadProgress) : stage === "removing" ? 72 : 92;
  return <div className="rounded-[24px] bg-white p-7 text-left text-[#000A55]" aria-live="polite" aria-busy="true">
    <div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-black">Working on your image</h2><span className="font-bold text-[#0039A6]">{Math.round(progress)}%</span></div>
    <div className="h-3 overflow-hidden rounded-full bg-[#C8E5FE]"><div className="h-full rounded-full bg-[#0039A6] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div>
    <ol className="mt-7 grid gap-4">{stages.map((item, index) => <li key={item.key} className={`flex items-center gap-3 ${index <= activeIndex ? "text-[#000A55]" : "text-[#000A55]/50"}`}><span className={`grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-bold ${index < activeIndex ? "border-[#0039A6] bg-[#0039A6] text-white" : index === activeIndex ? "border-[#E00034] bg-[#FFBECD] text-[#000A55]" : "border-[#C8E5FE]"}`}>{index < activeIndex ? "✓" : index + 1}</span>{item.label}</li>)}</ol>
    <button type="button" onClick={onCancel} className="mt-8 min-h-11 rounded-full border-2 border-[#0039A6] px-6 font-bold text-[#0039A6] hover:bg-[#C8E5FE]">Cancel</button>
  </div>;
}
