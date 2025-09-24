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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-journal-accent/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Write in Your Diary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-journal-text-soft">
              Title (optional)
            </Label>
            <Input
              id="title"
              placeholder="Give this entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 border-journal-accent/30 focus:border-primary bg-journal-warm"
            />
          </div>

          {/* Writing Prompts */}
          <div>
            <Label className="text-sm font-medium text-journal-text-soft mb-2 block">
              Need inspiration? Try one of these prompts:
            </Label>
            <div className="flex flex-wrap gap-2">
              {writingPrompts.slice(0, 4).map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => insertPrompt(prompt)}
                  className="text-xs border-journal-accent/30 hover:bg-journal-accent/10 text-journal-text-soft"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div>
            <Label htmlFor="content" className="text-sm font-medium text-journal-text-soft">
              Your thoughts
            </Label>
            <Textarea
              id="content"
              placeholder="What's on your mind? Start writing your thoughts, feelings, or experiences..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 min-h-[200px] border-journal-accent/30 focus:border-primary bg-journal-warm resize-none"
            />
          </div>

          {/* Mood Selection */}
          <div>
            <Label className="text-sm font-medium text-journal-text-soft mb-2 block">
              How are you feeling?
            </Label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                  className={selectedMood === mood 
                    ? "bg-primary text-primary-foreground" 
                    : "border-journal-accent/30 hover:bg-journal-accent/10 text-journal-text-soft"
                  }
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-journal-text-soft">
              Location (optional)
            </Label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="location"
                placeholder="Where are you writing from?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 border-journal-accent/30 focus:border-primary bg-journal-warm"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium text-journal-text-soft mb-2 block">
              Tags
            </Label>
            <div className="flex gap-2 mb-2">
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
                className="flex-1 border-journal-accent/30 focus:border-primary bg-journal-warm"
              />
              <Button 
                variant="outline" 
                onClick={addTag}
                className="border-journal-accent/30 hover:bg-journal-accent/10"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-journal-accent/10 text-journal-text-soft border-journal-accent/20 cursor-pointer hover:bg-journal-accent/20"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Photos */}
          <div>
            <Label className="text-sm font-medium text-journal-text-soft mb-2 block">
              Photos
            </Label>
            <Button
              variant="outline"
              className="w-full border-dashed border-journal-accent/30 hover:bg-journal-accent/10 py-8"
            >
              <Camera className="w-5 h-5 mr-2 text-journal-accent" />
              <span className="text-journal-text-soft">Add photos to your entry</span>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-journal-accent/20">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-journal-accent/30 hover:bg-journal-accent/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!content.trim()}
              className="flex-1 bg-primary hover:bg-primary/90 shadow-soft"
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