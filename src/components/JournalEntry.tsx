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
    <Card className="p-6 bg-card shadow-gentle border-journal-accent/20 hover:shadow-soft transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg text-foreground mb-1">{entry.date}</h3>
          <div className="flex items-center gap-4 text-sm text-journal-text-soft">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {entry.time}
            </div>
            {entry.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {entry.location}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          {entry.photos && <Camera className="w-4 h-4 text-journal-accent" />}
          {entry.music && <Music className="w-4 h-4 text-journal-accent" />}
          {entry.calendarEvent && <Calendar className="w-4 h-4 text-journal-accent" />}
        </div>
      </div>

      {/* Photos */}
      {entry.photos && entry.photos.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {entry.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Memory from ${entry.date}`}
                className="w-20 h-20 object-cover rounded-md shadow-soft flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Auto-generated content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed">{entry.autoText}</p>
      </div>

      {/* User-added context */}
      {entry.userText && (
        <div className="mb-4 p-3 bg-journal-warm rounded-lg border-l-2 border-primary">
          <p className="text-foreground italic leading-relaxed">"{entry.userText}"</p>
        </div>
      )}

      {/* Smart prompts */}
      {entry.prompts && entry.prompts.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-journal-text-soft mb-2">What would you like to remember about this moment?</p>
          <div className="flex flex-wrap gap-2">
            {entry.prompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-journal-accent/30 hover:bg-journal-accent/10 text-journal-text-soft"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-journal-accent/20">
        <div className="flex gap-1 flex-wrap">
          {entry.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-journal-accent/10 text-journal-text-soft border-journal-accent/20">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddContext(entry.id)}
          className="text-primary hover:bg-primary/10"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Add thoughts
        </Button>
      </div>
    </Card>
  );
}