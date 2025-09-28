import { MapPin, Clock, Camera, Music, Calendar, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    prompts?: string[];
    tags: string[];
  };
  onAddContext: (entryId: string) => void;
}

export function JournalEntry({ entry, onAddContext }: JournalEntryProps) {
  return (
    <Card className="group relative overflow-hidden p-6 bg-gradient-card shadow-paper border-journal-accent/20 hover:shadow-floating hover-glow transition-all duration-500 animate-fade-in gradient-border">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-elegant rounded-full opacity-10 -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      {/* Header */}
      <div className="relative flex items-start justify-between mb-6">
        <div>
          <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {entry.date}
          </h3>
          <div className="flex items-center gap-6 text-sm text-journal-text-soft">
            <div className="flex items-center gap-2 px-3 py-1 bg-journal-warm rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{entry.time}</span>
            </div>
            {entry.location && (
              <div className="flex items-center gap-2 px-3 py-1 bg-journal-warm rounded-full">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{entry.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {entry.photos && (
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Camera className="w-5 h-5 text-purple-600" />
            </div>
          )}
          {entry.music && (
            <div className="p-2 bg-green-500/10 rounded-xl">
              <Music className="w-5 h-5 text-green-600" />
            </div>
          )}
          {entry.calendarEvent && (
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          )}
        </div>
      </div>

      {/* Photos */}
      {entry.photos && entry.photos.length > 0 && (
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
            {entry.photos.map((photo, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 group/photo"
              >
                <img
                  src={photo}
                  alt={`Memory from ${entry.date}`}
                  className="w-24 h-24 object-cover rounded-xl shadow-soft group-hover/photo:shadow-gentle transition-all duration-300 group-hover/photo:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-sage opacity-0 group-hover/photo:opacity-10 rounded-xl transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Auto-generated content */}
      <div className="mb-6">
        <p className="text-foreground leading-relaxed text-lg font-light tracking-wide">{entry.autoText}</p>
      </div>

      {/* User-added context */}
      {entry.userText && (
        <div className="mb-6 p-4 bg-gradient-warm rounded-xl border-l-4 border-primary shadow-soft">
          <p className="text-foreground italic leading-relaxed font-medium">"{entry.userText}"</p>
        </div>
      )}

      {/* Smart prompts */}
      {entry.prompts && entry.prompts.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-journal-text-soft mb-3 font-medium">What would you like to remember about this moment?</p>
          <div className="flex flex-wrap gap-2">
            {entry.prompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-journal-accent/40 hover:bg-journal-accent/15 text-journal-text-soft hover:border-primary transition-all duration-300 hover:scale-105"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-journal-accent/20">
        <div className="flex gap-2 flex-wrap">
          {entry.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-journal-accent/15 text-journal-text-soft border-journal-accent/25 hover:bg-journal-accent/25 transition-colors duration-200 px-3 py-1"
            >
              #{tag}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddContext(entry.id)}
          className="text-primary hover:bg-primary/15 hover:text-primary font-medium hover-glow"
        >
          <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
          Add thoughts
        </Button>
      </div>
    </Card>
  );
}