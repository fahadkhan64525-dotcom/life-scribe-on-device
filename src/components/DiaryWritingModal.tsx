import { useState } from "react";
import { X, Camera, MapPin, Save, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface DiaryWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: {
    title: string;
    content: string;
    location?: string;
    photos: string[];
    mood?: string;
    tags: string[];
  }) => void;
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

export function DiaryWritingModal({ isOpen, onClose, onSave }: DiaryWritingModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    if (!content.trim()) return;
    
    onSave({
      title: title || `Entry from ${new Date().toLocaleDateString()}`,
      content,
      location: location || undefined,
      photos,
      mood: selectedMood || undefined,
      tags,
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setLocation("");
    setSelectedMood("");
    setPhotos([]);
    setTags([]);
    setNewTag("");
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertPrompt = (prompt: string) => {
    setContent(prev => prev + (prev ? "\n\n" : "") + prompt + " ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card shadow-floating border border-journal-accent/20 backdrop-blur-sm animate-scale-in">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-warm opacity-5 rounded-lg"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-sage rounded-full opacity-10 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-hero rounded-full opacity-10 translate-y-12 -translate-x-12"></div>
        
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-serif text-foreground flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/15 rounded-xl shadow-soft">
              <Sparkles className="w-6 h-6 text-primary animate-pulse-slow" />
            </div>
            <span className="bg-gradient-to-r from-primary to-journal-accent bg-clip-text text-transparent">
              Write in Your Diary
            </span>
          </DialogTitle>
          <p className="text-sm text-journal-text-soft/80 font-light">
            Capture your thoughts, feelings, and memories in a beautiful, private space
          </p>
        </DialogHeader>

        <div className="space-y-8 relative">
          {/* Title */}
          <div className="group">
            <Label htmlFor="title" className="text-sm font-medium text-journal-text-soft mb-2 block group-hover:text-primary transition-colors duration-300">
              ✨ Entry Title (optional)
            </Label>
            <Input
              id="title"
              placeholder="Give this beautiful moment a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-journal-accent/30 focus:border-primary bg-gradient-warm shadow-soft hover:shadow-gentle transition-all duration-300 focus:shadow-glow font-serif text-lg"
            />
          </div>

          {/* Writing Prompts */}
          <div className="p-6 bg-gradient-sage rounded-xl shadow-soft border border-journal-accent/20 group hover:shadow-gentle transition-all duration-300">
            <Label className="text-sm font-medium text-journal-text-soft mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
              Need inspiration? Try one of these gentle prompts:
            </Label>
            <div className="flex flex-wrap gap-3">
              {writingPrompts.slice(0, 4).map((prompt, index) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => insertPrompt(prompt)}
                  className="text-xs border-journal-accent/40 hover:bg-journal-accent/15 text-journal-text-soft hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-soft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Sparkles className="w-3 h-3 mr-1 opacity-60" />
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="group">
            <Label htmlFor="content" className="text-sm font-medium text-journal-text-soft mb-3 block group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Pour your heart onto paper
            </Label>
            <div className="relative">
              <Textarea
                id="content"
                placeholder="What's dancing in your mind? Let your thoughts flow freely onto this digital paper..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[240px] border-journal-accent/30 focus:border-primary bg-gradient-paper shadow-soft hover:shadow-gentle focus:shadow-glow transition-all duration-300 resize-none text-base leading-relaxed font-serif placeholder:text-journal-text-soft/60 placeholder:font-light"
              />
              <div className="absolute bottom-4 right-4 text-xs text-journal-text-soft/50 font-light">
                {content.length} characters
              </div>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="p-5 bg-gradient-warm rounded-xl shadow-soft border border-journal-accent/15">
            <Label className="text-sm font-medium text-journal-text-soft mb-4 block flex items-center gap-2">
              <div className="w-2 h-2 bg-journal-accent rounded-full animate-pulse-slow"></div>
              How is your heart feeling right now?
            </Label>
            <div className="flex flex-wrap gap-3">
              {moodOptions.map((mood, index) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                  className={selectedMood === mood 
                    ? "bg-primary text-primary-foreground shadow-glow animate-scale-in" 
                    : "border-journal-accent/40 hover:bg-journal-accent/15 text-journal-text-soft hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-soft"
                  }
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="group">
            <Label htmlFor="location" className="text-sm font-medium text-journal-text-soft mb-2 block group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Where is this moment unfolding? (optional)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-journal-accent w-4 h-4 group-hover:text-primary transition-colors duration-300" />
              <Input
                id="location"
                placeholder="The cozy corner where your story begins..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 border-journal-accent/30 focus:border-primary bg-gradient-warm shadow-soft hover:shadow-gentle focus:shadow-glow transition-all duration-300"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="p-5 bg-gradient-sage rounded-xl shadow-soft border border-journal-accent/15">
            <Label className="text-sm font-medium text-journal-text-soft mb-3 block flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-journal-accent rounded-full"></div>
              Add magical tags to organize your memories
            </Label>
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="memories, gratitude, adventure..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 border-journal-accent/30 focus:border-primary bg-gradient-warm shadow-soft hover:shadow-gentle focus:shadow-glow transition-all duration-300"
              />
              <Button 
                variant="outline" 
                onClick={addTag}
                className="border-journal-accent/40 hover:bg-journal-accent/15 hover:border-primary transition-all duration-300 hover:scale-105 shadow-soft"
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
                    className="bg-journal-accent/15 text-journal-text-soft border-journal-accent/25 cursor-pointer hover:bg-journal-accent/25 transition-all duration-200 hover:scale-105 px-3 py-1.5 shadow-soft"
                    onClick={() => removeTag(tag)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    #{tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Photos */}
          <div className="group">
            <Label className="text-sm font-medium text-journal-text-soft mb-3 block group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Capture the visual essence of this moment
            </Label>
            <Button
              variant="outline"
              className="w-full border-dashed border-journal-accent/40 hover:bg-journal-accent/10 py-12 transition-all duration-300 hover:border-primary hover:shadow-soft group hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-journal-accent/10 rounded-full group-hover:bg-primary/15 transition-colors duration-300">
                  <Camera className="w-6 h-6 text-journal-accent group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-journal-text-soft group-hover:text-primary transition-colors duration-300">
                    Add photos to your beautiful entry
                  </div>
                  <div className="text-xs text-journal-text-soft/60 mt-1">
                    Let images tell part of your story
                  </div>
                </div>
              </div>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-journal-accent/20 relative">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-journal-accent/40 hover:bg-journal-accent/10 hover:border-journal-accent transition-all duration-300 hover:scale-105 shadow-soft py-3"
            >
              Maybe later
            </Button>
            <Button
              onClick={handleSave}
              disabled={!content.trim()}
              className="flex-1 bg-gradient-to-r from-primary to-journal-accent hover:from-primary/90 hover:to-journal-accent/90 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 py-3 font-medium"
            >
              <Save className="w-5 h-5 mr-2" />
              Preserve this moment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}