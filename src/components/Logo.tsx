import { cn } from "@/lib/utils";
import logoImage from "@/assets/fahad-logo.jpg";
import { useTheme } from "@/contexts/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo = ({ className, size }: LogoProps) => {
  const { preferences } = useTheme();
  
  // Use props size if provided, otherwise use preferences
  const logoSize = size || preferences.logo_size;
  
  if (!preferences.logo_visible) {
    return null;
  }
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64"
  };

  const positionClasses = {
    header: "relative",
    sidebar: "fixed left-4 top-4 z-50",
    corner: "fixed bottom-4 right-4 z-50",
  };

  return (
    <div className={cn(
      "flex items-center justify-center",
      positionClasses[preferences.logo_position],
      className
    )}>
      <div className="relative group">
        <img 
          src={logoImage} 
          alt="Fahad Logo" 
          className={cn(
            "object-contain transition-all duration-500 group-hover:scale-105",
            sizeClasses[logoSize]
          )}
        />
        <div className="absolute -inset-2 bg-gradient-elegant opacity-20 blur-lg rounded-full group-hover:opacity-30 transition-opacity duration-500" />
      </div>
    </div>
  );
};