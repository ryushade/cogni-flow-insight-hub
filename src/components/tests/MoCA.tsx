
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from '@/hooks/use-toast';

const sections = [
  {
    id: "visuospatial",
    title: "Visuoespacial/Ejecutiva",
    maxPoints: 5,
    tasks: [
      { 
        id: "trail", 
        title: "Trail Making", 
        instructions: "Una cada número con su letra correspondiente en orden ascendente (1-A-2-B-...)",
        points: 1 
      },
      { 
        id: "cube", 
        title: "Dibujo del Cubo", 
        instructions: "Copie este dibujo de la manera más precisa posible",
        points: 1 
      },
      { 
        id: "clock", 
        title: "Dibujo del Reloj", 
        instructions: "Dibuje un reloj marcando las 11:10",
        subTasks: [
          { id: "clockCircle", title: "Contorno", points: 1 },
          { id: "clockNumbers", title: "Números", points: 1 },
          { id: "clockHands", title: "Manecillas", points: 1 }
        ]
      }
    ]
  },
  {
    id: "naming",
    title: "Denominación",
    maxPoints: 3,
    tasks: [
      { id: "lion", title: "León", points: 1 },
      { id: "rhino", title: "Rinoceronte", points: 1 },
      { id: "camel", title: "Camello", points: 1 }
    ]
  },
  {
    id: "memory",
    title: "Memoria",
    instructions: "Lea la lista de 5 palabras. El paciente debe repetirlas. Realice dos ensayos. No puntúe todavía.",
    maxPoints: 0,
    tasks: [
      { id: "face", title: "Cara" },
      { id: "velvet", title: "Terciopelo" },
      { id: "church", title: "Iglesia" },
      { id: "daisy", title: "Margarita" },
      { id: "red", title: "Rojo" }
    ]
  },
  {
    id: "attention",
    title: "Atención",
    maxPoints: 6,
    tasks: [
      { 
        id: "digitSpan", 
        title: "Span de Dígitos", 
        instructions: "Lea la secuencia de números. El paciente debe repetirla tal cual y luego hacia atrás.",
        subTasks: [
          { id: "forwardDigits", title: "Hacia adelante: 2-1-8-5-4", points: 1 },
          { id: "backwardDigits", title: "Hacia atrás: 7-4-2", points: 1 }
        ]
      },
      { 
        id: "vigilance", 
        title: "Vigilancia", 
        instructions: "Lea la serie de letras. El paciente debe dar un golpecito cuando escuche la letra 'A'.",
        points: 1 
      },
      { 
        id: "serial7", 
        title: "Sustracción serial de 7", 
        instructions: "El paciente debe restar 7 sucesivamente, empezando desde 100.",
        subTasks: [
          { id: "calc1", title: "93", points: 1 },
          { id: "calc2", title: "86", points: 1 },
          { id: "calc3", title: "79", points: 1 }
        ]
      }
    ]
  },
  {
    id: "language",
    title: "Lenguaje",
    maxPoints: 3,
    tasks: [
      { 
        id: "repetition", 
        title: "Repetición", 
        instructions: "El paciente debe repetir exactamente:",
        subTasks: [
          { id: "rep1", title: "Solo sé que Juan es quien puede ayudar hoy", points: 1 },
          { id: "rep2", title: "El gato se esconde siempre bajo el sofá cuando los perros están en el salón", points: 1 }
        ]
      },
      { 
        id: "fluency", 
        title: "Fluidez verbal", 
        instructions: "El paciente debe nombrar tantas palabras como pueda que empiecen con la letra 'P' en un minuto.",
        points: 1 
      }
    ]
  },
  {
    id: "abstraction",
    title: "Abstracción",
    maxPoints: 2,
    tasks: [
      { 
        id: "similarity", 
        title: "Similitud", 
        instructions: "El paciente debe explicar qué tienen en común cada par de palabras:",
        subTasks: [
          { id: "trainBicycle", title: "Tren - Bicicleta", points: 1 },
          { id: "watchRuler", title: "Reloj - Regla", points: 1 }
        ]
      }
    ]
  },
  {
    id: "delayed_recall",
    title: "Recuerdo diferido",
    maxPoints: 5,
    instructions: "El paciente debe recordar las palabras aprendidas anteriormente sin pistas.",
    tasks: [
      { id: "recallFace", title: "Cara", points: 1 },
      { id: "recallVelvet", title: "Terciopelo", points: 1 },
      { id: "recallChurch", title: "Iglesia", points: 1 },
      { id: "recallDaisy", title: "Margarita", points: 1 },
      { id: "recallRed", title: "Rojo", points: 1 }
    ]
  },
  {
    id: "orientation",
    title: "Orientación",
    maxPoints: 6,
    tasks: [
      { id: "date", title: "Fecha", points: 1 },
      { id: "month", title: "Mes", points: 1 },
      { id: "year", title: "Año", points: 1 },
      { id: "day", title: "Día de la semana", points: 1 },
      { id: "place", title: "Lugar", points: 1 },
      { id: "city", title: "Ciudad", points: 1 }
    ]
  }
];

export const MoCA = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);
  
  const totalSections = sections.length;
  const currentSection = sections[currentSectionIndex];
  const maxScore = 30;
  
  const handleScoreChange = (taskId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [taskId]: value
    }));
    
    // Actualizar progreso
    const totalTasks = sections.reduce((acc, section) => {
      const sectionTasks = section.tasks.reduce((taskAcc, task) => {
        if (task.subTasks) {
          return taskAcc + task.subTasks.length;
        }
        return taskAcc + 1;
      }, 0);
      return acc + sectionTasks;
    }, 0);
    
    const answeredTasks = Object.keys(scores).length + 1;
    setProgress(Math.round((answeredTasks / totalTasks) * 100));
  };
  
  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
      toast({
        title: "Prueba MoCA completada",
        description: `Puntuación total: ${totalScore}/${maxScore}`
      });
      // Aquí se guardaría la puntuación
      console.log("MoCA completado con puntuación:", totalScore);
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };
  
  const renderTasks = (tasks: any[]) => {
    return tasks.map((task) => (
      <div key={task.id} className="mb-6">
        <div className="mb-2">
          <h4 className="font-medium">{task.title}</h4>
          {task.instructions && (
            <p className="text-sm text-muted-foreground">{task.instructions}</p>
          )}
        </div>
        
        {task.subTasks ? (
          <div className="ml-4 space-y-4">
            {task.subTasks.map((subTask: any) => (
              <div key={subTask.id} className="flex items-center justify-between">
                <Label htmlFor={subTask.id} className="flex-1">{subTask.title}</Label>
                <RadioGroup
                  id={subTask.id}
                  className="flex"
                  defaultValue="0"
                  onValueChange={(value) => handleScoreChange(subTask.id, parseInt(value))}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="0" id={`${subTask.id}-0`} />
                    <Label htmlFor={`${subTask.id}-0`} className="text-sm">0</Label>
                  </div>
                  <div className="flex items-center space-x-1 ml-4">
                    <RadioGroupItem value="1" id={`${subTask.id}-1`} />
                    <Label htmlFor={`${subTask.id}-1`} className="text-sm">1</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {task.points !== undefined && (
              <RadioGroup
                defaultValue="0"
                className="flex"
                onValueChange={(value) => handleScoreChange(task.id, parseInt(value))}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="0" id={`${task.id}-0`} />
                  <Label htmlFor={`${task.id}-0`}>0</Label>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <RadioGroupItem value="1" id={`${task.id}-1`} />
                  <Label htmlFor={`${task.id}-1`}>1</Label>
                </div>
              </RadioGroup>
            )}
          </div>
        )}
      </div>
    ));
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Montreal Cognitive Assessment (MoCA)</CardTitle>
        <CardDescription>
          Evaluación cognitiva para detectar deterioro cognitivo leve
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium flex justify-between">
              {currentSection.title}
              {currentSection.maxPoints > 0 && (
                <span className="text-sm text-muted-foreground">
                  {currentSection.maxPoints} puntos
                </span>
              )}
            </h3>
            {currentSection.instructions && (
              <p className="text-sm text-muted-foreground mt-1">{currentSection.instructions}</p>
            )}
          </div>
          
          <div className="mt-6">
            {renderTasks(currentSection.tasks)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
        >
          Anterior
        </Button>
        <Button onClick={handleNext}>
          {currentSectionIndex === totalSections - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </CardFooter>
    </Card>
  );
};
