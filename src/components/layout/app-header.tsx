"use client";

export function AppHeader() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between bg-white border-b hairline"
      style={{ height: "72px", padding: "0 clamp(24px, 3vw, 48px)" }}
    >
      {/* Mobile menu */}
      <button
        className="lg:hidden flex flex-col gap-[6px]"
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-[1.5px] bg-black" />
        <span className="block w-6 h-[1.5px] bg-black" />
      </button>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      {/* User indicator */}
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-gray-200 font-medium hidden sm:block">
          Alex Chen
        </span>
        <div className="flex items-center justify-center w-9 h-9 bg-black text-white text-[11px] font-bold tracking-wide">
          AC
        </div>
      </div>
    </header>
  );
}
