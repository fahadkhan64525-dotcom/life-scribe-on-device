import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getPresetById, ThemePreset } from "@/data/themePresets";

export interface UserPreferences {
  theme_mode: "light" | "dark";
  theme_preset: string;
  custom_primary_color?: string;
  custom_accent_color?: string;
  custom_logo?: string;
  logo_visible: boolean;
  logo_size: "sm" | "md" | "lg" | "xl";
  logo_position: "header" | "sidebar" | "corner";
}

interface ThemeContextType {
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
  currentPreset: ThemePreset | undefined;
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

  const currentPreset = getPresetById(preferences.theme_preset);

  const applyTheme = () => {
    const root = document.documentElement;
    
    // Apply light mode (default theme is light)
    const preset = currentPreset;
    if (preferences.theme_mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Reset all custom properties
    const propsToReset = [
      "--primary", "--primary-foreground", "--accent",
      "--background", "--foreground", "--card", "--card-foreground",
      "--muted", "--muted-foreground", "--theme-background-image"
    ];
    propsToReset.forEach(prop => root.style.removeProperty(prop));

    // Apply preset colors
    if (preset) {
      root.style.setProperty("--primary", preset.colors.primary);
      root.style.setProperty("--primary-foreground", preset.colors.primaryForeground);
      root.style.setProperty("--accent", preset.colors.accent);
      root.style.setProperty("--background", preset.colors.background);
      root.style.setProperty("--foreground", preset.colors.foreground);
      root.style.setProperty("--card", preset.colors.card);
      root.style.setProperty("--card-foreground", preset.colors.cardForeground);
      root.style.setProperty("--muted", preset.colors.muted);
      root.style.setProperty("--muted-foreground", preset.colors.mutedForeground);
      
      // Apply background image if preset has one
      if (preset.image) {
        root.style.setProperty("--theme-background-image", `url(${preset.image})`);
      }
    }

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
    <ThemeContext.Provider value={{ preferences, updatePreferences, isLoading, currentPreset }}>
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
