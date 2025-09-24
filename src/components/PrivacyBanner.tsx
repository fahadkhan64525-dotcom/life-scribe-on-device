import { Shield, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PrivacyBanner() {
  return (
    <Card className="p-4 bg-gradient-sage text-primary-foreground shadow-gentle border-0 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-foreground/10 rounded-full">
          <Shield className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-4 h-4" />
            <span className="font-medium text-sm">100% Private</span>
          </div>
          <p className="text-sm opacity-90">
            All your data stays on your device. No cloud storage, no tracking, just your personal memories.
          </p>
        </div>
      </div>
    </Card>
  );
}