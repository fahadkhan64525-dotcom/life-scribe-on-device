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
    <div className="min-h-screen bg-gradient-hero custom-scrollbar">
      <JournalHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="max-w-4xl mx-auto px-6 py-section relative">
        <PrivacyBanner />
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-title font-serif text-foreground">Your Story</h2>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsWritingModalOpen(true)}
              className="glass border-journal-accent/30 hover:shadow-gentle transition-all duration-300 hover:scale-105"
            >
              <PenTool className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Write</span>
            </Button>
            <Button className="bg-gradient-sage hover:shadow-glow shadow-soft transition-all duration-300 hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Add Entry</span>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onAddContext={handleAddContext}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-sage rounded-full mx-auto mb-6 flex items-center justify-center">
                <PenTool className="w-12 h-12 text-primary-foreground" />
              </div>
              <p className="text-journal-text-soft mb-6 text-lg">No entries found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="hover:scale-105 transition-transform duration-200">
                Clear search
              </Button>
            </div>
          )}
        </div>

        {filteredEntries.length > 0 && (
          <div className="text-center mt-16 py-12 border-t border-journal-accent/20">
            <p className="text-journal-text-soft mb-6 text-lg">
              Your journal grows automatically as you live your life.
            </p>
            <Button variant="outline" className="glass hover:shadow-gentle transition-all duration-300 hover:scale-105">
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