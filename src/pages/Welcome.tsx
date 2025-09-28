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
            <Logo size="xl" className="mb-6" />
            <h2 className="text-2xl md:text-3xl text-foreground/80 font-light mb-4">
              Digital Journal
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
              size="lg"
              className="group px-8 py-6 text-lg font-medium bg-gradient-elegant hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
            >
              Start Journaling
              <ArrowRight className="ml-3 w-5 h-5 text-yellow-400 group-hover:translate-x-1 group-hover:text-yellow-300 transition-all" />
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