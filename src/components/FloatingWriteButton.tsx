import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingWriteButtonProps {
  onClick: () => void;
}

export function FloatingWriteButton({ onClick }: FloatingWriteButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-gentle hover:shadow-soft transition-all duration-300 z-50"
      size="icon"
    >
      <PenTool className="w-6 h-6 text-primary-foreground" />
    </Button>
  );
}