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
      <div className="relative group">
        <h1 className={cn(
          "font-display font-bold tracking-wide",
          "text-shimmer",
          "transition-all duration-500 group-hover:scale-105",
          sizeClasses[size]
        )}>
          Fahad
        </h1>
        <div className="absolute -inset-2 bg-gradient-elegant opacity-20 blur-lg rounded-lg group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute -inset-1 bg-gradient-elegant opacity-10 blur-sm rounded-lg animate-pulse-slow" />
      </div>
    </div>
  );
};