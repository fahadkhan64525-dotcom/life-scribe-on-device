import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingWriteButtonProps {
  onClick: () => void;
}

export function FloatingWriteButton({ onClick }: FloatingWriteButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-gradient-sage hover:shadow-glow shadow-floating transition-all duration-300 hover:scale-110 group"
        size="icon"
      >
        <PenTool className="w-7 h-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
      </Button>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-sage opacity-30 animate-ping"></div>
    </div>
  );
}