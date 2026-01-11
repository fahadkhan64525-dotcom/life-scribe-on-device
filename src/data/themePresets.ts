export interface ThemePreset {
  id: string;
  label: string;
  category: "default";
  image?: string;
  description?: string;
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
  };
}

export const themePresets: ThemePreset[] = [
  {
    id: "default",
    label: "Default",
    category: "default",
    description: "Clean and elegant default theme",
    colors: {
      primary: "38 85% 48%",
      primaryForeground: "0 0% 100%",
      accent: "28 75% 52%",
      background: "42 35% 97%",
      foreground: "35 30% 14%",
      card: "42 30% 99%",
      cardForeground: "35 30% 14%",
      muted: "42 25% 92%",
      mutedForeground: "35 20% 42%",
    },
  },
];

export const getPresetById = (id: string): ThemePreset | undefined => {
  return themePresets.find((preset) => preset.id === id) || themePresets[0];
};

export const getPresetsByCategory = (category: string): ThemePreset[] => {
  return themePresets;
};
