import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Image, Flame, Moon, Sun, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { themePresets, getPresetsByCategory, ThemePreset } from "@/data/themePresets";

const ThemeCard = ({ 
  preset, 
  isSelected, 
  onSelect 
}: { 
  preset: ThemePreset; 
  isSelected: boolean; 
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 group
        ${isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]" : "hover:scale-[1.02]"}
      `}
    >
      {/* Preview Card */}
      <div 
        className="aspect-[3/4] w-full relative"
        style={{
          backgroundColor: `hsl(${preset.colors.background})`,
        }}
      >
        {/* Background Image */}
        {preset.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${preset.image})` }}
          />
        )}
        
        {/* Overlay Content Preview */}
        <div className="absolute inset-0 p-3 flex flex-col">
          {/* Spacer for image area */}
          <div className="flex-1" />
          
          {/* Mock UI Elements */}
          <div 
            className="rounded-lg p-2 space-y-1.5 backdrop-blur-sm"
            style={{
              backgroundColor: `hsl(${preset.colors.card} / 0.85)`,
            }}
          >
            <div 
              className="h-2 w-3/4 rounded"
              style={{ backgroundColor: `hsl(${preset.colors.muted})` }}
            />
            <div 
              className="h-2 w-full rounded"
              style={{ backgroundColor: `hsl(${preset.colors.muted})` }}
            />
            <div 
              className="h-2 w-2/3 rounded"
              style={{ backgroundColor: `hsl(${preset.colors.muted})` }}
            />
          </div>
        </div>

        {/* Selected Check */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-3 w-3" />
          </div>
        )}
      </div>

      {/* Label */}
      <p className="text-sm font-medium mt-2 text-foreground">{preset.label}</p>
    </button>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences, isLoading } = useTheme();
  const [customPrimary, setCustomPrimary] = useState(preferences.custom_primary_color || "");
  const [customAccent, setCustomAccent] = useState(preferences.custom_accent_color || "");
  const [themeCategory, setThemeCategory] = useState<"hot" | "dark" | "light">("hot");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading preferences...</p>
      </div>
    );
  }

  const categoryPresets = getPresetsByCategory(themeCategory);

  return (
    <div className="min-h-screen bg-background">
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
                <Flame className="mr-2 h-4 w-4" />
                Theme
              </TabsTrigger>
              <TabsTrigger value="logo">
                <Image className="mr-2 h-4 w-4" />
                Logo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-4">
              {/* Theme Category Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle>Themes</CardTitle>
                  <CardDescription>Choose a beautiful theme for your journal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category Selector */}
                  <div className="flex gap-2 border-b pb-4">
                    <Button
                      variant={themeCategory === "hot" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setThemeCategory("hot")}
                      className="gap-1.5"
                    >
                      <Flame className="h-4 w-4" />
                      Hot
                    </Button>
                    <Button
                      variant={themeCategory === "dark" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setThemeCategory("dark")}
                      className="gap-1.5"
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={themeCategory === "light" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setThemeCategory("light")}
                      className="gap-1.5"
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                  </div>

                  {/* Theme Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {categoryPresets.map((preset) => (
                      <ThemeCard
                        key={preset.id}
                        preset={preset}
                        isSelected={preferences.theme_preset === preset.id}
                        onSelect={() => updatePreferences({ theme_preset: preset.id })}
                      />
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
