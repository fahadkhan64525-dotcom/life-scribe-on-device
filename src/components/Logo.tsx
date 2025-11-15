import { cn } from "@/lib/utils";
import logoImage from "@/assets/fahad-logo.jpg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative group">
        <img 
          src={logoImage} 
          alt="Fahad Logo" 
          className={cn(
            "object-contain transition-all duration-500 group-hover:scale-105",
            sizeClasses[size]
          )}
        />
        <div className="absolute -inset-2 bg-gradient-elegant opacity-20 blur-lg rounded-full group-hover:opacity-30 transition-opacity duration-500" />
      </div>
    </div>
  );
};