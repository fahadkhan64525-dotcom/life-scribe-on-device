import { useState } from "react";
import { JournalHeader } from "@/components/JournalHeader";
import { JournalEntry } from "@/components/JournalEntry";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DiaryWritingModal } from "@/components/DiaryWritingModal";
import { FloatingWriteButton } from "@/components/FloatingWriteButton";
import { Button } from "@/components/ui/button";
import { Plus, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockEntries = [
  {
    id: "1",
    date: "Today, September 24",
    time: "2:30 PM",
    location: "Central Park, NYC",
    photos: ["/placeholder.svg", "/placeholder.svg"],
    music: "Autumn Leaves - Bill Evans",
    autoText: "You spent the afternoon in Central Park while listening to jazz. The weather was perfect for a walk, and you took several photos of the changing leaves. This seems like a peaceful moment in your day.",
    userText: "Had a wonderful conversation with Sarah about her new job. We sat by the pond and watched the ducks.",
    prompts: ["How did you feel?", "What made this special?", "Who were you with?"],
    tags: ["nature", "friends", "jazz", "autumn"],
  },
  {
    id: "2",
    date: "Yesterday, September 23",
    time: "7:45 AM",
    calendarEvent: "Team Standup Meeting",
    autoText: "Started your day with a team standup meeting. You also listened to a productivity podcast during your commute. Your calendar shows you had a busy but organized morning.",
    prompts: ["What went well in the meeting?", "Any new ideas?", "How are you feeling about the project?"],
    tags: ["work", "meetings", "productivity"],
  },
  {
    id: "3",
    date: "September 22",
    time: "6:15 PM",
    location: "Local Coffee Shop",
    photos: ["/placeholder.svg"],
    music: "Lo-fi Hip Hop Mix",
    autoText: "You visited your favorite coffee shop and spent time working on something while listening to lo-fi music. You took a photo of your workspace setup. This appears to be a focused work session.",
    tags: ["coffee", "work", "focus", "music"],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(mockEntries);
  const [isWritingModalOpen, setIsWritingModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredEntries = entries.filter(entry =>
    entry.autoText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.userText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    entry.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContext = (entryId: string) => {
    // In a real app, this would open a modal or navigate to an edit page
    console.log("Adding context to entry:", entryId);
  };

  const handleSaveDiaryEntry = (newEntry: {
    title: string;
    content: string;
    location?: string;
    photos: string[];
    mood?: string;
    tags: string[];
  }) => {
    const diaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }),
      time: new Date().toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit" 
      }),
      location: newEntry.location,
      photos: newEntry.photos.length > 0 ? newEntry.photos : undefined,
      music: undefined,
      calendarEvent: undefined,
      autoText: newEntry.content,
      userText: newEntry.mood ? `Feeling ${newEntry.mood.toLowerCase()}` : undefined,
      prompts: ["What else would you like to add?", "How did this make you feel?"],
      tags: [...newEntry.tags, "diary", "personal"],
    };

    setEntries([diaryEntry, ...entries]);
    
    toast({
      title: "Entry saved!",
      description: "Your diary entry has been added to your journal.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <JournalHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <PrivacyBanner />
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-foreground">Your Story</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsWritingModalOpen(true)}
              className="border-journal-accent/30 hover:bg-journal-accent/10"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Write
            </Button>
            <Button className="bg-primary hover:bg-primary/90 shadow-soft">
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onAddContext={handleAddContext}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-journal-text-soft mb-4">No entries found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>

        {filteredEntries.length > 0 && (
          <div className="text-center mt-12 py-8">
            <p className="text-journal-text-soft mb-4">
              Your journal grows automatically as you live your life.
            </p>
            <Button variant="outline" className="border-journal-accent/30 hover:bg-journal-accent/10">
              Load Earlier Entries
            </Button>
          </div>
        )}
      </main>

      <FloatingWriteButton onClick={() => setIsWritingModalOpen(true)} />
      
      <DiaryWritingModal
        isOpen={isWritingModalOpen}
        onClose={() => setIsWritingModalOpen(false)}
        onSave={handleSaveDiaryEntry}
      />
    </div>
  );
};

export default Index;