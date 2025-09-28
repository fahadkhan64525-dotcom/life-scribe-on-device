import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <h1 className={cn(
          "font-serif font-bold tracking-wide",
          "bg-gradient-elegant text-transparent bg-clip-text",
          "text-shimmer",
          sizeClasses[size]
        )}>
          Fahad
        </h1>
        <div className="absolute -inset-2 bg-gradient-elegant opacity-20 blur-lg rounded-lg" />
      </div>
    </div>
  );
};