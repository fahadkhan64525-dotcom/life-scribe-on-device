import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Moon, Sun, Palette, Image } from "lucide-react";
import { Logo } from "@/components/Logo";

const Settings = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences, isLoading } = useTheme();
  const [customPrimary, setCustomPrimary] = useState(preferences.custom_primary_color || "");
  const [customAccent, setCustomAccent] = useState(preferences.custom_accent_color || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading preferences...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journal
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-display font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Customize your journal experience</p>
          </div>

          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="theme">
                <Palette className="mr-2 h-4 w-4" />
                Theme
              </TabsTrigger>
              <TabsTrigger value="logo">
                <Image className="mr-2 h-4 w-4" />
                Logo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-4">
              {/* Dark/Light Mode */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {preferences.theme_mode === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Appearance Mode
                  </CardTitle>
                  <CardDescription>Choose between light and dark mode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch
                      id="dark-mode"
                      checked={preferences.theme_mode === "dark"}
                      onCheckedChange={(checked) =>
                        updatePreferences({ theme_mode: checked ? "dark" : "light" })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Theme Presets */}
              <Card>
                <CardHeader>
                  <CardTitle>Theme Presets</CardTitle>
                  <CardDescription>Choose from our curated color palettes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { value: "default", label: "Default", colors: "bg-gradient-to-br from-journal-warm to-journal-accent" },
                      { value: "ocean", label: "Ocean", colors: "bg-gradient-to-br from-blue-400 to-cyan-300" },
                      { value: "sunset", label: "Sunset", colors: "bg-gradient-to-br from-orange-400 to-pink-400" },
                      { value: "forest", label: "Forest", colors: "bg-gradient-to-br from-green-500 to-lime-400" },
                      { value: "lavender", label: "Lavender", colors: "bg-gradient-to-br from-purple-400 to-violet-300" },
                    ].map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => updatePreferences({ theme_preset: preset.value as any })}
                        className={`
                          relative p-4 rounded-lg transition-all
                          ${preferences.theme_preset === preset.value ? "ring-2 ring-primary scale-105" : "hover:scale-105"}
                        `}
                      >
                        <div className={`${preset.colors} h-16 rounded-md mb-2`} />
                        <p className="text-sm font-medium">{preset.label}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Custom Colors</CardTitle>
                  <CardDescription>Fine-tune your theme with custom HSL colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color (HSL)</Label>
                    <div className="flex gap-2">
                      <input
                        id="primary-color"
                        type="text"
                        placeholder="e.g., 200 80% 50%"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-md border bg-background"
                      />
                      <Button
                        onClick={() => updatePreferences({ custom_primary_color: customPrimary })}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color (HSL)</Label>
                    <div className="flex gap-2">
                      <input
                        id="accent-color"
                        type="text"
                        placeholder="e.g., 340 80% 65%"
                        value={customAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-md border bg-background"
                      />
                      <Button
                        onClick={() => updatePreferences({ custom_accent_color: customAccent })}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  {(preferences.custom_primary_color || preferences.custom_accent_color) && (
                    <Button
                      variant="outline"
                      onClick={() => updatePreferences({
                        custom_primary_color: undefined,
                        custom_accent_color: undefined,
                      })}
                    >
                      Reset to Preset Colors
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logo" className="space-y-4">
              {/* Logo Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo Preview</CardTitle>
                  <CardDescription>See how your logo looks with current settings</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center p-8">
                  {preferences.logo_visible ? (
                    <Logo size={preferences.logo_size} />
                  ) : (
                    <p className="text-muted-foreground">Logo hidden</p>
                  )}
                </CardContent>
              </Card>

              {/* Logo Visibility */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo Visibility</CardTitle>
                  <CardDescription>Show or hide the logo across your journal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="logo-visible">Show Logo</Label>
                    <Switch
                      id="logo-visible"
                      checked={preferences.logo_visible}
                      onCheckedChange={(checked) =>
                        updatePreferences({ logo_visible: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Logo Size */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo Size</CardTitle>
                  <CardDescription>Adjust the size of your logo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-3">
                    {["sm", "md", "lg", "xl"].map((size) => (
                      <Button
                        key={size}
                        variant={preferences.logo_size === size ? "default" : "outline"}
                        onClick={() => updatePreferences({ logo_size: size as any })}
                      >
                        {size.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Logo Position */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo Position</CardTitle>
                  <CardDescription>Choose where the logo appears</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "header", label: "Header" },
                      { value: "sidebar", label: "Sidebar" },
                      { value: "corner", label: "Corner" },
                    ].map((pos) => (
                      <Button
                        key={pos.value}
                        variant={preferences.logo_position === pos.value ? "default" : "outline"}
                        onClick={() => updatePreferences({ logo_position: pos.value as any })}
                      >
                        {pos.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
