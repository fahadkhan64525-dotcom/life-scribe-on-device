import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Clock, Camera, Music, Calendar, MessageCircle, Sparkles, Edit, Trash2, Quote, BookOpen } from "lucide-react";
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
  const [isPageTurning, setIsPageTurning] = useState(false);
  const { toast } = useToast();

  const currentEntry = entries[currentPage];

  // Get mood-based shayari
  const shayari = useMemo(() => {
    if (!currentEntry) return null;
    const mood = (currentEntry as any).mood || "default";
    return getShayariForMood(mood);
  }, [currentEntry, currentPage]);

  const goToNextPage = () => {
    if (currentPage < entries.length - 1 && !isPageTurning) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setAiInsight("");
        setIsPageTurning(false);
      }, 300);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0 && !isPageTurning) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setAiInsight("");
        setIsPageTurning(false);
      }, 300);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [currentPage, entries.length, isPageTurning]);

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
      <div className="flex flex-col items-center justify-center min-h-[600px] animate-fade-in">
        <div className="w-32 h-32 rounded-full bg-gradient-elegant flex items-center justify-center mb-6 pulse-soft">
          <BookOpen className="w-16 h-16 text-primary-foreground" />
        </div>
        <p className="text-xl text-muted-foreground font-serif mb-2">Your journal awaits</p>
        <p className="text-sm text-muted-foreground/70">Start writing to fill these pages with memories</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Book Container with enhanced styling */}
      <div 
        className={`relative book-page vintage-paper rounded-2xl shadow-floating p-4 sm:p-8 md:p-12 min-h-[500px] sm:min-h-[700px] transition-all duration-300 ${
          isPageTurning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Decorative book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-l-2xl">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 rounded-full" />
        </div>
        
        {/* Page edge effect */}
        <div className="absolute right-0 top-4 bottom-4 w-1 flex flex-col gap-[2px]">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="flex-1 bg-muted/40 rounded-r-full" />
          ))}
        </div>

        {/* Subtle page lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="h-[1px] bg-foreground my-7 mx-12" />
          ))}
        </div>

        {/* Page Content */}
        <div className="relative z-10 pl-3 sm:pl-6 pr-2 sm:pr-4 stagger-fade-in">
          {/* Header with elegant styling */}
          <div className="mb-8 pb-6 border-b border-primary/20">
            {currentEntry.title && (
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3 ink-text fancy-underline inline-block">
                {currentEntry.title}
              </h2>
            )}
            <h3 className="font-serif text-lg text-muted-foreground mb-4 italic">
              {currentEntry.date}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span>{currentEntry.time}</span>
              </div>
              {currentEntry.location && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{currentEntry.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* John Elia Shayari with enhanced styling */}
          {shayari && (
            <div className="mb-8 p-5 bg-gradient-to-r from-accent/30 to-primary/10 rounded-xl border border-primary/20 elegant-card">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-foreground leading-relaxed font-serif text-lg text-right ink-text" dir="rtl" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {shayari.urdu.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < shayari.urdu.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-serif text-sm italic border-t border-primary/10 pt-3">
                    {shayari.english.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < shayari.english.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-muted-foreground/70 text-right font-medium">— John Elia (جان ایلیا)</p>
                </div>
              </div>
            </div>
          )}

          {/* Media Icons with improved styling */}
          {(currentEntry.photos?.length || currentEntry.music || currentEntry.calendarEvent) && (
            <div className="flex gap-3 mb-6 flex-wrap">
              {currentEntry.photos && currentEntry.photos.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPhotos(!showPhotos)}
                  className="bg-accent/50 hover:bg-accent/70 border border-primary/20 transition-all duration-300 hover:scale-105"
                >
                  <Camera className="w-4 h-4 mr-2 text-primary" />
                  {currentEntry.photos.length} Photos
                </Button>
              )}
              {currentEntry.music && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (currentEntry.music?.startsWith('http')) {
                      window.open(currentEntry.music, '_blank');
                    } else {
                      toast({ title: "🎵 Now Playing", description: currentEntry.music });
                    }
                  }}
                  className="bg-accent/50 hover:bg-accent/70 border border-primary/20 transition-all duration-300 hover:scale-105"
                >
                  <Music className="w-4 h-4 mr-2 text-primary" />
                  {currentEntry.music?.length > 25 ? currentEntry.music.substring(0, 25) + '...' : currentEntry.music}
                </Button>
              )}
              {currentEntry.calendarEvent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast({ title: "Calendar Event", description: currentEntry.calendarEvent })}
                  className="bg-accent/50 hover:bg-accent/70 border border-primary/20 transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Event
                </Button>
              )}
            </div>
          )}

          {/* Photos with improved grid */}
          {currentEntry.photos && currentEntry.photos.length > 0 && showPhotos && (
            <div className="mb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
              {currentEntry.photos.map((photo, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl elegant-card">
                  <img
                    src={photo}
                    alt={`Memory from ${currentEntry.date}`}
                    className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          )}

          {/* Main content with enhanced typography */}
          <div className="mb-8">
            <p className="text-foreground leading-relaxed text-base sm:text-lg font-serif ink-text first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3 first-letter:mt-1">
              {currentEntry.autoText}
            </p>
          </div>

          {/* User-added context with improved styling */}
          {currentEntry.userText && (
            <div className="mb-8 p-5 bg-gradient-to-r from-muted/80 to-muted/40 rounded-xl border-l-4 border-primary">
              <p className="text-foreground italic leading-relaxed font-serif text-lg ink-text">
                "{currentEntry.userText}"
              </p>
            </div>
          )}

          {/* Smart prompts */}
          {currentEntry.prompts && currentEntry.prompts.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Reflect on this moment
              </p>
              <div className="flex flex-wrap gap-2">
                {currentEntry.prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* AI Insight Section with enhanced styling */}
          <div className="mb-8 pt-6 border-t border-primary/20">
            {!aiInsight ? (
              <Button
                onClick={generateInsight}
                disabled={isGenerating}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 group transition-all duration-300"
              >
                <Sparkles className={`w-4 h-4 mr-2 text-primary ${isGenerating ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
                {isGenerating ? "Generating Insight..." : "Generate AI Insight"}
              </Button>
            ) : (
              <div className="p-5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl animate-fade-in border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary mb-2">AI Reflection</p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-serif">
                      {aiInsight}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags and Actions with improved layout */}
          <div className="flex items-center justify-between pt-6 border-t border-primary/20 flex-wrap gap-4">
            <div className="flex gap-2 flex-wrap">
              {currentEntry.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditEntry(currentEntry)}
                className="hover:bg-primary/10 hover:text-primary transition-colors px-2 sm:px-3"
              >
                <Edit className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-destructive/10 hover:text-destructive transition-colors px-2 sm:px-3"
                  >
                    <Trash2 className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Delete</span>
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
                className="hover:bg-primary/10 hover:text-primary transition-colors px-2 sm:px-3"
              >
                <MessageCircle className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Add thoughts</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Page Number with decorative styling */}
        <div className="absolute bottom-3 right-4 sm:bottom-6 sm:right-10 flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block w-12 h-[1px] bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-xs sm:text-sm text-muted-foreground font-serif italic">
            Page {currentPage + 1} of {entries.length}
          </span>
        </div>
      </div>

      {/* Navigation Controls with enhanced styling */}
      <div className="flex items-center justify-between mt-6 sm:mt-8 px-2 sm:px-4 gap-2">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 0 || isPageTurning}
          variant="outline"
          size="default"
          className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 disabled:opacity-40 transition-all duration-300 group sm:h-11 sm:px-8"
        >
          <ChevronLeft className="w-5 h-5 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center max-w-[40%]">
          {entries.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isPageTurning && index !== currentPage) {
                  setIsPageTurning(true);
                  setTimeout(() => {
                    setCurrentPage(index);
                    setAiInsight("");
                    setIsPageTurning(false);
                  }, 300);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === entries.length - 1 || isPageTurning}
          variant="outline"
          size="default"
          className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 disabled:opacity-40 transition-all duration-300 group sm:h-11 sm:px-8"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
