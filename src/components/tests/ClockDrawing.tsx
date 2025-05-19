
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';

export const ClockDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [instructions, setInstructions] = useState(
    "Dibuje un reloj con todos sus números y coloque las manecillas indicando las 11:10"
  );
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#1E88E5';
        setContext(ctx);
        
        // Configurar tamaño del canvas para que sea responsive
        const resizeCanvas = () => {
          const container = canvas.parentElement;
          if (container) {
            const width = container.clientWidth;
            canvas.width = width;
            canvas.height = width; // Mantiene proporción cuadrada
            
            // Volver a configurar el contexto después de cambiar dimensiones
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#1E88E5';
          }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        return () => window.removeEventListener('resize', resizeCanvas);
      }
    }
  }, [canvasRef]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (context) {
      context.beginPath();
      
      // Manejar tanto eventos de ratón como de táctil
      const coordinates = getCoordinates(e);
      if (coordinates) {
        context.moveTo(coordinates.x, coordinates.y);
      }
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    // Prevenir scroll en dispositivos táctiles
    e.preventDefault();
    
    const coordinates = getCoordinates(e);
    if (coordinates) {
      context.lineTo(coordinates.x, coordinates.y);
      context.stroke();
    }
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    if (context) {
      context.closePath();
    }
  };
  
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      let x, y;
      
      if ('touches' in e) {
        // Evento táctil
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        // Evento de ratón
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      
      return { x, y };
    }
    return null;
  };
  
  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  
  const handleNext = () => {
    if (step === 1) {
      toast({
        title: "Círculo completado",
        description: "Ahora coloque los números del reloj."
      });
      setInstructions("Coloque los números del 1 al 12 en el reloj");
      setStep(2);
    } else if (step === 2) {
      toast({
        title: "Números completados",
        description: "Ahora dibuje las manecillas indicando las 11:10"
      });
      setInstructions("Dibuje las manecillas del reloj indicando las 11:10");
      setStep(3);
    } else {
      toast({
        title: "¡Prueba completada!",
        description: "Gracias por completar la prueba del reloj"
      });
      // Aquí se guardaría la imagen y se evaluaría
      // Por ejemplo: saveClockDrawing(canvasRef.current.toDataURL());
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Prueba del Dibujo del Reloj</CardTitle>
        <CardDescription>
          {instructions}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="canvas-container bg-slate-50 rounded-md border border-slate-200 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="touch-none w-full"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearCanvas}>
          Borrar
        </Button>
        <Button onClick={handleNext}>
          {step === 3 ? "Finalizar" : "Siguiente"}
        </Button>
      </CardFooter>
    </Card>
  );
};
