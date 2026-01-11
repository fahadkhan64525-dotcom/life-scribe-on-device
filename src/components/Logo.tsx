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

  // Use custom logo if available, otherwise use default
  const currentLogo = preferences.custom_logo || logoImage;

  return (
    <div className={cn(
      "flex items-center justify-center animate-fade-in",
      positionClasses[preferences.logo_position],
      className
    )}>
      <div className="relative group cursor-pointer">
        <img 
          src={currentLogo} 
          alt="Personal Logo" 
          className={cn(
            "object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 rounded-lg",
            sizeClasses[logoSize]
          )}
        />
        <div className="absolute -inset-2 bg-gradient-elegant opacity-20 blur-lg rounded-full group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
        <div className="absolute -inset-4 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
      </div>
    </div>
  );
};
