import { Shield, Lock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PrivacyBanner() {
  return (
    <Card className="relative overflow-hidden p-6 bg-gradient-elegant text-primary-foreground shadow-floating border-0 mb-8 group hover-glow gradient-border">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-foreground/10 rounded-full -translate-y-6 translate-x-6 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary-foreground/5 rounded-full translate-y-4 -translate-x-4 animate-pulse-slow"></div>
      
      <div className="relative flex items-center gap-4">
        <div className="p-3 bg-primary-foreground/15 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          <Shield className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-emerald-200" />
            <span className="font-semibold text-lg">100% Private & Secure</span>
            <Eye className="w-4 h-4 opacity-70 text-blue-200" />
          </div>
          <p className="text-primary-foreground/90 leading-relaxed">
            All your data stays on your device. No cloud storage, no tracking, no third parties. 
            <span className="font-medium"> Your memories remain yours alone.</span>
          </p>
        </div>
      </div>
    </Card>
  );
}