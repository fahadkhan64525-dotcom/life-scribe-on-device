import { Search, Calendar, Camera, Music, Settings, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

interface JournalHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToday?: () => void;
  onFilterPhotos?: () => void;
  onFilterMusic?: () => void;
  activeFilter?: 'all' | 'today' | 'photos' | 'music';
  onClearFilters?: () => void;
}

export function JournalHeader({ searchQuery, onSearchChange, onFilterToday, onFilterPhotos, onFilterMusic, activeFilter = 'all', onClearFilters }: JournalHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <header className="relative bg-gradient-hero border-b border-journal-accent/20 px-4 sm:px-6 py-6 sm:py-12 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 paper-texture opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-sage rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-warm rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo />
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
          
          <div className="flex gap-3 flex-wrap justify-center">
            {activeFilter !== 'all' && (
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onClearFilters}
                className="glass border-red-500/30 bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:shadow-gentle transition-all duration-300 group animate-fade-in"
              >
                <X className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onFilterToday}
              className={`glass border-journal-accent/30 hover:shadow-gentle transition-all duration-300 group ${
                activeFilter === 'today' 
                  ? 'bg-blue-500/20 text-blue-600 border-blue-500/50' 
                  : 'hover:bg-blue-500/10 hover:text-blue-600'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Today</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onFilterPhotos}
              className={`glass border-journal-accent/30 hover:shadow-gentle transition-all duration-300 group ${
                activeFilter === 'photos' 
                  ? 'bg-purple-500/20 text-purple-600 border-purple-500/50' 
                  : 'hover:bg-purple-500/10 hover:text-purple-600'
              }`}
            >
              <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Photos</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onFilterMusic}
              className={`glass border-journal-accent/30 hover:shadow-gentle transition-all duration-300 group ${
                activeFilter === 'music' 
                  ? 'bg-green-500/20 text-green-600 border-green-500/50' 
                  : 'hover:bg-green-500/10 hover:text-green-600'
              }`}
            >
              <Music className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Music</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/settings")}
              className="glass border-journal-accent/30 hover:shadow-gentle transition-all duration-300 group hover:bg-orange-500/10 hover:text-orange-600"
            >
              <Settings className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}