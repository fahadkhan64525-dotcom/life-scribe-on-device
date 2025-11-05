import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { JournalHeader } from "@/components/JournalHeader";
import { DiaryBook } from "@/components/DiaryBook";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DiaryWritingModal } from "@/components/DiaryWritingModal";
import { FloatingWriteButton } from "@/components/FloatingWriteButton";
import { Button } from "@/components/ui/button";
import { Plus, PenTool, LogOut, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [entries, setEntries] = useState<any[]>([]);
  const [isWritingModalOpen, setIsWritingModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check auth and load entries
  useEffect(() => {
    checkAuth();
    loadEntries();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  const loadEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("diary_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedEntries = data?.map((entry: any) => ({
        id: entry.id,
        date: new Date(entry.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: new Date(entry.created_at).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        location: entry.location,
        photos: entry.photos || [],
        autoText: entry.content,
        userText: entry.mood ? `Feeling ${entry.mood.toLowerCase()}` : undefined,
        tags: entry.tags || [],
        prompts: ["What else would you like to add?", "How did this make you feel?"],
      })) || [];

      setEntries(formattedEntries);
    } catch (error: any) {
      console.error("Error loading entries:", error);
      toast({
        title: "Error",
        description: "Failed to load diary entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveDiaryEntry = async (newEntry: {
    title: string;
    content: string;
    location?: string;
    photos: string[];
    music?: string;
    mood?: string;
    tags: string[];
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("diary_entries").insert({
        user_id: user.id,
        title: newEntry.title,
        content: newEntry.content,
        location: newEntry.location,
        music: newEntry.music,
        mood: newEntry.mood,
        tags: newEntry.tags,
        photos: newEntry.photos,
      });

      if (error) throw error;

      toast({
        title: "Entry saved!",
        description: "Your diary entry has been saved to the cloud.",
      });

      loadEntries();
    } catch (error: any) {
      console.error("Error saving entry:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save entry",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your diary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero custom-scrollbar">
      <JournalHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="max-w-4xl mx-auto px-6 py-section relative">
        <PrivacyBanner />
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-title font-display font-medium text-foreground tracking-wide">Whispers of Time</h2>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="hover:bg-destructive/10 hover:text-destructive"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsWritingModalOpen(true)}
              className="glass border-journal-accent/30 hover:shadow-gentle hover-glow"
            >
              <PenTool className="w-5 h-5 mr-2 text-purple-500" />
              <span className="hidden sm:inline">Write</span>
            </Button>
            <Button 
              variant="elegant"
              className="shadow-soft"
              onClick={() => setIsWritingModalOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2 text-emerald-300" />
              <span className="hidden sm:inline">Add Entry</span>
            </Button>
          </div>
        </div>

        {filteredEntries.length > 0 ? (
          <DiaryBook entries={filteredEntries} onAddContext={handleAddContext} />
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-elegant rounded-full mx-auto mb-6 flex items-center justify-center shadow-elegant">
              <BookOpen className="w-12 h-12 text-primary-foreground animate-pulse-slow" />
            </div>
            <p className="text-journal-text-soft mb-6 text-lg">No entries found matching your search.</p>
            <Button variant="elegant" onClick={() => setSearchQuery("")}>
              Clear search
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