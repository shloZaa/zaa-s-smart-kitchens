import { useState, useRef } from "react";

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };
  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl select-none cursor-ew-resize shadow-[var(--shadow-elegant)]"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onClick={(e) => move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img src={after} alt="After remodel" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before remodel" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white grid place-items-center shadow-xl">
          <span className="text-charcoal text-xs font-semibold">↔</span>
        </div>
      </div>
      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-charcoal/80 text-background text-xs uppercase tracking-wider">Before</span>
      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-sage text-sage-foreground text-xs uppercase tracking-wider">After</span>
    </div>
  );
}
