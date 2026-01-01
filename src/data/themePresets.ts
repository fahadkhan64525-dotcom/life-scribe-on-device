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
  // HOT Themes (with images)
  {
    id: "cozy-room",
    label: "Cozy Room",
    category: "hot",
    image: cozyRoom,
    colors: {
      primary: "25 85% 55%",
      primaryForeground: "0 0% 100%",
      accent: "15 80% 45%",
      background: "20 30% 12%",
      foreground: "30 20% 90%",
      card: "20 25% 18%",
      cardForeground: "30 20% 90%",
      muted: "20 20% 25%",
      mutedForeground: "30 15% 70%",
    },
  },
  {
    id: "night-cat",
    label: "Night Cat",
    category: "hot",
    image: nightCat,
    colors: {
      primary: "230 70% 55%",
      primaryForeground: "0 0% 100%",
      accent: "260 60% 60%",
      background: "230 45% 12%",
      foreground: "220 20% 95%",
      card: "230 40% 18%",
      cardForeground: "220 20% 95%",
      muted: "230 35% 25%",
      mutedForeground: "220 15% 70%",
    },
  },
  {
    id: "tulip-garden",
    label: "Tulip Garden",
    category: "hot",
    image: tulipGarden,
    colors: {
      primary: "140 50% 45%",
      primaryForeground: "0 0% 100%",
      accent: "350 65% 60%",
      background: "120 25% 95%",
      foreground: "140 30% 20%",
      card: "120 30% 98%",
      cardForeground: "140 30% 20%",
      muted: "120 20% 90%",
      mutedForeground: "140 20% 45%",
    },
  },
  {
    id: "sky-balloons",
    label: "Sky Balloons",
    category: "hot",
    image: skyBalloons,
    colors: {
      primary: "340 70% 65%",
      primaryForeground: "0 0% 100%",
      accent: "200 60% 55%",
      background: "340 30% 96%",
      foreground: "340 30% 20%",
      card: "340 25% 98%",
      cardForeground: "340 30% 20%",
      muted: "340 20% 92%",
      mutedForeground: "340 20% 45%",
    },
  },
  {
    id: "sunset-city",
    label: "Sunset City",
    category: "hot",
    image: sunsetCity,
    colors: {
      primary: "290 70% 55%",
      primaryForeground: "0 0% 100%",
      accent: "330 80% 60%",
      background: "280 40% 15%",
      foreground: "300 20% 95%",
      card: "280 35% 22%",
      cardForeground: "300 20% 95%",
      muted: "280 30% 28%",
      mutedForeground: "300 15% 70%",
    },
  },
  {
    id: "magic-book",
    label: "Magic Book",
    category: "hot",
    image: magicBook,
    colors: {
      primary: "40 80% 50%",
      primaryForeground: "0 0% 10%",
      accent: "30 70% 45%",
      background: "30 30% 10%",
      foreground: "40 25% 90%",
      card: "30 25% 16%",
      cardForeground: "40 25% 90%",
      muted: "30 20% 22%",
      mutedForeground: "40 15% 65%",
    },
  },

  // DARK Themes
  {
    id: "night-mountain",
    label: "Night Mountain",
    category: "dark",
    image: nightMountain,
    colors: {
      primary: "210 70% 50%",
      primaryForeground: "0 0% 100%",
      accent: "200 60% 45%",
      background: "215 50% 10%",
      foreground: "210 20% 95%",
      card: "215 45% 15%",
      cardForeground: "210 20% 95%",
      muted: "215 40% 20%",
      mutedForeground: "210 15% 65%",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    category: "dark",
    colors: {
      primary: "250 70% 60%",
      primaryForeground: "0 0% 100%",
      accent: "280 60% 55%",
      background: "240 25% 8%",
      foreground: "0 0% 95%",
      card: "240 20% 13%",
      cardForeground: "0 0% 95%",
      muted: "240 15% 18%",
      mutedForeground: "240 10% 60%",
    },
  },
  {
    id: "charcoal",
    label: "Charcoal",
    category: "dark",
    colors: {
      primary: "0 0% 85%",
      primaryForeground: "0 0% 10%",
      accent: "0 0% 70%",
      background: "0 0% 8%",
      foreground: "0 0% 95%",
      card: "0 0% 12%",
      cardForeground: "0 0% 95%",
      muted: "0 0% 18%",
      mutedForeground: "0 0% 60%",
    },
  },

  // LIGHT Themes
  {
    id: "pink-clouds",
    label: "Pink Clouds",
    category: "light",
    image: pinkClouds,
    colors: {
      primary: "340 70% 60%",
      primaryForeground: "0 0% 100%",
      accent: "320 60% 65%",
      background: "340 40% 97%",
      foreground: "340 30% 20%",
      card: "340 35% 99%",
      cardForeground: "340 30% 20%",
      muted: "340 25% 93%",
      mutedForeground: "340 20% 45%",
    },
  },
  {
    id: "lake-mountains",
    label: "Lake Mountains",
    category: "light",
    image: lakeMountains,
    colors: {
      primary: "190 60% 45%",
      primaryForeground: "0 0% 100%",
      accent: "25 70% 55%",
      background: "190 35% 97%",
      foreground: "190 30% 15%",
      card: "190 30% 99%",
      cardForeground: "190 30% 15%",
      muted: "190 25% 92%",
      mutedForeground: "190 20% 45%",
    },
  },
  {
    id: "cream",
    label: "Cream",
    category: "light",
    colors: {
      primary: "35 80% 50%",
      primaryForeground: "0 0% 100%",
      accent: "25 70% 55%",
      background: "40 30% 96%",
      foreground: "30 25% 15%",
      card: "40 25% 98%",
      cardForeground: "30 25% 15%",
      muted: "40 20% 90%",
      mutedForeground: "30 15% 45%",
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    category: "light",
    colors: {
      primary: "220 15% 25%",
      primaryForeground: "0 0% 100%",
      accent: "220 10% 40%",
      background: "0 0% 100%",
      foreground: "220 15% 15%",
      card: "0 0% 99%",
      cardForeground: "220 15% 15%",
      muted: "220 10% 95%",
      mutedForeground: "220 10% 45%",
    },
  },
];

export const getPresetById = (id: string): ThemePreset | undefined => {
  return themePresets.find((preset) => preset.id === id);
};

export const getPresetsByCategory = (category: "hot" | "dark" | "light"): ThemePreset[] => {
  return themePresets.filter((preset) => preset.category === category);
};
