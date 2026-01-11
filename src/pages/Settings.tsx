import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Image, Palette, Trash2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LogoCreator } from "@/components/LogoCreator";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading preferences...</p>
      </div>
    );
  }

  const handleSaveLogo = (logoDataUrl: string) => {
    updatePreferences({ custom_logo: logoDataUrl });
  };

  const handleRemoveCustomLogo = () => {
    updatePreferences({ custom_logo: undefined });
    toast.success("Custom logo removed!");
  };

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

          <div className="space-y-4">
            {/* Logo Creator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Create Your Logo
                </CardTitle>
                <CardDescription>Design a personalized logo for your journal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <LogoCreator 
                    onSave={handleSaveLogo}
                    trigger={
                      <Button variant="default" className="gap-2">
                        <Palette className="h-4 w-4" />
                        Create New Logo
                      </Button>
                    }
                  />
                  {preferences.custom_logo && (
                    <Button variant="outline" onClick={handleRemoveCustomLogo} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Remove Custom Logo
                    </Button>
                  )}
                </div>
                {preferences.custom_logo && (
                  <p className="text-sm text-muted-foreground">
                    ✓ Using your custom logo
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Logo Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Logo Settings
                </CardTitle>
                <CardDescription>Customize how your logo appears</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Preview */}
                <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                  {preferences.logo_visible ? (
                    <Logo size={preferences.logo_size} />
                  ) : (
                    <p className="text-muted-foreground">Logo hidden</p>
                  )}
                </div>

                {/* Logo Visibility */}
                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="logo-visible">Show Logo</Label>
                  <Switch
                    id="logo-visible"
                    checked={preferences.logo_visible}
                    onCheckedChange={(checked) =>
                      updatePreferences({ logo_visible: checked })
                    }
                  />
                </div>

                {/* Logo Size */}
                <div className="space-y-2">
                  <Label>Logo Size</Label>
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
                </div>

                {/* Logo Position */}
                <div className="space-y-2">
                  <Label>Logo Position</Label>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
