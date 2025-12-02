import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserPreferences {
  theme_mode: "light" | "dark";
  theme_preset: "default" | "ocean" | "sunset" | "forest" | "lavender";
  custom_primary_color?: string;
  custom_accent_color?: string;
  logo_visible: boolean;
  logo_size: "sm" | "md" | "lg" | "xl";
  logo_position: "header" | "sidebar" | "corner";
}

interface ThemeContextType {
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
}

const defaultPreferences: UserPreferences = {
  theme_mode: "light",
  theme_preset: "default",
  logo_visible: true,
  logo_size: "md",
  logo_position: "header",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPreferences();
  }, []);

  useEffect(() => {
    applyTheme();
  }, [preferences]);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPreferences({
          theme_mode: data.theme_mode as "light" | "dark",
          theme_preset: data.theme_preset as any,
          custom_primary_color: data.custom_primary_color || undefined,
          custom_accent_color: data.custom_accent_color || undefined,
          logo_visible: data.logo_visible,
          logo_size: data.logo_size as any,
          logo_position: data.logo_position as any,
        });
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyTheme = () => {
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (preferences.theme_mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Apply theme preset colors
    const presets = {
      default: {},
      ocean: {
        "--primary": "200 80% 50%",
        "--primary-foreground": "0 0% 100%",
        "--accent": "190 70% 55%",
      },
      sunset: {
        "--primary": "25 90% 60%",
        "--primary-foreground": "0 0% 100%",
        "--accent": "340 80% 65%",
      },
      forest: {
        "--primary": "140 60% 45%",
        "--primary-foreground": "0 0% 100%",
        "--accent": "80 50% 50%",
      },
      lavender: {
        "--primary": "270 70% 65%",
        "--primary-foreground": "0 0% 100%",
        "--accent": "280 60% 70%",
      },
    };

    const preset = presets[preferences.theme_preset] || presets.default;
    
    // Reset custom properties before applying preset
    root.style.removeProperty("--primary");
    root.style.removeProperty("--primary-foreground");
    root.style.removeProperty("--accent");
    
    // Apply preset colors
    Object.entries(preset).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });

    // Apply custom colors if set (these override preset)
    if (preferences.custom_primary_color) {
      root.style.setProperty("--primary", preferences.custom_primary_color);
    }
    if (preferences.custom_accent_color) {
      root.style.setProperty("--accent", preferences.custom_accent_color);
    }
  };

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save preferences",
          variant: "destructive",
        });
        return;
      }

      const newPrefs = { ...preferences, ...prefs };

      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          theme_mode: newPrefs.theme_mode,
          theme_preset: newPrefs.theme_preset,
          custom_primary_color: newPrefs.custom_primary_color || null,
          custom_accent_color: newPrefs.custom_accent_color || null,
          logo_visible: newPrefs.logo_visible,
          logo_size: newPrefs.logo_size,
          logo_position: newPrefs.logo_position,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setPreferences(newPrefs);
      toast({
        title: "Success",
        description: "Preferences saved successfully",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive",
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ preferences, updatePreferences, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
