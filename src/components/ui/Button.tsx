import { ArrowRight } from "lucide-react";
import { DirectAction } from "@/components/DirectAction";
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <DirectAction
      onClick={onClick}
      containerClassName="flex items-center justify-center overflow-hidden"
      buttonWrapperClassName="pointer-events-auto"
      className="group relative flex items-center justify-center px-6 py-4 md:px-10 md:py-6 overflow-hidden border border-[rgba(239,209,195,0.25)] bg-transparent transition-all duration-700 hover:border-[#efd1c3] cursor-pointer"
      color={{ r: 239, g: 209, b: 195 }}
    >
      <div className="absolute inset-0 w-full h-full bg-[#efd1c3] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)" />
      <div className="relative flex items-center gap-4 md:gap-6">
        <span
          className="uppercase tracking-[0.3em] text-[10px] md:text-sm font-bold transition-colors duration-500 text-[#efd1c3] group-hover:text-[#024244]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </span>
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 text-[#efd1c3] group-hover:text-[#024244] -rotate-45 group-hover:rotate-0" />
      </div>
    </DirectAction>
  );
}
