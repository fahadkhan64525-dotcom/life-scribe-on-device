import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingWriteButtonProps {
  onClick: () => void;
}

export function FloatingWriteButton({ onClick }: FloatingWriteButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <Button
        onClick={onClick}
        variant="elegant"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-floating hover-glow group"
        size="icon"
      >
        <PenTool className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
      </Button>
      
      {/* Enhanced ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-elegant opacity-20 animate-ping"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-elegant opacity-10 animate-pulse"></div>
    </div>
  );
}
