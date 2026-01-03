import cozyRoom from "@/assets/themes/cozy-room.jpg";
import nightCat from "@/assets/themes/night-cat.jpg";
import tulipGarden from "@/assets/themes/tulip-garden.jpg";
import skyBalloons from "@/assets/themes/sky-balloons.jpg";
import sunsetCity from "@/assets/themes/sunset-city.jpg";
import magicBook from "@/assets/themes/magic-book.jpg";
import nightMountain from "@/assets/themes/night-mountain.jpg";
import pinkClouds from "@/assets/themes/pink-clouds.jpg";
import lakeMountains from "@/assets/themes/lake-mountains.jpg";

export interface ThemePreset {
  id: string;
  label: string;
  category: "hot" | "dark" | "light";
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
  // HOT Themes (Featured with stunning images)
  {
    id: "cozy-room",
    label: "Cozy Room",
    category: "hot",
    image: cozyRoom,
    description: "Warm amber tones for intimate journaling",
    colors: {
      primary: "25 90% 55%",
      primaryForeground: "0 0% 100%",
      accent: "35 85% 50%",
      background: "20 35% 10%",
      foreground: "35 25% 92%",
      card: "22 30% 14%",
      cardForeground: "35 25% 92%",
      muted: "22 25% 18%",
      mutedForeground: "35 20% 65%",
    },
  },
  {
    id: "night-cat",
    label: "Night Cat",
    category: "hot",
    image: nightCat,
    description: "Mystical indigo nights with starlit accents",
    colors: {
      primary: "235 75% 60%",
      primaryForeground: "0 0% 100%",
      accent: "270 65% 65%",
      background: "235 50% 10%",
      foreground: "230 25% 95%",
      card: "235 45% 14%",
      cardForeground: "230 25% 95%",
      muted: "235 40% 18%",
      mutedForeground: "230 20% 68%",
    },
  },
  {
    id: "tulip-garden",
    label: "Tulip Garden",
    category: "hot",
    image: tulipGarden,
    description: "Fresh spring greens with floral pink touches",
    colors: {
      primary: "145 55% 42%",
      primaryForeground: "0 0% 100%",
      accent: "340 70% 55%",
      background: "125 30% 96%",
      foreground: "145 35% 18%",
      card: "130 35% 98%",
      cardForeground: "145 35% 18%",
      muted: "130 25% 92%",
      mutedForeground: "145 25% 42%",
    },
  },
  {
    id: "sky-balloons",
    label: "Sky Balloons",
    category: "hot",
    image: skyBalloons,
    description: "Dreamy pastels floating through clouds",
    colors: {
      primary: "345 75% 62%",
      primaryForeground: "0 0% 100%",
      accent: "195 70% 55%",
      background: "345 35% 97%",
      foreground: "345 35% 18%",
      card: "350 30% 99%",
      cardForeground: "345 35% 18%",
      muted: "345 25% 93%",
      mutedForeground: "345 25% 45%",
    },
  },
  {
    id: "sunset-city",
    label: "Sunset City",
    category: "hot",
    image: sunsetCity,
    description: "Urban twilight with neon purple glow",
    colors: {
      primary: "280 80% 60%",
      primaryForeground: "0 0% 100%",
      accent: "320 85% 58%",
      background: "275 45% 12%",
      foreground: "290 25% 95%",
      card: "278 40% 16%",
      cardForeground: "290 25% 95%",
      muted: "278 35% 22%",
      mutedForeground: "290 20% 68%",
    },
  },
  {
    id: "magic-book",
    label: "Magic Book",
    category: "hot",
    image: magicBook,
    description: "Ancient golden library with mystical warmth",
    colors: {
      primary: "42 85% 48%",
      primaryForeground: "0 0% 8%",
      accent: "32 80% 42%",
      background: "35 35% 9%",
      foreground: "42 30% 92%",
      card: "35 30% 13%",
      cardForeground: "42 30% 92%",
      muted: "35 25% 18%",
      mutedForeground: "42 20% 62%",
    },
  },

  // DARK Themes (Elegant and sophisticated)
  {
    id: "night-mountain",
    label: "Night Mountain",
    category: "dark",
    image: nightMountain,
    description: "Serene alpine nights with cool blue tones",
    colors: {
      primary: "210 75% 52%",
      primaryForeground: "0 0% 100%",
      accent: "195 65% 48%",
      background: "215 55% 8%",
      foreground: "210 25% 96%",
      card: "215 50% 12%",
      cardForeground: "210 25% 96%",
      muted: "215 45% 16%",
      mutedForeground: "210 20% 62%",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    category: "dark",
    description: "Deep purple cosmos with ethereal glow",
    colors: {
      primary: "255 75% 62%",
      primaryForeground: "0 0% 100%",
      accent: "285 65% 58%",
      background: "250 30% 6%",
      foreground: "0 0% 96%",
      card: "250 25% 10%",
      cardForeground: "0 0% 96%",
      muted: "250 20% 14%",
      mutedForeground: "250 15% 58%",
    },
  },
  {
    id: "charcoal",
    label: "Charcoal",
    category: "dark",
    description: "Minimalist monochrome elegance",
    colors: {
      primary: "0 0% 88%",
      primaryForeground: "0 0% 8%",
      accent: "0 0% 72%",
      background: "0 0% 6%",
      foreground: "0 0% 96%",
      card: "0 0% 10%",
      cardForeground: "0 0% 96%",
      muted: "0 0% 14%",
      mutedForeground: "0 0% 58%",
    },
  },
  {
    id: "forest-night",
    label: "Forest Night",
    category: "dark",
    description: "Deep emerald woods after dusk",
    colors: {
      primary: "155 65% 45%",
      primaryForeground: "0 0% 100%",
      accent: "165 55% 40%",
      background: "160 40% 6%",
      foreground: "155 20% 95%",
      card: "160 35% 10%",
      cardForeground: "155 20% 95%",
      muted: "160 30% 14%",
      mutedForeground: "155 20% 55%",
    },
  },
  {
    id: "wine-cellar",
    label: "Wine Cellar",
    category: "dark",
    description: "Rich burgundy with aged oak warmth",
    colors: {
      primary: "350 70% 52%",
      primaryForeground: "0 0% 100%",
      accent: "15 65% 48%",
      background: "350 35% 8%",
      foreground: "350 15% 94%",
      card: "350 30% 12%",
      cardForeground: "350 15% 94%",
      muted: "350 25% 16%",
      mutedForeground: "350 15% 58%",
    },
  },

  // LIGHT Themes (Fresh and airy)
  {
    id: "pink-clouds",
    label: "Pink Clouds",
    category: "light",
    image: pinkClouds,
    description: "Cotton candy skies at dawn",
    colors: {
      primary: "338 75% 58%",
      primaryForeground: "0 0% 100%",
      accent: "315 65% 62%",
      background: "340 45% 97%",
      foreground: "340 35% 18%",
      card: "345 40% 99%",
      cardForeground: "340 35% 18%",
      muted: "340 30% 94%",
      mutedForeground: "340 25% 42%",
    },
  },
  {
    id: "lake-mountains",
    label: "Lake Mountains",
    category: "light",
    image: lakeMountains,
    description: "Crystal waters reflecting alpine peaks",
    colors: {
      primary: "195 65% 45%",
      primaryForeground: "0 0% 100%",
      accent: "28 75% 52%",
      background: "195 40% 97%",
      foreground: "195 35% 14%",
      card: "200 35% 99%",
      cardForeground: "195 35% 14%",
      muted: "195 30% 93%",
      mutedForeground: "195 25% 42%",
    },
  },
  {
    id: "cream",
    label: "Cream",
    category: "light",
    description: "Warm vanilla with golden honey accents",
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
  {
    id: "original",
    label: "Original",
    category: "light",
    description: "The classic diary theme you know and love",
    colors: {
      primary: "222 47% 51%",
      primaryForeground: "0 0% 100%",
      accent: "210 40% 58%",
      background: "0 0% 100%",
      foreground: "222 47% 11%",
      card: "0 0% 100%",
      cardForeground: "222 47% 11%",
      muted: "210 40% 96%",
      mutedForeground: "215 16% 47%",
    },
  },
  {
    id: "normal",
    label: "Normal",
    category: "light",
    description: "Classic neutral theme for everyday use",
    colors: {
      primary: "215 25% 32%",
      primaryForeground: "0 0% 100%",
      accent: "215 20% 48%",
      background: "220 14% 96%",
      foreground: "215 25% 12%",
      card: "0 0% 100%",
      cardForeground: "215 25% 12%",
      muted: "220 12% 91%",
      mutedForeground: "215 15% 48%",
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    category: "light",
    description: "Clean slate for focused writing",
    colors: {
      primary: "220 18% 22%",
      primaryForeground: "0 0% 100%",
      accent: "220 14% 38%",
      background: "0 0% 100%",
      foreground: "220 18% 14%",
      card: "0 0% 99%",
      cardForeground: "220 18% 14%",
      muted: "220 12% 96%",
      mutedForeground: "220 12% 42%",
    },
  },
  {
    id: "lavender-mist",
    label: "Lavender Mist",
    category: "light",
    description: "Gentle purple haze with calming energy",
    colors: {
      primary: "270 55% 55%",
      primaryForeground: "0 0% 100%",
      accent: "285 50% 60%",
      background: "270 35% 97%",
      foreground: "270 30% 18%",
      card: "275 30% 99%",
      cardForeground: "270 30% 18%",
      muted: "270 25% 94%",
      mutedForeground: "270 20% 45%",
    },
  },
  {
    id: "ocean-breeze",
    label: "Ocean Breeze",
    category: "light",
    description: "Coastal serenity with seafoam touches",
    colors: {
      primary: "180 55% 42%",
      primaryForeground: "0 0% 100%",
      accent: "165 50% 48%",
      background: "180 35% 97%",
      foreground: "180 30% 16%",
      card: "185 30% 99%",
      cardForeground: "180 30% 16%",
      muted: "180 25% 93%",
      mutedForeground: "180 20% 42%",
    },
  },
];

export const getPresetById = (id: string): ThemePreset | undefined => {
  return themePresets.find((preset) => preset.id === id);
};

export const getPresetsByCategory = (category: "hot" | "dark" | "light"): ThemePreset[] => {
  return themePresets.filter((preset) => preset.category === category);
};
