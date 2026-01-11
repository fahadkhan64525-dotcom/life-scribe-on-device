import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, IText, Triangle } from "fabric";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Pencil, Square, Circle as CircleIcon, Type, Triangle as TriangleIcon, 
  Trash2, Download, Palette, RotateCcw, Save
} from "lucide-react";
import { toast } from "sonner";

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
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "triangle" | "text">("select");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || !canvasRef.current) return;

    // Small delay to ensure the dialog is mounted
    const timer = setTimeout(() => {
      if (!canvasRef.current) return;
      
      const canvas = new FabricCanvas(canvasRef.current, {
        width: 300,
        height: 300,
        backgroundColor: "#ffffff",
      });

      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = 3;

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

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 3;
    }
  }, [activeTool, activeColor, fabricCanvas]);

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
    setActiveTool("select");
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
              <RotateCcw className="h-4 w-4" />
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
          </div>

          {/* Color Palette */}
          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    activeColor === color ? "ring-2 ring-primary ring-offset-2" : "border-gray-200"
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
