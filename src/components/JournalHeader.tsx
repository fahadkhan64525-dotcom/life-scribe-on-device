import { Search, Calendar, Camera, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JournalHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function JournalHeader({ searchQuery, onSearchChange }: JournalHeaderProps) {
  return (
    <header className="bg-gradient-warm border-b border-journal-accent/20 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-serif text-foreground mb-2">Your Digital Journal</h1>
          <p className="text-journal-text-soft">Automatically weaving your life's moments into meaningful stories</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search your memories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-card border-journal-accent/30 focus:border-primary shadow-soft"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-journal-accent/30 hover:bg-journal-accent/10">
              <Calendar className="w-4 h-4 mr-2" />
              Today
            </Button>
            <Button variant="outline" size="sm" className="border-journal-accent/30 hover:bg-journal-accent/10">
              <Camera className="w-4 h-4 mr-2" />
              Photos
            </Button>
            <Button variant="outline" size="sm" className="border-journal-accent/30 hover:bg-journal-accent/10">
              <Music className="w-4 h-4 mr-2" />
              Music
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}