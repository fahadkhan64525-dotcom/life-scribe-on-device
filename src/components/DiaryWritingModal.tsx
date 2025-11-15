import { useState, useEffect, useRef } from "react";
import { X, Camera, MapPin, Save, Sparkles, Music, Mic, MicOff } from "lucide-react";
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

// Input validation schema
const diaryEntrySchema = z.object({
  title: z.string().max(200, "Title must be less than 200 characters").optional(),
  content: z.string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10,000 characters"),
  location: z.string().max(200, "Location must be less than 200 characters").optional(),
  music: z.string().max(500, "Music URL must be less than 500 characters").optional(),
  tags: z.array(z.string().max(50, "Tag must be less than 50 characters")).max(20, "Maximum 20 tags allowed"),
  mood: z.string().max(50, "Mood must be less than 50 characters").optional(),
  photos: z.array(z.string())
});

export function DiaryWritingModal({ isOpen, onClose, onSave, editEntry }: DiaryWritingModalProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState(editEntry?.title || "");
  const [content, setContent] = useState(editEntry?.content || "");
  const [location, setLocation] = useState(editEntry?.location || "");
  const [music, setMusic] = useState(editEntry?.music || "");
  const [selectedMood, setSelectedMood] = useState(editEntry?.mood || "");
  const [photos, setPhotos] = useState<string[]>(editEntry?.photos || []);
  const [tags, setTags] = useState<string[]>(editEntry?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not supported",
        description: "Voice recording is not supported in your browser. Please try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Speak clearly to convert your voice to text",
        });
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setContent(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({
          title: "Recording error",
          description: "Failed to record audio. Please try again.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const maxPhotos = 10;
    const remainingSlots = maxPhotos - photos.length;

    if (files.length > remainingSlots) {
      toast({
        title: "Too many photos",
        description: `You can only add ${remainingSlots} more photo(s). Maximum ${maxPhotos} photos per entry.`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to upload photos");
      }

      for (const file of Array.from(files)) {
        // Validate file
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is too large. Photos must be less than 5MB`,
            variant: "destructive",
          });
          continue;
        }

        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not an image file`,
            variant: "destructive",
          });
          continue;
        }

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('diary-photos')
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('diary-photos')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      if (uploadedUrls.length > 0) {
        setPhotos((prev) => [...prev, ...uploadedUrls]);
        toast({
          title: "Photos uploaded",
          description: `${uploadedUrls.length} photo(s) uploaded successfully`,
        });
      }
    } catch (error: any) {
      console.error("Error uploading photos:", error);
      toast({
        title: "Upload error",
        description: error.message || "Failed to upload photos",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Prepare entry data with trimmed values
    const entryData = {
      title: title.trim() || undefined,
      content: content.trim(),
      location: location.trim() || undefined,
      music: music.trim() || undefined,
      photos,
      mood: selectedMood.trim() || undefined,
      tags,
    };

    // Validate using Zod schema
    const validation = diaryEntrySchema.safeParse(entryData);
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
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
    
    // Reset form only if not editing
    if (!editEntry) {
      setTitle("");
      setContent("");
      setLocation("");
      setMusic("");
      setSelectedMood("");
      setPhotos([]);
      setTags([]);
      setNewTag("");
    }
    onClose();
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    
    // Validate tag
    if (!trimmedTag) return;
    
    if (trimmedTag.length > 50) {
      toast({
        title: "Tag too long",
        description: "Tags must be less than 50 characters",
        variant: "destructive",
      });
      return;
    }
    
    if (tags.length >= 20) {
      toast({
        title: "Too many tags",
        description: "Maximum 20 tags allowed per entry",
        variant: "destructive",
      });
      return;
    }
    
    if (tags.includes(trimmedTag)) {
      toast({
        title: "Duplicate tag",
        description: "This tag has already been added",
        variant: "destructive",
      });
      return;
    }
    
    setTags([...tags, trimmedTag]);
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertPrompt = (prompt: string) => {
    setContent(prev => prev + (prev ? "\n\n" : "") + prompt + " ");
  };

  // Keyboard shortcut for saving (Ctrl+Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (content.trim() && !uploading) {
          handleSave();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, content, uploading, handleSave]);

  // Cleanup voice recognition when modal closes
  useEffect(() => {
    if (!isOpen && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-hidden bg-[#8B7355] shadow-2xl border-8 border-[#654321] animate-scale-in p-0 flex">
        {/* Book binding on left */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#654321] to-[#8B7355] border-r-4 border-[#543210]">
          <div className="flex flex-col h-full justify-evenly px-1">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-1 bg-[#543210] rounded"></div>
            ))}
          </div>
        </div>

        {/* Paper pages */}
        <div className="ml-12 bg-[#FFF8DC] flex-1 flex flex-col relative" style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #E8DCC4 31px, #E8DCC4 32px)`,
          backgroundSize: '100% 32px'
        }}>
          {/* Red margin line */}
          <div className="absolute left-16 top-0 bottom-0 w-[2px] bg-red-300" />
          
          {/* Coffee stain decoration */}
          <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-[#D2691E] opacity-5" />
          
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="relative pl-20 pr-8 py-8">
            <DialogHeader className="relative mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <DialogTitle className="text-3xl font-serif text-[#654321] flex items-center gap-3 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    <Sparkles className="w-6 h-6 text-[#8B7355] animate-pulse-slow" />
                    <span>{editEntry ? "Edit Entry" : "My Diary"}</span>
                  </DialogTitle>
                  <p className="text-sm text-[#654321]/70 font-light italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    disabled={!content.trim() || uploading}
                    className="bg-[#8B7355] text-white hover:bg-[#654321] shadow-md disabled:opacity-50"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={onClose}
                    className="text-[#654321]/70 hover:text-[#654321] hover:bg-[#8B7355]/10"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 relative">
              {/* Title */}
              <div className="group">
                <Label htmlFor="title" className="text-sm font-medium text-[#654321] mb-2 block" style={{ fontFamily: 'Georgia, serif' }}>
                  Dear Diary,
                </Label>
                <Input
                  id="title"
                  placeholder="Today's chapter..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                  className="border-none bg-transparent text-xl text-[#654321] placeholder:text-[#654321]/40 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 font-light"
                  style={{ fontFamily: 'Courier New, monospace' }}
                />
              </div>

              {/* Photos */}
              <div className="group">
                <Label className="text-xs font-medium text-[#654321]/70 mb-3 block flex items-center gap-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                  <Camera className="w-3 h-3" />
                  Memories in pictures
                </Label>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label htmlFor="photo-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-[#8B7355]/40 hover:bg-[#8B7355]/10 py-8 transition-all bg-transparent"
                    disabled={uploading}
                    asChild
                  >
                    <div>
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="w-5 h-5 text-[#8B7355]" />
                        <div className="text-center">
                          <div className="text-xs text-[#654321]/70" style={{ fontFamily: 'Georgia, serif' }}>
                            {uploading ? "Uploading photos..." : "Attach photos (max 10, 5MB each)"}
                          </div>
                          {photos.length > 0 && (
                            <div className="text-xs text-[#654321] font-medium mt-1">
                              {photos.length}/10 photos
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Button>
                </label>
                
                {photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group/photo">
                         <img
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-20 object-cover rounded border-2 border-[#8B7355]/30"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-0 group-hover/photo:opacity-100 transition-opacity text-xs"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Writing Prompts */}
              <div className="p-4 bg-[#FFF8DC] border-l-4 border-[#D2691E] my-4">
                <Label className="text-xs font-medium text-[#654321]/70 mb-3 block italic" style={{ fontFamily: 'Georgia, serif' }}>
                  Need inspiration?
                </Label>
                <div className="flex flex-wrap gap-2">
                  {writingPrompts.slice(0, 4).map((prompt, index) => (
                    <Button
                      key={prompt}
                      variant="ghost"
                      size="sm"
                      onClick={() => insertPrompt(prompt)}
                      className="text-xs text-[#654321]/70 hover:text-[#654321] hover:bg-[#8B7355]/10 transition-all"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-medium text-[#654321]/70 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    Pour your heart out...
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={toggleVoiceRecording}
                    className={`${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-[#8B7355] hover:bg-[#654321]'} text-white transition-all`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Voice to Text
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative">
                  <Textarea
                    id="content"
                    placeholder="Today was..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={10000}
                    className="min-h-[280px] border-none bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none text-base leading-8 px-0"
                    style={{ fontFamily: 'Courier New, monospace' }}
                  />
                  <div className="text-xs text-[#654321]/40 mt-1 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {content.length} / 10,000 words
                  </div>
                </div>
              </div>

              {/* Mood Selection */}
              <div className="p-4 bg-[#FFF8DC] border border-[#D2691E]/20 rounded">
                <Label className="text-xs font-medium text-[#654321]/70 mb-3 block italic" style={{ fontFamily: 'Georgia, serif' }}>
                  Today I'm feeling...
                </Label>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood, index) => (
                    <Button
                      key={mood}
                      variant={selectedMood === mood ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                      className={selectedMood === mood 
                        ? "bg-[#8B7355] text-white hover:bg-[#654321]" 
                        : "text-[#654321] hover:bg-[#8B7355]/10"
                      }
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {mood}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="group">
                <Label htmlFor="location" className="text-xs font-medium text-[#654321]/70 mb-2 block flex items-center gap-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                  <MapPin className="w-3 h-3" />
                  Where am I?
                </Label>
                <Input
                  id="location"
                  placeholder="My favorite place..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  maxLength={200}
                  className="border-none border-b border-[#654321]/20 bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  style={{ fontFamily: 'Courier New, monospace' }}
                />
              </div>

              {/* Music */}
              <div className="group">
                <Label htmlFor="music" className="text-xs font-medium text-[#654321]/70 mb-2 block flex items-center gap-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                  <Music className="w-3 h-3" />
                  What am I listening to?
                </Label>
                <Input
                  id="music"
                  placeholder="Song name, artist, or music URL..."
                  value={music}
                  onChange={(e) => setMusic(e.target.value)}
                  maxLength={500}
                  className="border-none border-b border-[#654321]/20 bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  style={{ fontFamily: 'Courier New, monospace' }}
                />
              </div>

              {/* Tags */}
              <div className="p-4 bg-[#FFF8DC] border border-[#D2691E]/20 rounded">
                <Label className="text-xs font-medium text-[#654321]/70 mb-3 block italic" style={{ fontFamily: 'Georgia, serif' }}>
                  Tags & memories
                </Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    maxLength={50}
                    className="flex-1 border-none border-b border-[#654321]/20 bg-transparent text-[#654321] placeholder:text-[#654321]/30 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 text-sm"
                    style={{ fontFamily: 'Courier New, monospace' }}
                  />
                  <Button 
                    variant="ghost" 
                    onClick={addTag}
                    size="sm"
                    className="text-[#654321] hover:bg-[#8B7355]/10"
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 animate-fade-in">
                    {tags.map((tag, index) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#8B7355]/20 text-[#654321] border-[#8B7355]/30 cursor-pointer hover:bg-[#8B7355]/30 transition-all"
                        onClick={() => removeTag(tag)}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        #{tag} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div> {/* Close space-y-6 relative - form fields */}
            </div> {/* Close relative pl-20 pr-8 py-8 - padding */}
          </div> {/* Close flex-1 overflow-y-auto - scrollable area */}
          
          {/* Save Button - Fixed at Bottom */}
          <div className="bg-[#FFF8DC] border-t-2 border-[#8B7355]/30 px-8 py-4 flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={!content.trim() || uploading}
              className="bg-[#8B7355] text-white hover:bg-[#654321] shadow-md disabled:opacity-50 px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}