import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, Circle, Rect, IText, Triangle, PencilBrush, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Pencil, Square, Circle as CircleIcon, Type, Triangle as TriangleIcon, 
  Trash2, Download, Palette, RotateCcw, Save, Eraser, Undo2, Redo2, MousePointer,
  Sparkles, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LogoCreatorProps {
  onSave?: (logoDataUrl: string) => void;
  trigger?: React.ReactNode;
}

const COLORS = [
  "#000000", "#FFFFFF", "#FF6B6B", "#4ECDC4", "#45B7D1", 
  "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  "#BB8FCE", "#85C1E9", "#F8B500", "#E74C3C", "#3498DB"
];

export const LogoCreator = ({ onSave, trigger }: LogoCreatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "eraser" | "rectangle" | "circle" | "triangle" | "text">("select");
  const [brushSize, setBrushSize] = useState(3);
  const [open, setOpen] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const isUndoRedoAction = useRef(false);

  const saveState = useCallback((canvas: FabricCanvas) => {
    if (isUndoRedoAction.current) return;
    const json = JSON.stringify(canvas.toJSON());
    setUndoStack(prev => [...prev, json]);
    setRedoStack([]);
  }, []);

  useEffect(() => {
    if (!open || !canvasRef.current) return;

    const timer = setTimeout(() => {
      if (!canvasRef.current) return;
      
      const canvas = new FabricCanvas(canvasRef.current, {
        width: 300,
        height: 300,
        backgroundColor: "#ffffff",
      });

      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;

      // Save initial state
      const initialJson = JSON.stringify(canvas.toJSON());
      setUndoStack([initialJson]);
      setRedoStack([]);

      // Listen for object modifications
      canvas.on("object:added", () => saveState(canvas));
      canvas.on("object:modified", () => saveState(canvas));
      canvas.on("object:removed", () => saveState(canvas));

      setFabricCanvas(canvas);

      return () => {
        canvas.dispose();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (fabricCanvas) {
        fabricCanvas.dispose();
        setFabricCanvas(null);
      }
    };
  }, [open]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const isDrawMode = activeTool === "draw" || activeTool === "eraser";
    fabricCanvas.isDrawingMode = isDrawMode;
    
    if (isDrawMode && fabricCanvas.freeDrawingBrush) {
      if (activeTool === "eraser") {
        fabricCanvas.freeDrawingBrush.color = "#ffffff";
      } else {
        fabricCanvas.freeDrawingBrush.color = activeColor;
      }
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, fabricCanvas, brushSize]);

  const handleUndo = () => {
    if (!fabricCanvas || undoStack.length <= 1) return;
    isUndoRedoAction.current = true;
    
    const newUndoStack = [...undoStack];
    const current = newUndoStack.pop()!;
    const previous = newUndoStack[newUndoStack.length - 1];
    
    setRedoStack(prev => [...prev, current]);
    setUndoStack(newUndoStack);
    
    fabricCanvas.loadFromJSON(JSON.parse(previous)).then(() => {
      fabricCanvas.renderAll();
      isUndoRedoAction.current = false;
    });
  };

  const handleRedo = () => {
    if (!fabricCanvas || redoStack.length === 0) return;
    isUndoRedoAction.current = true;
    
    const newRedoStack = [...redoStack];
    const next = newRedoStack.pop()!;
    
    setUndoStack(prev => [...prev, next]);
    setRedoStack(newRedoStack);
    
    fabricCanvas.loadFromJSON(JSON.parse(next)).then(() => {
      fabricCanvas.renderAll();
      isUndoRedoAction.current = false;
    });
  };

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    const center = 150;

    if (tool === "rectangle") {
      const rect = new Rect({
        left: center - 40,
        top: center - 40,
        fill: activeColor,
        width: 80,
        height: 80,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: center - 40,
        top: center - 40,
        fill: activeColor,
        radius: 40,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (tool === "triangle") {
      const triangle = new Triangle({
        left: center - 40,
        top: center - 40,
        fill: activeColor,
        width: 80,
        height: 80,
      });
      fabricCanvas.add(triangle);
      fabricCanvas.setActiveObject(triangle);
    } else if (tool === "text") {
      const text = new IText("Logo", {
        left: center - 30,
        top: center - 15,
        fill: activeColor,
        fontSize: 32,
        fontFamily: "Arial",
        fontWeight: "bold",
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    }
    
    fabricCanvas.renderAll();
    if (["rectangle", "circle", "triangle", "text"].includes(tool)) {
      setActiveTool("select");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("Canvas cleared!");
  };

  const handleDelete = () => {
    if (!fabricCanvas) return;
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      fabricCanvas.remove(activeObject);
      fabricCanvas.renderAll();
    }
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    const dataUrl = fabricCanvas.toDataURL({
      format: "png",
      multiplier: 2,
    });
    const link = document.createElement("a");
    link.download = "my-logo.png";
    link.href = dataUrl;
    link.click();
    toast.success("Logo downloaded!");
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    const dataUrl = fabricCanvas.toDataURL({
      format: "png",
      multiplier: 2,
    });
    onSave?.(dataUrl);
    toast.success("Logo saved!");
    setOpen(false);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", color);
      fabricCanvas.renderAll();
    }
  };

  const handleAiGenerate = async () => {
    if (!fabricCanvas || !aiPrompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-logo", {
        body: { prompt: aiPrompt.trim() },
      });

      if (error) throw error;

      if (data?.image) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const fabricImg = new FabricImage(img, {
            left: 0,
            top: 0,
            scaleX: 300 / img.width,
            scaleY: 300 / img.height,
          });
          fabricCanvas.clear();
          fabricCanvas.backgroundColor = "#ffffff";
          fabricCanvas.add(fabricImg);
          fabricCanvas.renderAll();
          toast.success("Logo generated!");
        };
        img.onerror = () => toast.error("Failed to load generated image");
        img.src = data.image;
      } else {
        toast.error(data?.error || "Could not generate logo. Try a different prompt.");
      }
    } catch (err: any) {
      console.error("AI generation error:", err);
      toast.error("Failed to generate logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Palette className="h-4 w-4" />
            Create Logo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Create Your Logo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tools */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={activeTool === "select" ? "default" : "outline"}
              onClick={() => setActiveTool("select")}
              title="Select"
            >
              <MousePointer className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={activeTool === "draw" ? "default" : "outline"}
              onClick={() => setActiveTool("draw")}
              title="Draw"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={activeTool === "eraser" ? "default" : "outline"}
              onClick={() => setActiveTool("eraser")}
              title="Eraser"
            >
              <Eraser className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleToolClick("rectangle")}
              title="Rectangle"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleToolClick("circle")}
              title="Circle"
            >
              <CircleIcon className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleToolClick("triangle")}
              title="Triangle"
            >
              <TriangleIcon className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleToolClick("text")}
              title="Text"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              title="Delete Selected"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="border-l border-border mx-1" />
            <Button
              size="sm"
              variant="outline"
              onClick={handleUndo}
              disabled={undoStack.length <= 1}
              title="Undo"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              title="Redo"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Brush Size Slider */}
          {(activeTool === "draw" || activeTool === "eraser") && (
            <div className="space-y-2">
              <Label className="text-xs">Brush Size: {brushSize}px</Label>
              <Slider
                value={[brushSize]}
                onValueChange={(val) => setBrushSize(val[0])}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Color Palette */}
          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    activeColor === color ? "ring-2 ring-primary ring-offset-2" : "border-muted"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg overflow-hidden">
              <canvas ref={canvasRef} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-between">
            <Button variant="outline" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Use as Logo
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};