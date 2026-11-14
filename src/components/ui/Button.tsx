import { ArrowRight } from "lucide-react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ label, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center px-6 py-4 md:px-10 md:py-6 overflow-hidden border border-[rgba(var(--accent-rgb),0.25)] bg-transparent transition-all duration-700 hover:border-[var(--accent)] cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 w-full h-full bg-[var(--accent)] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <div className="relative flex items-center gap-4 md:gap-6">
        <span
          className="uppercase tracking-[0.3em] text-[10px] md:text-sm font-bold transition-colors duration-500 text-[var(--accent)] group-hover:text-[#024244]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </span>
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 text-[var(--accent)] group-hover:text-[#024244] -rotate-45 group-hover:rotate-0" />
      </div>
    </button>
  );
}
