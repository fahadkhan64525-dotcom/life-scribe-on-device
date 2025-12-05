import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Clock, Camera, Music, Calendar, MessageCircle, Sparkles, Edit, Trash2, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getShayariForMood } from "@/data/johnEliaShayari";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DiaryEntry {
  id: string;
  title?: string;
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
}

interface DiaryBookProps {
  entries: DiaryEntry[];
  onAddContext: (entryId: string) => void;
  onEditEntry: (entry: DiaryEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

export function DiaryBook({ entries, onAddContext, onEditEntry, onDeleteEntry }: DiaryBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPhotos, setShowPhotos] = useState(true);
  const { toast } = useToast();

  const currentEntry = entries[currentPage];

  // Get mood-based shayari
  const shayari = useMemo(() => {
    if (!currentEntry) return "";
    const mood = currentEntry.prompts?.[0] || "default";
    return getShayariForMood(mood);
  }, [currentEntry, currentPage]);

  const goToNextPage = () => {
    if (currentPage < entries.length - 1) {
      setCurrentPage(currentPage + 1);
      setAiInsight("");
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setAiInsight("");
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent navigation when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goToPreviousPage();
          break;
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          goToNextPage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, entries.length]);

  const generateInsight = async () => {
    if (!currentEntry) return;
    
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-insight', {
        body: {
          content: currentEntry.autoText + (currentEntry.userText ? " " + currentEntry.userText : ""),
          mood: currentEntry.prompts?.[0],
          tags: currentEntry.tags
        }
      });

      if (error) throw error;

      if (data?.insight) {
        setAiInsight(data.insight);
        toast({
          title: "Insight Generated ✨",
          description: "AI has reflected on your entry",
        });
      }
    } catch (error) {
      console.error("Error generating insight:", error);
      toast({
        title: "Error",
        description: "Could not generate insight. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!currentEntry) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <p className="text-muted-foreground text-lg">No entries to display</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Book Container */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl shadow-2xl p-8 md:p-12 min-h-[700px] animate-fade-in">
        {/* Book Binding Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800/30 to-transparent dark:from-amber-700/20 rounded-l-2xl"></div>
        
        {/* Page Lines Effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-[1px] bg-amber-800 my-8"></div>
          ))}
        </div>

        {/* Page Content */}
        <div className="relative z-10 pr-4">
          {/* Header */}
          <div className="mb-8 pb-6 border-b-2 border-amber-800/20">
            {currentEntry.title && (
              <h2 className="font-serif text-2xl text-foreground mb-2 italic">
                "{currentEntry.title}"
              </h2>
            )}
            <h3 className="font-serif text-xl text-muted-foreground mb-3">
              {currentEntry.date}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{currentEntry.time}</span>
              </div>
              {currentEntry.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{currentEntry.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* John Elia Shayari */}
          {shayari && (
            <div className="mb-6 p-4 bg-gradient-to-r from-rose-50/80 to-amber-50/80 dark:from-rose-950/20 dark:to-amber-950/20 rounded-lg border border-rose-200/50 dark:border-rose-800/30">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-rose-500 dark:text-rose-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground leading-relaxed font-serif text-right" dir="rtl" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {shayari.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < shayari.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 text-right">— جان ایلیا</p>
                </div>
              </div>
            </div>
          )}

          {/* Media Icons */}
          {(currentEntry.photos?.length || currentEntry.music || currentEntry.calendarEvent) && (
            <div className="flex gap-3 mb-6">
              {currentEntry.photos && currentEntry.photos.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPhotos(!showPhotos)}
                  className="bg-purple-100/50 dark:bg-purple-900/20 hover:bg-purple-200/50 dark:hover:bg-purple-900/30"
                >
                  <Camera className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                  {currentEntry.photos.length} Photos
                </Button>
              )}
              {currentEntry.music && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Try to open music URL if it's a link
                    if (currentEntry.music?.startsWith('http')) {
                      window.open(currentEntry.music, '_blank');
                    } else {
                      toast({ title: "🎵 Now Playing", description: currentEntry.music });
                    }
                  }}
                  className="bg-green-100/50 dark:bg-green-900/20 hover:bg-green-200/50 dark:hover:bg-green-900/30"
                >
                  <Music className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  {currentEntry.music?.length > 30 ? currentEntry.music.substring(0, 30) + '...' : currentEntry.music}
                </Button>
              )}
              {currentEntry.calendarEvent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast({ title: "Calendar Event", description: currentEntry.calendarEvent })}
                  className="bg-blue-100/50 dark:bg-blue-900/20 hover:bg-blue-200/50 dark:hover:bg-blue-900/30"
                >
                  <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                  Event
                </Button>
              )}
            </div>
          )}

          {/* Photos */}
          {currentEntry.photos && currentEntry.photos.length > 0 && showPhotos && (
            <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentEntry.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Memory from ${currentEntry.date}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          )}

          {/* Auto-generated content */}
          <div className="mb-6">
            <p className="text-foreground leading-relaxed text-lg font-serif">
              {currentEntry.autoText}
            </p>
          </div>

          {/* User-added context */}
          {currentEntry.userText && (
            <div className="mb-6 p-4 bg-amber-100/50 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-600">
              <p className="text-foreground italic leading-relaxed font-serif">
                "{currentEntry.userText}"
              </p>
            </div>
          )}

          {/* Smart prompts */}
          {currentEntry.prompts && currentEntry.prompts.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Reflect on this moment:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentEntry.prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* AI Insight Section */}
          <div className="mb-6 pt-4 border-t-2 border-amber-800/20">
            {!aiInsight ? (
              <Button
                onClick={generateInsight}
                disabled={isGenerating}
                variant="outline"
                className="w-full border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating Insight..." : "Generate AI Insight ✨"}
              </Button>
            ) : (
              <div className="p-4 bg-amber-100/50 dark:bg-amber-900/10 rounded-lg animate-fade-in">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                      AI Reflection
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-serif">
                      {aiInsight}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags and Actions */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-amber-800/20 flex-wrap gap-4">
            <div className="flex gap-2 flex-wrap">
              {currentEntry.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditEntry(currentEntry)}
                className="hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this diary entry from your journal.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDeleteEntry(currentEntry.id)}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddContext(currentEntry.id)}
                className="hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Add thoughts
              </Button>
            </div>
          </div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-4 right-8 text-sm text-muted-foreground font-serif">
          Page {currentPage + 1} of {entries.length}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 px-4">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          variant="outline"
          size="lg"
          className="border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        
        <div className="text-sm text-muted-foreground">
          {currentPage + 1} / {entries.length}
        </div>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === entries.length - 1}
          variant="outline"
          size="lg"
          className="border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
