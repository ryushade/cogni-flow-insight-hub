import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface SubTask {
  id: string;
  title: string;
  points: number;
}

interface Task {
  id: string;
  title: string;
  instructions?: string;
  points?: number;
  subTasks?: SubTask[];
}

export const MoCA = () => {
  const { toast } = useToast();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const tasks: Task[] = [
    {
      id: "visuospatial",
      title: "Habilidades visuoespaciales/ejecutivas",
      subTasks: [
        { id: "trail", title: "Sendero", points: 1 },
        { id: "cube", title: "Copia del cubo", points: 1 },
        { id: "clock", title: "Dibujo del reloj", points: 3 }
      ]
    },
    {
      id: "naming",
      title: "Denominación",
      instructions: "Nombre los siguientes animales",
      points: 3
    },
    {
      id: "attention",
      title: "Atención",
      subTasks: [
        { id: "digitsForward", title: "Dígitos directos", points: 2 },
        { id: "digitsBackward", title: "Dígitos inversos", points: 1 },
        { id: "vigilance", title: "Vigilancia", points: 1 },
        { id: "serial7", title: "Serie 7", points: 3 }
      ]
    },
    {
      id: "language",
      title: "Lenguaje",
      subTasks: [
        { id: "repetition", title: "Repetición", points: 2 },
        { id: "fluency", title: "Fluidez", instructions: "Nombra el mayor número de palabras que empiecen con la letra F", points: 1 }
      ]
    },
    {
      id: "abstraction",
      title: "Abstracción",
      instructions: "¿En qué se parecen un tren y una bicicleta?",
      points: 2
    },
    {
      id: "delayedRecall",
      title: "Recuerdo diferido",
      instructions: "Recuerde las palabras que le dije antes",
      points: 5
    },
    {
      id: "orientation",
      title: "Orientación",
      subTasks: [
        { id: "date", title: "Fecha", points: 1 },
        { id: "month", title: "Mes", points: 1 },
        { id: "year", title: "Año", points: 1 },
        { id: "day", title: "Día", points: 1 },
        { id: "place", title: "Lugar", points: 1 },
        { id: "city", title: "Ciudad", points: 1 }
      ]
    }
  ];

  const currentTask = tasks[currentTaskIndex];

  const handleResponse = (taskId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [taskId]: value
    }));
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const totalScore = calculateTotalScore();
    setIsCompleted(true);
    
    toast({
      title: "MoCA completado",
      description: `Puntuación total: ${totalScore}/30`
    });
  };

  const calculateTotalScore = () => {
    let total = 0;
    for (const taskId in responses) {
      const task = tasks.find(t => t.id === taskId);
      if (task && task.points) {
        total += parseInt(responses[taskId] || 0, 10);
      } else if (task && task.subTasks) {
        task.subTasks.forEach(subTask => {
          if (responses[subTask.id]) {
            total += subTask.points;
          }
        });
      }
    }
    return total;
  };

  const renderTaskContent = (task: Task) => {
    if ('subTasks' in task && task.subTasks && Array.isArray(task.subTasks)) {
      return (
        <div className="space-y-4">
          {task.subTasks.map((subTask) => (
            <div key={subTask.id} className="flex items-center justify-between">
              <Label className="flex-1">{subTask.title}</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={responses[subTask.id] || false}
                  onCheckedChange={(checked) => handleResponse(subTask.id, checked)}
                />
                <span className="text-sm text-muted-foreground">
                  ({subTask.points} punto{subTask.points !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (task.id === "orientation") {
      return (
        <div className="space-y-4">
          {task.subTasks?.map((subTask) => (
            <div key={subTask.id} className="grid gap-2">
              <Label htmlFor={subTask.id}>{subTask.title}</Label>
              <Input
                id={subTask.id}
                value={responses[subTask.id] || ''}
                onChange={(e) => handleResponse(subTask.id, e.target.value)}
                placeholder={`Ingrese ${subTask.title.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <Label htmlFor={task.id}>{task.instructions}</Label>
        <Input
          id={task.id}
          value={responses[task.id] || ''}
          onChange={(e) => handleResponse(task.id, e.target.value)}
          placeholder="Ingrese su respuesta"
        />
      </div>
    );
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>MoCA Completado</CardTitle>
          <CardDescription>
            La evaluación ha sido completada exitosamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-2xl font-bold">
              Puntuación: {calculateTotalScore()}/30
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Montreal Cognitive Assessment (MoCA)</CardTitle>
        <CardDescription>
          Tarea {currentTaskIndex + 1} de {tasks.length}: {currentTask.title}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {renderTaskContent(currentTask)}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentTaskIndex === 0}
        >
          Anterior
        </Button>
        
        <Button onClick={handleNext}>
          {currentTaskIndex === tasks.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </CardFooter>
    </Card>
  );
};
