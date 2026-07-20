import { useState, useEffect, useRef, useCallback } from "react";
import { X, Camera, MapPin, Save, Sparkles, Music, Mic, MicOff, Pause, Maximize2, Minimize2, Check, Loader2, LocateFixed } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface DiaryWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: {
    id?: string;
    title: string;
    content: string;
    location?: string;
    photos: string[];
    music?: string;
    mood?: string;
    tags: string[];
  }) => void;
  editEntry?: {
    id: string;
    title?: string;
    content: string;
    location?: string;
    photos?: string[];
    music?: string;
    mood?: string;
    tags: string[];
  };
}

const writingPrompts = [
  "What made today special?",
  "How are you feeling right now?",
  "What did you learn today?",
  "What are you grateful for?",
  "What challenged you today?",
  "What made you smile?",
  "What would you like to remember about this moment?",
  "How did you grow today?",
];

const moodOptions = ["😊 Happy", "😌 Peaceful", "🤔 Thoughtful", "😴 Tired", "😎 Confident", "💭 Reflective", "🌟 Inspired", "😅 Grateful"];

const diaryEntrySchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().min(1, "Content is required").max(10000),
  location: z.string().max(200).optional(),
  music: z.string().max(500).optional(),
  tags: z.array(z.string().max(50)).max(20),
  mood: z.string().max(50).optional(),
  photos: z.array(z.string()),
});

const DRAFT_KEY = "diary-draft-v1";

export function DiaryWritingModal({ isOpen, onClose, onSave, editEntry }: DiaryWritingModalProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [music, setMusic] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [locating, setLocating] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autosaveTimer = useRef<number | null>(null);
  const savedTimer = useRef<number | null>(null);
  const hydrated = useRef(false);

  // Load / reset when opening
  useEffect(() => {
    if (!isOpen) {
      hydrated.current = false;
      return;
    }
    if (editEntry) {
      setTitle(editEntry.title || "");
      setContent(editEntry.content || "");
      setLocation(editEntry.location || "");
      setMusic(editEntry.music || "");
      setSelectedMood(editEntry.mood || "");
      setPhotos(editEntry.photos || []);
      setTags(editEntry.tags || []);
    } else {
      // Attempt to restore local draft
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const d = JSON.parse(raw);
          setTitle(d.title || "");
          setContent(d.content || "");
          setLocation(d.location || "");
          setMusic(d.music || "");
          setSelectedMood(d.mood || "");
          setPhotos(d.photos || []);
          setTags(d.tags || []);
          if (d.content) {
            toast({ title: "Draft restored", description: "Continuing where you left off." });
          }
        } else {
          setTitle(""); setContent(""); setLocation(""); setMusic("");
          setSelectedMood(""); setPhotos([]); setTags([]);
        }
      } catch {
        // ignore
      }
    }
    setNewTag("");
    hydrated.current = true;
  }, [isOpen, editEntry]);

  // Autosave draft (only for new entries) — debounced
  useEffect(() => {
    if (!isOpen || !hydrated.current || editEntry) return;
    if (autosaveTimer.current) window.clearTimeout(autosaveTimer.current);
    setSaveState("saving");
    autosaveTimer.current = window.setTimeout(() => {
      try {
        const hasAnything = title || content || location || music || selectedMood || photos.length || tags.length;
        if (hasAnything) {
          localStorage.setItem(DRAFT_KEY, JSON.stringify({
            title, content, location, music, mood: selectedMood, photos, tags,
          }));
        } else {
          localStorage.removeItem(DRAFT_KEY);
        }
        setSaveState("saved");
        if (savedTimer.current) window.clearTimeout(savedTimer.current);
        savedTimer.current = window.setTimeout(() => setSaveState("idle"), 1500);
      } catch {
        setSaveState("idle");
      }
    }, 800);
    return () => {
      if (autosaveTimer.current) window.clearTimeout(autosaveTimer.current);
    };
  }, [title, content, location, music, selectedMood, photos, tags, isOpen, editEntry]);

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
      setIsPaused(false);
      toast({ title: "Recording started", description: "Speak clearly to convert your voice to text" });
    };
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
      }
      if (finalTranscript) setContent((prev) => prev + (prev ? " " : "") + finalTranscript);
    };
    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setIsPaused(false);
      toast({
        title: "Recording error",
        description: event.error === "not-allowed"
          ? "Microphone access denied. Please enable microphone permissions."
          : "Failed to record audio. Please try again.",
        variant: "destructive",
      });
    };
    recognition.onend = () => { if (!isPaused) setIsRecording(false); };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const toggleVoiceRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({ title: "Not supported", description: "Voice recording is not supported in your browser.", variant: "destructive" });
      return;
    }
    if (!isRecording && !isPaused) startRecording();
    else if (isRecording && !isPaused) {
      recognitionRef.current?.stop();
      setIsPaused(true);
      toast({ title: "Recording paused" });
    } else if (isPaused) startRecording();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setIsPaused(false);
    toast({ title: "Recording stopped" });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const maxPhotos = 10;
    const remainingSlots = maxPhotos - photos.length;
    if (files.length > remainingSlots) {
      toast({ title: "Too many photos", description: `You can only add ${remainingSlots} more photo(s).`, variant: "destructive" });
      return;
    }
    setUploading(true);
    const uploadedUrls: string[] = [];
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to upload photos");
      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          toast({ title: "File too large", description: `${file.name} must be less than 5MB`, variant: "destructive" });
          continue;
        }
        if (!file.type.startsWith("image/")) continue;
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("diary-photos").upload(fileName, file);
        if (uploadError) continue;
        const { data: { publicUrl } } = supabase.storage.from("diary-photos").getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }
      if (uploadedUrls.length > 0) {
        setPhotos((prev) => [...prev, ...uploadedUrls]);
        toast({ title: "Photos uploaded", description: `${uploadedUrls.length} photo(s) uploaded` });
      }
    } catch (error: any) {
      toast({ title: "Upload error", description: error.message || "Failed to upload photos", variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removePhoto = (index: number) => setPhotos((prev) => prev.filter((_, i) => i !== index));

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({ title: "Not supported", description: "Geolocation isn't available in this browser.", variant: "destructive" });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14`);
          if (res.ok) {
            const data = await res.json();
            const a = data.address || {};
            const label = [a.suburb || a.neighbourhood || a.village || a.town || a.city, a.state, a.country]
              .filter(Boolean).join(", ");
            setLocation(label || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
          } else {
            setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
          }
          toast({ title: "Location added" });
        } catch {
          setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        toast({
          title: "Couldn't get location",
          description: err.code === err.PERMISSION_DENIED ? "Permission denied." : "Please try again.",
          variant: "destructive",
        });
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  const handleSave = useCallback(() => {
    const entryData = {
      title: title.trim() || undefined,
      content: content.trim(),
      location: location.trim() || undefined,
      music: music.trim() || undefined,
      photos,
      mood: selectedMood.trim() || undefined,
      tags,
    };
    const validation = diaryEntrySchema.safeParse(entryData);
    if (!validation.success) {
      toast({ title: "Validation Error", description: validation.error.errors[0].message, variant: "destructive" });
      return;
    }
    onSave({
      id: editEntry?.id,
      title: entryData.title || `Entry from ${new Date().toLocaleDateString()}`,
      content: entryData.content,
      location: entryData.location,
      music: entryData.music,
      photos: entryData.photos,
      mood: entryData.mood,
      tags: entryData.tags,
    });
    // clear draft on save
    if (!editEntry) {
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
      setTitle(""); setContent(""); setLocation(""); setMusic("");
      setSelectedMood(""); setPhotos([]); setTags([]); setNewTag("");
    }
    onClose();
  }, [title, content, location, music, photos, selectedMood, tags, editEntry, onSave, onClose, toast]);

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;
    if (trimmedTag.length > 50) return toast({ title: "Tag too long", variant: "destructive" });
    if (tags.length >= 20) return toast({ title: "Too many tags", variant: "destructive" });
    if (tags.includes(trimmedTag)) return toast({ title: "Duplicate tag", variant: "destructive" });
    setTags([...tags, trimmedTag]);
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => setTags(tags.filter((t) => t !== tagToRemove));
  const insertPrompt = (prompt: string) => {
    setContent((prev) => prev + (prev ? "\n\n" : "") + prompt + " ");
    textareaRef.current?.focus();
  };

  // Ctrl/Cmd+Enter save
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (content.trim() && !uploading) handleSave();
      }
      if (e.key === "Escape" && focusMode) {
        e.preventDefault();
        setFocusMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, content, uploading, handleSave, focusMode]);

  // Cleanup voice recognition when modal closes
  useEffect(() => {
    if (!isOpen && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setFocusMode(false);
    }
  }, [isOpen]);

  // Scroll active input into view when mobile keyboard opens
  const scrollIntoView = (el: HTMLElement) => {
    setTimeout(() => el.scrollIntoView({ block: "center", behavior: "smooth" }), 200);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-0 gap-0 border-0 sm:border-8 sm:border-[#654321] bg-[#8B7355] sm:shadow-2xl animate-scale-in overflow-hidden flex flex-col
                   w-screen h-[100dvh] max-w-none rounded-none
                   sm:w-[95vw] sm:max-w-4xl sm:h-[90vh] sm:rounded-lg"
      >
        {/* Sticky top bar (mobile-friendly) */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5 bg-[#654321] text-[#FFF8DC] border-b border-[#543210] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-serif truncate" style={{ fontFamily: "Georgia, serif" }}>
                {editEntry ? "Edit Entry" : "Dear Diary"}
              </div>
              <div className="text-[10px] opacity-70 truncate">
                {saveState === "saving" && "Saving draft…"}
                {saveState === "saved" && (<span className="inline-flex items-center gap-1"><Check className="w-3 h-3" />Draft saved</span>)}
                {saveState === "idle" && new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button" variant="ghost" size="icon"
              onClick={() => setFocusMode((v) => !v)}
              className="text-[#FFF8DC] hover:bg-white/10 h-9 w-9"
              title={focusMode ? "Exit focus mode" : "Focus mode"}
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              type="button" size="sm"
              onClick={handleSave}
              disabled={!content.trim() || uploading}
              className="bg-[#FFF8DC] text-[#654321] hover:bg-white h-9 px-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <Save className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button
              type="button" variant="ghost" size="icon"
              onClick={onClose}
              className="text-[#FFF8DC] hover:bg-white/10 h-9 w-9"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Body: paper */}
        <div
          className="flex-1 min-h-0 bg-[#FFF8DC] overflow-y-auto overscroll-contain"
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #E8DCC4 31px, #E8DCC4 32px)`,
            backgroundSize: "100% 32px",
          }}
        >
          <div className={`relative px-4 sm:px-10 py-4 sm:py-8 ${focusMode ? "max-w-3xl mx-auto" : ""}`}>
            <DialogHeader className="sr-only">
              <DialogTitle>{editEntry ? "Edit Diary Entry" : "New Diary Entry"}</DialogTitle>
            </DialogHeader>

            {/* Title */}
            <div className={focusMode ? "hidden" : "mb-4"}>
              <Label htmlFor="title" className="text-xs font-medium text-[#654321]/70 mb-1 block italic" style={{ fontFamily: "Georgia, serif" }}>
                Dear Diary,
              </Label>
              <Input
                id="title"
                placeholder="Today's chapter…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={(e) => scrollIntoView(e.currentTarget)}
                maxLength={200}
                className="h-11 border-none bg-transparent text-xl text-[#654321] placeholder:text-[#654321]/40 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                style={{ fontFamily: "Courier New, monospace" }}
              />
            </div>

            {/* Writing area */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 gap-2">
                <Label className="text-xs font-medium text-[#654321]/70 italic" style={{ fontFamily: "Georgia, serif" }}>
                  Pour your heart out…
                </Label>
                <div className="flex gap-1.5">
                  <Button
                    type="button" size="sm"
                    onClick={toggleVoiceRecording}
                    className={`h-8 px-2.5 text-xs ${
                      isRecording && !isPaused ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : isPaused ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-[#8B7355] hover:bg-[#654321]"
                    } text-white`}
                  >
                    {isRecording && !isPaused ? <Pause className="w-3.5 h-3.5 sm:mr-1.5" /> : <Mic className="w-3.5 h-3.5 sm:mr-1.5" />}
                    <span className="hidden sm:inline">
                      {isRecording && !isPaused ? "Pause" : isPaused ? "Resume" : "Voice"}
                    </span>
                  </Button>
                  {(isRecording || isPaused) && (
                    <Button type="button" size="sm" onClick={stopRecording} className="h-8 px-2.5 text-xs bg-gray-600 hover:bg-gray-700 text-white">
                      <MicOff className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
              <Textarea
                id="content"
                ref={textareaRef}
                placeholder="Today was…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={(e) => scrollIntoView(e.currentTarget)}
                maxLength={10000}
                className={`w-full border-none bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none text-base leading-8 px-0
                            ${focusMode ? "min-h-[70dvh]" : "min-h-[45dvh] sm:min-h-[280px]"}`}
                style={{ fontFamily: "Courier New, monospace" }}
              />
              <div className="flex items-center justify-between text-[11px] text-[#654321]/50 mt-1 italic" style={{ fontFamily: "Georgia, serif" }}>
                <span>{wordCount} words · {content.length}/10,000</span>
                <span className="hidden sm:inline">⌘/Ctrl + Enter to save</span>
              </div>

              {/* Inline attachment strip — always accessible, works in focus mode */}
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-[#8B7355]/20">
                <input
                  type="file" id="focus-photo-upload" accept="image/*" multiple
                  onChange={handlePhotoUpload} className="hidden"
                />
                <Button
                  type="button" size="sm" variant="ghost"
                  onClick={() => document.getElementById("focus-photo-upload")?.click()}
                  disabled={uploading || photos.length >= 10}
                  className="h-8 px-2.5 text-xs text-[#654321] hover:bg-[#8B7355]/10"
                  style={{ fontFamily: "Georgia, serif" }}
                  title="Attach photos"
                >
                  {uploading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Camera className="w-3.5 h-3.5 mr-1.5" />}
                  Photo{photos.length > 0 ? ` · ${photos.length}` : ""}
                </Button>

                <div className="flex items-center gap-1 flex-1 min-w-[160px]">
                  <MapPin className="w-3.5 h-3.5 text-[#654321]/60 shrink-0" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={(e) => scrollIntoView(e.currentTarget)}
                    placeholder="Add a location…"
                    maxLength={200}
                    className="h-8 border-none bg-transparent text-[#654321] placeholder:text-[#654321]/40 focus-visible:ring-0 focus-visible:ring-offset-0 px-1 text-sm"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                  <Button
                    type="button" size="icon" variant="ghost"
                    onClick={detectLocation} disabled={locating}
                    className="h-7 w-7 text-[#654321] hover:bg-[#8B7355]/10 shrink-0"
                    title="Use my current location"
                  >
                    {locating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-2 animate-fade-in">
                  {photos.map((photo, index) => (
                    <div key={`inline-${index}`} className="relative group">
                      <img src={photo} alt={`Attached ${index + 1}`} className="w-full h-16 object-cover rounded border border-[#8B7355]/30" />
                      <Button
                        type="button" variant="destructive" size="icon"
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {!focusMode && (
              <>
                {/* Prompts */}
                <div className="p-3 bg-[#FFF8DC] border-l-4 border-[#D2691E] mb-4">
                  <Label className="text-xs font-medium text-[#654321]/70 mb-2 block italic" style={{ fontFamily: "Georgia, serif" }}>
                    Need inspiration?
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {writingPrompts.slice(0, 4).map((prompt) => (
                      <Button
                        key={prompt} variant="ghost" size="sm"
                        onClick={() => insertPrompt(prompt)}
                        className="h-7 px-2 text-xs text-[#654321]/70 hover:text-[#654321] hover:bg-[#8B7355]/10"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div className="mb-4">
                  <Label className="text-xs font-medium text-[#654321]/70 mb-2 flex items-center gap-2 italic" style={{ fontFamily: "Georgia, serif" }}>
                    <Camera className="w-3 h-3" /> Memories in pictures
                  </Label>
                  <input type="file" id="photo-upload" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                  <label htmlFor="photo-upload" className="block">
                    <div className="w-full border border-dashed border-[#8B7355]/40 hover:bg-[#8B7355]/10 py-5 rounded transition-colors cursor-pointer text-center">
                      <Camera className="w-5 h-5 text-[#8B7355] mx-auto mb-1" />
                      <div className="text-xs text-[#654321]/70" style={{ fontFamily: "Georgia, serif" }}>
                        {uploading ? "Uploading…" : "Attach photos (max 10, 5MB)"}
                      </div>
                      {photos.length > 0 && (
                        <div className="text-xs text-[#654321] font-medium mt-1">{photos.length}/10 photos</div>
                      )}
                    </div>
                  </label>
                  {photos.length > 0 && (
                    <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img src={photo} alt={`Memory ${index + 1}`} className="w-full h-20 object-cover rounded border-2 border-[#8B7355]/30" />
                          <Button
                            type="button" variant="destructive" size="icon"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                            onClick={() => removePhoto(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mood */}
                <div className="p-3 bg-[#FFF8DC] border border-[#D2691E]/20 rounded mb-4">
                  <Label className="text-xs font-medium text-[#654321]/70 mb-2 block italic" style={{ fontFamily: "Georgia, serif" }}>
                    Today I'm feeling…
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood} variant={selectedMood === mood ? "default" : "ghost"} size="sm"
                        onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                        className={`h-8 px-2.5 text-xs ${selectedMood === mood ? "bg-[#8B7355] text-white hover:bg-[#654321]" : "text-[#654321] hover:bg-[#8B7355]/10"}`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <Label htmlFor="location" className="text-xs font-medium text-[#654321]/70 mb-1 flex items-center gap-2 italic" style={{ fontFamily: "Georgia, serif" }}>
                    <MapPin className="w-3 h-3" /> Where am I?
                  </Label>
                  <Input
                    id="location" placeholder="My favorite place…"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    onFocus={(e) => scrollIntoView(e.currentTarget)} maxLength={200}
                    className="h-10 border-none bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 rounded-none px-0 border-b border-[#654321]/20"
                    style={{ fontFamily: "Courier New, monospace" }}
                  />
                </div>

                {/* Music */}
                <div className="mb-4">
                  <Label htmlFor="music" className="text-xs font-medium text-[#654321]/70 mb-1 flex items-center gap-2 italic" style={{ fontFamily: "Georgia, serif" }}>
                    <Music className="w-3 h-3" /> What am I listening to?
                  </Label>
                  <Input
                    id="music" placeholder="Song, artist, or URL…"
                    value={music} onChange={(e) => setMusic(e.target.value)}
                    onFocus={(e) => scrollIntoView(e.currentTarget)} maxLength={500}
                    className="h-10 border-none bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 rounded-none px-0 border-b border-[#654321]/20"
                    style={{ fontFamily: "Courier New, monospace" }}
                  />
                </div>

                {/* Tags */}
                <div className="p-3 bg-[#FFF8DC] border border-[#D2691E]/20 rounded mb-4">
                  <Label className="text-xs font-medium text-[#654321]/70 mb-2 block italic" style={{ fontFamily: "Georgia, serif" }}>
                    Tags & memories
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a tag…" value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onFocus={(e) => scrollIntoView(e.currentTarget)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                      maxLength={50}
                      className="h-10 flex-1 border-none bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 rounded-none px-0 border-b border-[#654321]/20 text-sm"
                      style={{ fontFamily: "Courier New, monospace" }}
                    />
                    <Button variant="ghost" onClick={addTag} size="sm" className="text-[#654321] hover:bg-[#8B7355]/10">Add</Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 animate-fade-in">
                      {tags.map((tag) => (
                        <Badge
                          key={tag} variant="secondary"
                          className="bg-[#8B7355]/20 text-[#654321] border-[#8B7355]/30 cursor-pointer hover:bg-[#8B7355]/30"
                          onClick={() => removeTag(tag)}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          #{tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Bottom spacer so mobile keyboard doesn't hide last field */}
            <div className="h-24" />
          </div>
        </div>

        {/* Sticky bottom save bar */}
        <div className="shrink-0 bg-[#FFF8DC] border-t-2 border-[#8B7355]/30 px-3 sm:px-8 py-2.5 flex items-center justify-between gap-3"
             style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}>
          <div className="text-[11px] text-[#654321]/60 italic truncate" style={{ fontFamily: "Georgia, serif" }}>
            {saveState === "saved" ? "Draft saved locally" : saveState === "saving" ? "Saving draft…" : `${wordCount} words`}
          </div>
          <Button
            onClick={handleSave} disabled={!content.trim() || uploading}
            className="bg-[#8B7355] text-white hover:bg-[#654321] shadow-md disabled:opacity-50 h-10 px-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <Save className="w-4 h-4 mr-2" /> Save Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
