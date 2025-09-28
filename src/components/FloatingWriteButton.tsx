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
        variant="elegant"
        className="w-16 h-16 rounded-full shadow-floating hover-glow group"
        size="icon"
      >
        <PenTool className="w-7 h-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
      </Button>
      
      {/* Enhanced ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-elegant opacity-20 animate-ping"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-elegant opacity-10 animate-pulse"></div>
    </div>
  );
}