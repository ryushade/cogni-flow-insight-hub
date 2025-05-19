
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from '@/hooks/use-toast';

const sections = [
  {
    id: "orientation",
    title: "Orientación",
    questions: [
      { id: "year", text: "¿En qué año estamos?", points: 1 },
      { id: "season", text: "¿En qué estación del año estamos?", points: 1 },
      { id: "date", text: "¿Qué fecha es hoy?", points: 1 },
      { id: "day", text: "¿Qué día de la semana es hoy?", points: 1 },
      { id: "month", text: "¿En qué mes estamos?", points: 1 },
      { id: "country", text: "¿En qué país estamos?", points: 1 },
      { id: "city", text: "¿En qué ciudad estamos?", points: 1 },
      { id: "place", text: "¿Dónde estamos ahora?", points: 1 },
      { id: "floor", text: "¿En qué piso estamos?", points: 1 },
      { id: "district", text: "¿En qué distrito/colonia estamos?", points: 1 }
    ]
  },
  {
    id: "registration",
    title: "Registro",
    description: "Nombre tres objetos con un segundo de intervalo. Luego pida al paciente que los repita.",
    questions: [
      { id: "object1", text: "Objeto 1: 'Papel'", points: 1 },
      { id: "object2", text: "Objeto 2: 'Bicicleta'", points: 1 },
      { id: "object3", text: "Objeto 3: 'Cuchara'", points: 1 }
    ]
  },
  {
    id: "attention",
    title: "Atención y Cálculo",
    description: "Pida al paciente que reste de 7 en 7 empezando desde 100.",
    questions: [
      { id: "calc1", text: "93", points: 1 },
      { id: "calc2", text: "86", points: 1 },
      { id: "calc3", text: "79", points: 1 },
      { id: "calc4", text: "72", points: 1 },
      { id: "calc5", text: "65", points: 1 }
    ]
  },
  {
    id: "recall",
    title: "Recuerdo",
    description: "Pida al paciente que recuerde los tres objetos mencionados anteriormente.",
    questions: [
      { id: "recall1", text: "Papel", points: 1 },
      { id: "recall2", text: "Bicicleta", points: 1 },
      { id: "recall3", text: "Cuchara", points: 1 }
    ]
  },
  {
    id: "language",
    title: "Lenguaje",
    questions: [
      { 
        id: "naming", 
        text: "Mostrar un lápiz y un reloj y pedir al paciente que los nombre", 
        subQuestions: [
          { id: "pencil", text: "Lápiz", points: 1 },
          { id: "watch", text: "Reloj", points: 1 }
        ],
        points: 2 
      },
      { id: "repeat", text: "Pedir al paciente que repita 'Ni sí, ni no, ni pero'", points: 1 },
      { id: "commands", text: "Solicitar que siga una secuencia de 3 comandos: 'Tome el papel con la mano derecha, dóblelo por la mitad y póngalo en el suelo'", 
        subQuestions: [
          { id: "command1", text: "Tomar papel con mano derecha", points: 1 },
          { id: "command2", text: "Doblar por la mitad", points: 1 },
          { id: "command3", text: "Poner en el suelo", points: 1 }
        ],
        points: 3 
      },
      { id: "read", text: "Pedir al paciente que lea y ejecute: 'CIERRE LOS OJOS'", points: 1 },
      { id: "write", text: "Pedir al paciente que escriba una frase", points: 1 },
      { id: "copy", text: "Pedir al paciente que copie un dibujo de pentágonos intersectados", points: 1 }
    ]
  }
];

export const MMSE = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);
  const maxScore = 30;
  
  const totalSections = sections.length;
  const currentSection = sections[currentSectionIndex];
  
  const handleScoreChange = (questionId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Actualizar progreso
    const totalQuestions = sections.reduce((acc, section) => 
      acc + section.questions.length, 0);
    const answeredQuestions = Object.keys(scores).length + 1;
    setProgress(Math.round((answeredQuestions / totalQuestions) * 100));
  };
  
  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
      toast({
        title: "Prueba MMSE completada",
        description: `Puntuación total: ${totalScore}/${maxScore}`
      });
      // Aquí se guardaría la puntuación
      console.log("MMSE completado con puntuación:", totalScore);
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };
  
  const renderQuestions = (questions: any[]) => {
    return questions.map((question) => (
      <div key={question.id} className="mb-4 space-y-2">
        <div className="flex justify-between">
          <Label>{question.text}</Label>
          <span className="text-sm text-muted-foreground">{question.points} punto{question.points > 1 ? 's' : ''}</span>
        </div>
        
        {question.subQuestions ? (
          <div className="ml-4 space-y-2">
            {question.subQuestions.map((subQ: any) => (
              <div key={subQ.id} className="flex items-center justify-between">
                <Label htmlFor={subQ.id} className="text-sm">{subQ.text}</Label>
                <RadioGroup
                  id={subQ.id}
                  className="flex"
                  defaultValue="0"
                  onValueChange={(value) => handleScoreChange(subQ.id, parseInt(value))}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="0" id={`${subQ.id}-0`} />
                    <Label htmlFor={`${subQ.id}-0`} className="text-sm">0</Label>
                  </div>
                  <div className="flex items-center space-x-1 ml-4">
                    <RadioGroupItem value="1" id={`${subQ.id}-1`} />
                    <Label htmlFor={`${subQ.id}-1`} className="text-sm">1</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        ) : (
          <RadioGroup
            defaultValue="0"
            className="flex"
            onValueChange={(value) => handleScoreChange(question.id, parseInt(value))}
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="0" id={`${question.id}-0`} />
              <Label htmlFor={`${question.id}-0`}>0</Label>
            </div>
            <div className="flex items-center space-x-1 ml-4">
              <RadioGroupItem value="1" id={`${question.id}-1`} />
              <Label htmlFor={`${question.id}-1`}>1</Label>
            </div>
          </RadioGroup>
        )}
      </div>
    ));
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Mini-Mental State Examination (MMSE)</CardTitle>
        <CardDescription>
          Evaluación del estado cognitivo general
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{currentSection.title}</h3>
            {currentSection.description && (
              <p className="text-sm text-muted-foreground mt-1">{currentSection.description}</p>
            )}
          </div>
          
          <div className="mt-6">
            {renderQuestions(currentSection.questions)}
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
