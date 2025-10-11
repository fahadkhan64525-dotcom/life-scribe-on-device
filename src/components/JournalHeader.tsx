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
            Whispers of Time
          </h1>
          <p className="text-xl text-journal-text-soft max-w-2xl mx-auto leading-relaxed font-light">
            Where your thoughts become timeless memories, 
            <span className="text-primary font-medium"> beautifully preserved forever</span>
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