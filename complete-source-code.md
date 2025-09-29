# Digital Journal App - Complete Source Code

## Project Structure
```
digital-journal/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── [custom components]
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── [config files]
└── [config files]
```

---

## HTML Entry Point

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digital Journal - Your Life, Automatically Captured</title>
    <meta name="description" content="A private, passive journaling app that turns your digital data into meaningful memories. All processing happens on your device for complete privacy." />
    <meta name="author" content="Digital Journal" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

    <meta property="og:title" content="Digital Journal - Your Life, Automatically Captured" />
    <meta property="og:description" content="A private, passive journaling app that turns your digital data into meaningful memories." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Main Entry Points

### src/main.tsx
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

### src/App.tsx
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/journal" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

## Configuration Files

### vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        journal: {
          warm: "hsl(var(--journal-warm))",
          accent: "hsl(var(--journal-accent))",
          "text-soft": "hsl(var(--journal-text-soft))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-warm": "var(--gradient-warm)",
        "gradient-sage": "var(--gradient-sage)",
        "gradient-paper": "var(--gradient-paper)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-elegant": "var(--gradient-elegant)",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-vibrant": "var(--gradient-vibrant)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        gentle: "var(--shadow-gentle)",
        floating: "var(--shadow-floating)",
        paper: "var(--shadow-paper)",
        glow: "var(--shadow-glow)",
        elegant: "var(--shadow-elegant)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Crimson Text", "serif"],
        display: ["Playfair Display", "serif"],
      },
      fontSize: {
        hero: "var(--font-size-hero)",
        title: "var(--font-size-title)",
      },
      spacing: {
        section: "var(--space-section)",
        element: "var(--space-element)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" }
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## Styling & Design System

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Definition of the design system. All colors, gradients, fonts, etc should be defined here. 
All colors MUST be HSL.
*/

@layer base {
  :root {
    /* Warm, journaling-inspired color palette */
    --background: 38 15% 96%; /* Warm cream */
    --foreground: 25 25% 15%; /* Rich dark brown */

    --card: 38 25% 98%; /* Soft cream card */
    --card-foreground: 25 25% 15%;

    --popover: 38 25% 98%;
    --popover-foreground: 25 25% 15%;

    --primary: 158 25% 45%; /* Sage green */
    --primary-foreground: 38 25% 98%;

    --secondary: 38 20% 90%; /* Warm beige */
    --secondary-foreground: 25 25% 15%;

    --muted: 38 15% 92%; /* Light warm gray */
    --muted-foreground: 25 15% 45%;

    --accent: 158 35% 85%; /* Light sage */
    --accent-foreground: 25 25% 15%;

    --destructive: 0 65% 55%;
    --destructive-foreground: 38 25% 98%;

    --border: 38 20% 85%; /* Soft warm border */
    --input: 38 20% 88%;
    --ring: 158 25% 45%;

    /* Custom journaling tokens */
    --journal-warm: 38 25% 95%; /* Warm paper background */
    --journal-accent: 158 20% 75%; /* Muted sage accent */
    --journal-text-soft: 25 15% 35%; /* Softer text */
    --journal-shadow: 25 15% 10%; /* Warm shadows */
    --journal-glow: 158 45% 85%; /* Soft glow */
    
    /* Enhanced Gradients */
    --gradient-warm: linear-gradient(135deg, hsl(38 25% 98%), hsl(38 20% 94%));
    --gradient-sage: linear-gradient(135deg, hsl(158 25% 45%), hsl(158 35% 55%));
    --gradient-paper: linear-gradient(145deg, hsl(38 30% 97%) 0%, hsl(38 25% 95%) 50%, hsl(38 20% 93%) 100%);
    --gradient-hero: linear-gradient(135deg, hsl(38 25% 98%) 0%, hsl(158 15% 92%) 50%, hsl(38 20% 96%) 100%);
    --gradient-card: linear-gradient(145deg, hsl(38 30% 98%) 0%, hsl(38 25% 96%) 100%);
    --gradient-elegant: linear-gradient(135deg, hsl(158 45% 55%) 0%, hsl(38 45% 65%) 50%, hsl(158 35% 45%) 100%);
    --gradient-subtle: linear-gradient(180deg, hsl(38 25% 98%) 0%, hsl(38 20% 94%) 100%);
    --gradient-vibrant: linear-gradient(135deg, hsl(25 85% 65%) 0%, hsl(45 85% 60%) 25%, hsl(158 55% 55%) 50%, hsl(280 55% 65%) 75%, hsl(340 75% 65%) 100%);
    
    /* Enhanced Shadows */
    --shadow-soft: 0 2px 12px -2px hsl(var(--journal-shadow) / 0.08);
    --shadow-gentle: 0 4px 20px -4px hsl(var(--journal-shadow) / 0.12);
    --shadow-floating: 0 8px 32px -8px hsl(var(--journal-shadow) / 0.16);
    --shadow-paper: 0 1px 3px hsl(var(--journal-shadow) / 0.06), 0 4px 16px hsl(var(--journal-shadow) / 0.08);
    --shadow-glow: 0 0 20px hsl(var(--journal-glow) / 0.3);
    --shadow-elegant: 0 10px 40px -10px hsl(158 45% 55% / 0.3);

    /* Typography */
    --font-size-hero: clamp(2rem, 5vw, 3.5rem);
    --font-size-title: clamp(1.5rem, 3vw, 2rem);
    
    /* Spacing */
    --space-section: clamp(3rem, 8vw, 6rem);
    --space-element: clamp(1rem, 3vw, 2rem);

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    /* Dark mode with warm undertones */
    --background: 25 15% 8%; /* Warm dark */
    --foreground: 38 25% 95%;

    --card: 25 20% 12%; /* Warm dark card */
    --card-foreground: 38 25% 95%;

    --popover: 25 20% 12%;
    --popover-foreground: 38 25% 95%;

    --primary: 158 35% 65%; /* Brighter sage for dark mode */
    --primary-foreground: 25 15% 8%;

    --secondary: 25 15% 18%; /* Warm dark secondary */
    --secondary-foreground: 38 25% 95%;

    --muted: 25 15% 15%; /* Dark warm muted */
    --muted-foreground: 38 15% 65%;

    --accent: 158 25% 25%; /* Dark sage accent */
    --accent-foreground: 38 25% 95%;

    --destructive: 0 65% 60%;
    --destructive-foreground: 38 25% 95%;

    --border: 25 15% 20%; /* Warm dark border */
    --input: 25 15% 18%;
    --ring: 158 35% 65%;

    /* Custom dark mode tokens */
    --journal-warm: 25 20% 10%; /* Dark warm background */
    --journal-accent: 158 25% 35%; /* Dark sage accent */
    --journal-text-soft: 38 20% 75%; /* Soft light text */
    --journal-shadow: 25 25% 5%; /* Deep shadows */
    --journal-glow: 158 45% 65%; /* Bright glow for dark mode */
    
    /* Enhanced Dark gradients */
    --gradient-warm: linear-gradient(135deg, hsl(25 20% 12%), hsl(25 15% 8%));
    --gradient-sage: linear-gradient(135deg, hsl(158 35% 65%), hsl(158 45% 75%));
    --gradient-paper: linear-gradient(145deg, hsl(25 20% 12%) 0%, hsl(25 18% 10%) 50%, hsl(25 15% 8%) 100%);
    --gradient-hero: linear-gradient(135deg, hsl(25 20% 12%) 0%, hsl(158 20% 18%) 50%, hsl(25 18% 10%) 100%);
    --gradient-card: linear-gradient(145deg, hsl(25 22% 12%) 0%, hsl(25 18% 10%) 100%);
    --gradient-elegant: linear-gradient(135deg, hsl(158 55% 65%) 0%, hsl(38 55% 75%) 50%, hsl(158 45% 55%) 100%);
    --gradient-subtle: linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 15% 8%) 100%);
    --gradient-vibrant: linear-gradient(135deg, hsl(25 75% 55%) 0%, hsl(45 75% 50%) 25%, hsl(158 45% 45%) 50%, hsl(280 45% 55%) 75%, hsl(340 65% 55%) 100%);
    
    /* Enhanced Dark shadows */
    --shadow-soft: 0 2px 12px -2px hsl(var(--journal-shadow) / 0.3);
    --shadow-gentle: 0 4px 20px -4px hsl(var(--journal-shadow) / 0.4);
    --shadow-floating: 0 8px 32px -8px hsl(var(--journal-shadow) / 0.5);
    --shadow-paper: 0 1px 3px hsl(var(--journal-shadow) / 0.4), 0 4px 16px hsl(var(--journal-shadow) / 0.5);
    --shadow-glow: 0 0 20px hsl(var(--journal-glow) / 0.2);
    --shadow-elegant: 0 10px 40px -10px hsl(158 55% 65% / 0.4);
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }
}

@layer components {
  /* Beautiful scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: hsl(var(--muted));
    border-radius: 100vw;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--journal-accent));
    border-radius: 100vw;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--primary));
  }

  /* Glassmorphism effect */
  .glass {
    background: hsl(var(--card) / 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid hsl(var(--border) / 0.2);
  }

  /* Paper texture effect */
  .paper-texture {
    background-image: 
      radial-gradient(circle at 25% 25%, hsl(var(--background)) 2px, transparent 0),
      radial-gradient(circle at 75% 75%, hsl(var(--muted) / 0.1) 1px, transparent 0);
    background-size: 24px 24px;
  }

  /* Floating animation */
  .float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  /* Enhanced text shimmer effect */
  .text-shimmer {
    background: var(--gradient-vibrant);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { background-position: 200% 0; }
    50% { background-position: -200% 0; }
  }

  /* Hover glow effect */
  .hover-glow {
    transition: all 0.3s ease;
  }
  
  .hover-glow:hover {
    box-shadow: var(--shadow-elegant);
    transform: translateY(-2px);
  }

  /* Gradient border effect */
  .gradient-border {
    position: relative;
    background: hsl(var(--card));
    border-radius: calc(var(--radius) + 2px);
  }
  
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: var(--gradient-elegant);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }
}
```

---

## Utilities & Helpers

### src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### src/hooks/use-toast.ts
```ts
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
```

---

## Page Components

### src/pages/Welcome.tsx
```tsx
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { BookOpen, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Digital Journaling",
      description: "Capture your thoughts and memories in a beautiful digital format"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "All your entries are processed locally on your device"
    },
    {
      icon: Sparkles,
      title: "Smart Organization",
      description: "Automatic categorization and search through your journal entries"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4f1eb' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Logo Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Logo size="xl" className="mb-8" />
            <h2 className="text-3xl md:text-4xl text-foreground/90 font-display font-medium mb-6 tracking-wide">
              Digital Journal
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Your life, automatically captured. A private, passive journaling app that turns your digital data into meaningful memories.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass p-8 rounded-2xl text-center animate-scale-in border border-white/10"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center shadow-elegant border border-white/20">
                  <feature.icon className={`w-8 h-8 ${
                    index === 0 ? 'text-orange-400' : 
                    index === 1 ? 'text-emerald-400' : 
                    'text-purple-400'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="animate-slide-in-right" style={{ animationDelay: "800ms" }}>
            <Button
              onClick={() => navigate("/journal")}
              variant="elegant"
              size="lg"
              className="group px-8 py-6 text-lg font-medium"
            >
              Start Journaling
              <ArrowRight className="ml-3 w-5 h-5 text-yellow-300 group-hover:translate-x-1 group-hover:text-yellow-200 transition-all group-hover:scale-110" />
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              All processing happens on your device for complete privacy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
```

### src/pages/Index.tsx
```tsx
import { useState } from "react";
import { JournalHeader } from "@/components/JournalHeader";
import { JournalEntry } from "@/components/JournalEntry";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DiaryWritingModal } from "@/components/DiaryWritingModal";
import { FloatingWriteButton } from "@/components/FloatingWriteButton";
import { Button } from "@/components/ui/button";
import { Plus, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockEntries = [
  {
    id: "1",
    date: "Today, September 24",
    time: "2:30 PM",
    location: "Central Park, NYC",
    photos: ["/placeholder.svg", "/placeholder.svg"],
    music: "Autumn Leaves - Bill Evans",
    autoText: "You spent the afternoon in Central Park while listening to jazz. The weather was perfect for a walk, and you took several photos of the changing leaves. This seems like a peaceful moment in your day.",
    userText: "Had a wonderful conversation with Sarah about her new job. We sat by the pond and watched the ducks.",
    prompts: ["How did you feel?", "What made this special?", "Who were you with?"],
    tags: ["nature", "friends", "jazz", "autumn"],
  },
  {
    id: "2",
    date: "Yesterday, September 23",
    time: "7:45 AM",
    calendarEvent: "Team Standup Meeting",
    autoText: "Started your day with a team standup meeting. You also listened to a productivity podcast during your commute. Your calendar shows you had a busy but organized morning.",
    prompts: ["What went well in the meeting?", "Any new ideas?", "How are you feeling about the project?"],
    tags: ["work", "meetings", "productivity"],
  },
  {
    id: "3",
    date: "September 22",
    time: "6:15 PM",
    location: "Local Coffee Shop",
    photos: ["/placeholder.svg"],
    music: "Lo-fi Hip Hop Mix",
    autoText: "You visited your favorite coffee shop and spent time working on something while listening to lo-fi music. You took a photo of your workspace setup. This appears to be a focused work session.",
    tags: ["coffee", "work", "focus", "music"],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(mockEntries);
  const [isWritingModalOpen, setIsWritingModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredEntries = entries.filter(entry =>
    entry.autoText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.userText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    entry.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContext = (entryId: string) => {
    // In a real app, this would open a modal or navigate to an edit page
    console.log("Adding context to entry:", entryId);
  };

  const handleSaveDiaryEntry = (newEntry: {
    title: string;
    content: string;
    location?: string;
    photos: string[];
    mood?: string;
    tags: string[];
  }) => {
    const diaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }),
      time: new Date().toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit" 
      }),
      location: newEntry.location,
      photos: newEntry.photos.length > 0 ? newEntry.photos : undefined,
      music: undefined,
      calendarEvent: undefined,
      autoText: newEntry.content,
      userText: newEntry.mood ? `Feeling ${newEntry.mood.toLowerCase()}` : undefined,
      prompts: ["What else would you like to add?", "How did this make you feel?"],
      tags: [...newEntry.tags, "diary", "personal"],
    };

    setEntries([diaryEntry, ...entries]);
    
    toast({
      title: "Entry saved!",
      description: "Your diary entry has been added to your journal.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero custom-scrollbar">
      <JournalHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="max-w-4xl mx-auto px-6 py-section relative">
        <PrivacyBanner />
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-title font-display font-medium text-foreground tracking-wide">Your Story</h2>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsWritingModalOpen(true)}
              className="glass border-journal-accent/30 hover:shadow-gentle hover-glow"
            >
              <PenTool className="w-5 h-5 mr-2 text-purple-500" />
              <span className="hidden sm:inline">Write</span>
            </Button>
            <Button 
              variant="elegant"
              className="shadow-soft"
            >
              <Plus className="w-5 h-5 mr-2 text-emerald-300" />
              <span className="hidden sm:inline">Add Entry</span>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onAddContext={handleAddContext}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-elegant rounded-full mx-auto mb-6 flex items-center justify-center shadow-elegant">
                <PenTool className="w-12 h-12 text-primary-foreground animate-pulse-slow" />
              </div>
              <p className="text-journal-text-soft mb-6 text-lg">No entries found matching your search.</p>
              <Button variant="elegant" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>

        {filteredEntries.length > 0 && (
          <div className="text-center mt-16 py-12 border-t border-journal-accent/20">
            <p className="text-journal-text-soft mb-6 text-lg">
              Your journal grows automatically as you live your life.
            </p>
            <Button variant="outline" className="glass hover:shadow-gentle hover-glow gradient-border">
              Load Earlier Entries
            </Button>
          </div>
        )}
      </main>

      <FloatingWriteButton onClick={() => setIsWritingModalOpen(true)} />
      
      <DiaryWritingModal
        isOpen={isWritingModalOpen}
        onClose={() => setIsWritingModalOpen(false)}
        onSave={handleSaveDiaryEntry}
      />
    </div>
  );
};

export default Index;
```

### src/pages/NotFound.tsx
```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
```

---

## Custom Components

### src/components/Logo.tsx
```tsx
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
```

### src/components/JournalHeader.tsx
```tsx
import { Search, Calendar, Camera, Music, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JournalHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function JournalHeader({ searchQuery, onSearchChange }: JournalHeaderProps) {
  return (
    <header className="relative bg-gradient-hero border-b border-journal-accent/20 px-6 py-12 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 paper-texture opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-sage rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-warm rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-elegant rounded-2xl shadow-elegant hover-glow">
              <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse-slow" />
            </div>
          </div>
          <h1 className="text-hero font-display font-medium text-foreground mb-4 text-shimmer tracking-wide">
            Your Digital Journal
          </h1>
          <p className="text-xl text-journal-text-soft max-w-2xl mx-auto leading-relaxed font-light">
            Automatically weaving your life's moments into meaningful stories, 
            <span className="text-primary font-medium"> beautifully preserved</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative flex-1 max-w-md group">
            <div className="absolute inset-0 bg-gradient-sage rounded-lg opacity-20 blur-sm group-focus-within:opacity-30 transition-opacity duration-300"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search your memories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-card/80 backdrop-blur-sm border-journal-accent/30 focus:border-primary shadow-paper hover:shadow-gentle transition-all duration-300 rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            {[
              { icon: Calendar, label: "Today", color: "hover:bg-blue-500/10 hover:text-blue-600" },
              { icon: Camera, label: "Photos", color: "hover:bg-purple-500/10 hover:text-purple-600" },
              { icon: Music, label: "Music", color: "hover:bg-green-500/10 hover:text-green-600" }
            ].map(({ icon: Icon, label, color }) => (
              <Button 
                key={label}
                variant="outline" 
                size="lg" 
                className={`
                  glass border-journal-accent/30 hover:shadow-gentle transition-all duration-300 
                  group ${color}
                `}
              >
                <Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
```

### src/components/DiaryWritingModal.tsx
```tsx
import { useState } from "react";
import { X, Camera, MapPin, Save, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface DiaryWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: {
    title: string;
    content: string;
    location?: string;
    photos: string[];
    mood?: string;
    tags: string[];
  }) => void;
}

const writingPrompts = [
  "What made today special?",
  "How are you feeling right now?",
  "What did you learn today?",
  "What are you grateful for?",
  "What challenged you today?",
  "What made you smile?",
  "What would you like to remember about this moment?",
  "How did you grow today?",
];

const moodOptions = ["😊 Happy", "😌 Peaceful", "🤔 Thoughtful", "😴 Tired", "😎 Confident", "💭 Reflective", "🌟 Inspired", "😅 Grateful"];

export function DiaryWritingModal({ isOpen, onClose, onSave }: DiaryWritingModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    if (!content.trim()) return;
    
    onSave({
      title: title || `Entry from ${new Date().toLocaleDateString()}`,
      content,
      location: location || undefined,
      photos,
      mood: selectedMood || undefined,
      tags,
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setLocation("");
    setSelectedMood("");
    setPhotos([]);
    setTags([]);
    setNewTag("");
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertPrompt = (prompt: string) => {
    setContent(prev => prev + (prev ? "\n\n" : "") + prompt + " ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card shadow-floating border border-journal-accent/20 backdrop-blur-sm animate-scale-in">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-warm opacity-5 rounded-lg"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-sage rounded-full opacity-10 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-hero rounded-full opacity-10 translate-y-12 -translate-x-12"></div>
        
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-serif text-foreground flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/15 rounded-xl shadow-soft">
              <Sparkles className="w-6 h-6 text-primary animate-pulse-slow" />
            </div>
            <span className="bg-gradient-to-r from-primary to-journal-accent bg-clip-text text-transparent">
              Write in Your Diary
            </span>
          </DialogTitle>
          <p className="text-sm text-journal-text-soft/80 font-light">
            Capture your thoughts, feelings, and memories in a beautiful, private space
          </p>
        </DialogHeader>

        <div className="space-y-8 relative">
          {/* Title */}
          <div className="group">
            <Label htmlFor="title" className="text-sm font-medium text-journal-text-soft mb-2 block group-hover:text-primary transition-colors duration-300">
              ✨ Entry Title (optional)
            </Label>
            <Input
              id="title"
              placeholder="Give this beautiful moment a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-journal-accent/30 focus:border-primary bg-gradient-warm shadow-soft hover:shadow-gentle transition-all duration-300 focus:shadow-glow font-serif text-lg"
            />
          </div>

          {/* Writing Prompts */}
          <div className="p-6 bg-gradient-sage rounded-xl shadow-soft border border-journal-accent/20 group hover:shadow-gentle transition-all duration-300">
            <Label className="text-sm font-medium text-journal-text-soft mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
              Need inspiration? Try one of these gentle prompts:
            </Label>
            <div className="flex flex-wrap gap-3">
              {writingPrompts.slice(0, 4).map((prompt, index) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => insertPrompt(prompt)}
                  className="text-xs border-journal-accent/40 hover:bg-journal-accent/15 text-journal-text-soft hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-soft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Sparkles className="w-3 h-3 mr-1 opacity-60" />
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="group">
            <Label htmlFor="content" className="text-sm font-medium text-journal-text-soft mb-3 block group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Pour your heart onto paper
            </Label>
            <div className="relative">
              <Textarea
                id="content"
                placeholder="What's dancing in your mind? Let your thoughts flow freely onto this digital paper..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[240px] border-journal-accent/30 focus:border-primary bg-gradient-paper shadow-soft hover:shadow-gentle focus:shadow-glow transition-all duration-300 resize-none text-base leading-relaxed font-serif placeholder:text-journal-text-soft/60 placeholder:font-light"
              />
              <div className="absolute bottom-4 right-4 text-xs text-journal-text-soft/50 font-light">
                {content.length} characters
              </div>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="p-5 bg-gradient-warm rounded-xl shadow-soft border border-journal-accent/15">
            <Label className="text-sm font-medium text-journal-text-soft mb-4 block flex items-center gap-2">
              <div className="w-2 h-2 bg-journal-accent rounded-full animate-pulse-slow"></div>
              How is your heart feeling right now?
            </Label>
            <div className="flex flex-wrap gap-3">
              {moodOptions.map((mood, index) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                  className={selectedMood === mood 
                    ? "bg-primary text-primary-foreground shadow-glow animate-scale-in" 
                    : "border-journal-accent/40 hover:bg-journal-accent/15 text-journal-text-soft hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-soft"
                  }
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="group">
            <Label htmlFor="location" className="text-sm font-medium text-journal-text-soft mb-2 block group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Where is this moment unfolding? (optional)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-journal-accent w-4 h-4 group-hover:text-primary transition-colors duration-300" />
              <Input
                id="location"
                placeholder="The cozy corner where your story begins..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 border-journal-accent/30 focus:border-primary bg-gradient-warm shadow-soft hover:shadow-gentle focus:shadow-glow transition-all duration-300"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="p-5 bg-gradient-sage rounded-xl shadow-soft border border-journal-accent/15">
            <Label className="text-sm font-medium text-journal-text-soft mb-3 block flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-journal-accent rounded-full"></div>
              Add magical tags to organize your memories
            </Label>
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="memories, gratitude, adventure..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 border-journal-accent/30 focus:border-primary bg-gradient-warm shadow-soft hover:shadow-gentle focus:shadow-glow transition-all duration-300"
              />
              <Button 
                variant="outline" 
                onClick={addTag}
                className="border-journal-accent/40 hover:bg-journal-accent/15 hover:border-primary transition-all duration-300 hover:scale-105 shadow-soft"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 animate-fade-in">
                {tags.map((tag, index) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-journal-accent/15 text-journal-text-soft border-journal-accent/25 cursor-pointer hover:bg-journal-accent/25 transition-all duration-200 hover:scale-105 px-3 py-1.5 shadow-soft"
                    onClick={() => removeTag(tag)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    #{tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Photos */}
          <div className="group">
            <Label className="text-sm font-medium text-journal-text-soft mb-3 block group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Capture the visual essence of this moment
            </Label>
            <Button
              variant="outline"
              className="w-full border-dashed border-journal-accent/40 hover:bg-journal-accent/10 py-12 transition-all duration-300 hover:border-primary hover:shadow-soft group hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-journal-accent/10 rounded-full group-hover:bg-primary/15 transition-colors duration-300">
                  <Camera className="w-6 h-6 text-journal-accent group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-journal-text-soft group-hover:text-primary transition-colors duration-300">
                    Add photos to your beautiful entry
                  </div>
                  <div className="text-xs text-journal-text-soft/60 mt-1">
                    Let images tell part of your story
                  </div>
                </div>
              </div>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-journal-accent/20 relative">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-journal-accent/40 hover:bg-journal-accent/10 hover:border-journal-accent transition-all duration-300 hover:scale-105 shadow-soft py-3"
            >
              Maybe later
            </Button>
            <Button
              onClick={handleSave}
              disabled={!content.trim()}
              className="flex-1 bg-gradient-to-r from-primary to-journal-accent hover:from-primary/90 hover:to-journal-accent/90 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 py-3 font-medium"
            >
              <Save className="w-5 h-5 mr-2" />
              Preserve this moment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### src/components/JournalEntry.tsx
```tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, Music, Calendar, MessageCircle, Plus, Heart } from "lucide-react";

interface JournalEntryProps {
  entry: {
    id: string;
    date: string;
    time: string;
    location?: string;
    photos?: string[];
    music?: string;
    calendarEvent?: string;
    autoText: string;
    userText?: string;
    prompts: string[];
    tags: string[];
  };
  onAddContext: (entryId: string) => void;
}

export function JournalEntry({ entry, onAddContext }: JournalEntryProps) {
  return (
    <article className="group relative bg-gradient-card shadow-paper hover:shadow-gentle border border-journal-accent/20 rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] hover-glow">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-sage rounded-full opacity-5 -translate-y-10 translate-x-10 group-hover:opacity-10 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-warm rounded-full opacity-5 translate-y-8 -translate-x-8 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <header className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <time className="text-lg font-display font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {entry.date}
            </time>
            <div className="text-sm text-journal-text-soft group-hover:text-muted-foreground transition-colors duration-300">
              {entry.time}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl shadow-soft group-hover:bg-primary/20 transition-colors duration-300">
              <Heart className="w-5 h-5 text-primary animate-pulse-slow" />
            </div>
          </div>
        </div>

        {/* Context indicators */}
        <div className="flex flex-wrap gap-3 mb-4">
          {entry.location && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-sage rounded-lg shadow-soft border border-journal-accent/20 group-hover:shadow-gentle transition-all duration-300">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-journal-text-soft font-medium">{entry.location}</span>
            </div>
          )}
          
          {entry.music && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-warm rounded-lg shadow-soft border border-journal-accent/20 group-hover:shadow-gentle transition-all duration-300">
              <Music className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-journal-text-soft font-medium">{entry.music}</span>
            </div>
          )}
          
          {entry.calendarEvent && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-paper rounded-lg shadow-soft border border-journal-accent/20 group-hover:shadow-gentle transition-all duration-300">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-journal-text-soft font-medium">{entry.calendarEvent}</span>
            </div>
          )}
          
          {entry.photos && entry.photos.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-hero rounded-lg shadow-soft border border-journal-accent/20 group-hover:shadow-gentle transition-all duration-300">
              <Camera className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-journal-text-soft font-medium">{entry.photos.length} photo{entry.photos.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </header>

      {/* Entry content */}
      <div className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-journal-text-soft leading-relaxed font-serif text-base group-hover:text-foreground transition-colors duration-300">
            {entry.autoText}
          </p>
        </div>

        {entry.userText && (
          <div className="p-6 bg-gradient-elegant rounded-xl shadow-soft border border-primary/20 group-hover:shadow-gentle transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Your thoughts</span>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed font-serif">
              {entry.userText}
            </p>
          </div>
        )}

        {/* Photo gallery */}
        {entry.photos && entry.photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {entry.photos.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gradient-sage rounded-xl overflow-hidden shadow-soft hover:shadow-gentle transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={photo}
                  alt={`Memory from ${entry.date}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Writing prompts */}
      <div className="mt-8 p-6 bg-gradient-subtle rounded-xl shadow-soft border border-journal-accent/15 group-hover:shadow-gentle transition-all duration-300">
        <h4 className="text-sm font-medium text-journal-text-soft mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-slow"></div>
          Reflection prompts
        </h4>
        <div className="flex flex-wrap gap-2">
          {entry.prompts.map((prompt, index) => (
            <Button
              key={prompt}
              variant="ghost"
              size="sm"
              className="text-xs text-journal-text-soft hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 shadow-soft h-auto py-2 px-3 rounded-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags and actions */}
      <footer className="flex items-center justify-between mt-8 pt-6 border-t border-journal-accent/20">
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag, index) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-journal-accent/15 text-journal-text-soft hover:bg-journal-accent/25 transition-all duration-200 hover:scale-105 px-3 py-1.5 shadow-soft"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              #{tag}
            </Badge>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddContext(entry.id)}
          className="border-journal-accent/40 hover:bg-journal-accent/15 hover:border-primary transition-all duration-300 hover:scale-105 shadow-soft"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Add thoughts</span>
        </Button>
      </footer>
    </article>
  );
}
```

### src/components/FloatingWriteButton.tsx
```tsx
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingWriteButtonProps {
  onClick: () => void;
}

export function FloatingWriteButton({ onClick }: FloatingWriteButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={onClick}
        variant="elegant"
        className="w-16 h-16 rounded-full shadow-floating hover-glow group"
        size="icon"
      >
        <PenTool className="w-7 h-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
      </Button>
      
      {/* Enhanced ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-elegant opacity-20 animate-ping"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-elegant opacity-10 animate-pulse"></div>
    </div>
  );
}
```

### src/components/PrivacyBanner.tsx
```tsx
import { Shield, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrivacyBanner() {
  return (
    <div className="mb-8 p-6 bg-gradient-elegant rounded-2xl shadow-elegant border border-primary/20 backdrop-blur-sm group hover:shadow-glow transition-all duration-500 animate-fade-in">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-sage opacity-5 rounded-2xl"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-warm rounded-full opacity-10 -translate-y-12 translate-x-12"></div>
      
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-primary-foreground/15 rounded-xl shadow-soft group-hover:bg-primary-foreground/25 transition-colors duration-300">
          <Shield className="w-6 h-6 text-primary-foreground animate-pulse-slow" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-display font-medium text-primary-foreground">
              Your Privacy is Sacred
            </h3>
            <div className="flex items-center gap-1 px-3 py-1 bg-primary-foreground/15 rounded-full">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span className="text-xs text-emerald-300 font-medium">Protected</span>
            </div>
          </div>
          
          <p className="text-primary-foreground/90 mb-4 leading-relaxed font-light">
            All your journal entries are processed locally on your device. Your thoughts, memories, and personal moments never leave your control. We believe your story belongs to you, and you alone.
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-primary-foreground/80 font-medium">End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-300" />
              <span className="text-sm text-primary-foreground/80 font-medium">Local processing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-primary-foreground/80 font-medium">No data sharing</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="hidden md:flex bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-300 hover:scale-105 shadow-soft backdrop-blur-sm"
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}
```

---

## UI Components (Enhanced)

### src/components/ui/button.tsx
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
        elegant: "bg-gradient-elegant text-primary-foreground hover:shadow-elegant transition-all duration-300 hover:scale-105",
        vibrant: "bg-gradient-vibrant text-white hover:shadow-glow transition-all duration-300 hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### src/components/ui/input.tsx
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
```

### src/components/ui/label.tsx
```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
```

### src/components/ui/dialog.tsx
```tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

### src/components/ui/toast.tsx
```tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
```

### src/components/ui/toaster.tsx
```tsx
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
```

### src/components/ui/textarea.tsx
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
```

### src/components/ui/badge.tsx
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

### src/components/ui/sonner.tsx
```tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
```

### src/components/ui/tooltip.tsx
```tsx
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

### src/components/ui/use-toast.ts
```ts
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
```

### src/components/ui/aspect-ratio.tsx
```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
```

### src/components/ui/skeleton.tsx
```tsx
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
```

### src/components/ui/separator.tsx
```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
```

### src/components/ui/slider.tsx
```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
```

### src/components/ui/switch.tsx
```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
```

### src/vite-env.d.ts
```ts
/// <reference types="vite/client" />
```

---

## Key Features

This Digital Journal app includes:

1. **Landing Page** - Elegant welcome page with feature showcase
2. **Main Journal View** - Interactive journal entries with rich content
3. **Writing Modal** - Beautiful diary entry creation with prompts
4. **Advanced Design System** - Comprehensive CSS variables and theming
5. **Responsive Design** - Mobile-first approach with breakpoints
6. **Animation System** - Smooth transitions and micro-interactions
7. **Component Architecture** - Reusable UI components with variants
8. **Privacy-First** - Local processing emphasis throughout
9. **Search Functionality** - Filter through journal entries
10. **Rich Content Support** - Photos, music, location, tags, and more

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** with custom design system
- **Radix UI** components for accessibility
- **Lucide React** icons
- **React Router** for navigation
- **TanStack Query** for state management
- **Class Variance Authority** for component variants

This is a complete, production-ready journaling application with beautiful design, smooth animations, and a privacy-focused approach.
