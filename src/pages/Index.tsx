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
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'photos' | 'music'>('all');
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
        title: entry.title,
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
        music: entry.music,
        autoText: entry.content,
        userText: entry.mood ? `Feeling ${entry.mood.toLowerCase()}` : undefined,
        mood: entry.mood,
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

  const filteredEntries = entries.filter(entry => {
    // Text search filter
    const matchesSearch = 
      entry.autoText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.userText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.location?.toLowerCase().includes(searchQuery.toLowerCase());

    // Active filter
    if (activeFilter === 'today') {
      const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return matchesSearch && entry.date === today;
    }
    if (activeFilter === 'photos') {
      return matchesSearch && entry.photos && entry.photos.length > 0;
    }
    if (activeFilter === 'music') {
      return matchesSearch && entry.music;
    }
    return matchesSearch;
  });

  const handleFilterToday = () => {
    setActiveFilter(activeFilter === 'today' ? 'all' : 'today');
    toast({
      title: activeFilter === 'today' ? "Showing all entries" : "Filtered to today",
      description: activeFilter === 'today' ? "All entries are now visible" : "Showing only today's entries",
    });
  };

  const handleFilterPhotos = () => {
    setActiveFilter(activeFilter === 'photos' ? 'all' : 'photos');
    toast({
      title: activeFilter === 'photos' ? "Showing all entries" : "Filtered to photos",
      description: activeFilter === 'photos' ? "All entries are now visible" : "Showing entries with photos",
    });
  };

  const handleFilterMusic = () => {
    setActiveFilter(activeFilter === 'music' ? 'all' : 'music');
    toast({
      title: activeFilter === 'music' ? "Showing all entries" : "Filtered to music",
      description: activeFilter === 'music' ? "All entries are now visible" : "Showing entries with music",
    });
  };

  const handleAddContext = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (entry) {
      handleEditEntry(entry);
    }
  };

  const handleSaveDiaryEntry = async (newEntry: {
    id?: string;
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

      if (newEntry.id) {
        // Update existing entry
        const { error } = await supabase
          .from("diary_entries")
          .update({
            title: newEntry.title,
            content: newEntry.content,
            location: newEntry.location,
            music: newEntry.music,
            mood: newEntry.mood,
            tags: newEntry.tags,
            photos: newEntry.photos,
          })
          .eq("id", newEntry.id)
          .eq("user_id", user.id);

        if (error) throw error;

        toast({
          title: "Entry updated!",
          description: "Your diary entry has been updated.",
        });
      } else {
        // Insert new entry
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
      }

      setEditingEntry(null);
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

  const handleEditEntry = (entry: any) => {
    setEditingEntry({
      id: entry.id,
      title: entry.title || "",
      content: entry.autoText,
      location: entry.location,
      photos: entry.photos || [],
      music: entry.music,
      mood: entry.mood || "",
      tags: entry.tags,
    });
    setIsWritingModalOpen(true);
  };

  const handleDeleteEntry = async (entryId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("diary_entries")
        .delete()
        .eq("id", entryId)
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Entry deleted",
        description: "Your diary entry has been removed.",
      });

      loadEntries();
    } catch (error: any) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete entry",
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
      <div className="min-h-screen theme-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-elegant opacity-20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-gradient-elegant opacity-40 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground font-serif">Opening your journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-background custom-scrollbar">
      <JournalHeader 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onFilterToday={handleFilterToday}
        onFilterPhotos={handleFilterPhotos}
        onFilterMusic={handleFilterMusic}
        activeFilter={activeFilter}
        onClearFilters={() => setActiveFilter('all')}
      />
      
      <main className="max-w-4xl mx-auto px-6 py-section relative">
        <PrivacyBanner />
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-title font-display font-medium text-foreground tracking-wide mb-1">Your Stories</h2>
            <p className="text-sm text-muted-foreground">
              {entries.length} {entries.length === 1 ? 'memory' : 'memories'} captured
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsWritingModalOpen(true)}
              className="glass border-primary/30 hover:shadow-gentle hover-glow group transition-all duration-300"
            >
              <PenTool className="w-5 h-5 mr-2 text-primary group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Write</span>
            </Button>
            <Button 
              variant="default"
              className="shadow-soft bg-gradient-elegant hover:shadow-elegant transition-all duration-300 group"
              onClick={() => setIsWritingModalOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">New Entry</span>
            </Button>
          </div>
        </div>

        {filteredEntries.length > 0 ? (
          <DiaryBook 
            entries={filteredEntries} 
            onAddContext={handleAddContext} 
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-elegant opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-14 h-14 text-primary pulse-soft" />
              </div>
            </div>
            <h3 className="text-xl font-display text-foreground mb-3">No entries found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              {searchQuery ? "Try adjusting your search terms" : "Start your journaling journey today"}
            </p>
            <Button 
              variant="default" 
              onClick={() => searchQuery ? setSearchQuery("") : setIsWritingModalOpen(true)}
              className="bg-gradient-elegant hover:shadow-elegant transition-all duration-300"
            >
              {searchQuery ? "Clear search" : "Write your first entry"}
            </Button>
          </div>
        )}
      </main>

      <FloatingWriteButton onClick={() => setIsWritingModalOpen(true)} />
      
      <DiaryWritingModal
        isOpen={isWritingModalOpen}
        onClose={() => {
          setIsWritingModalOpen(false);
          setEditingEntry(null);
        }}
        onSave={handleSaveDiaryEntry}
        editEntry={editingEntry}
      />
    </div>
  );
};

export default Index;