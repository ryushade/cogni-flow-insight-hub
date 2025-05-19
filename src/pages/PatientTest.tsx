
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Estructura base para las preguntas del MMSE para pacientes
const mmseQuestions = [
  {
    id: "orientation",
    title: "Orientación",
    questions: [
      { id: "year", text: "¿En qué año estamos?", points: 1 },
      { id: "season", text: "¿En qué estación del año estamos?", points: 1 },
      { id: "date", text: "¿Qué fecha es hoy?", points: 1 },
      { id: "day", text: "¿Qué día de la semana es hoy?", points: 1 },
      { id: "month", text: "¿En qué mes estamos?", points: 1 }
    ]
  },
  {
    id: "location",
    title: "Ubicación",
    questions: [
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
    description: "Memorice estas tres palabras: Papel, Bicicleta, Cuchara",
    questions: [
      { id: "object1", text: "¿Recuerda la primera palabra? (Papel)", points: 1 },
      { id: "object2", text: "¿Recuerda la segunda palabra? (Bicicleta)", points: 1 },
      { id: "object3", text: "¿Recuerda la tercera palabra? (Cuchara)", points: 1 }
    ]
  },
  {
    id: "attention",
    title: "Atención y Cálculo",
    description: "Reste de 7 en 7 empezando desde 100",
    questions: [
      { id: "calc1", text: "100 - 7 = ?", points: 1 },
      { id: "calc2", text: "93 - 7 = ?", points: 1 },
      { id: "calc3", text: "86 - 7 = ?", points: 1 },
      { id: "calc4", text: "79 - 7 = ?", points: 1 },
      { id: "calc5", text: "72 - 7 = ?", points: 1 }
    ]
  },
  {
    id: "recall",
    title: "Recuerdo",
    description: "¿Recuerda las tres palabras que le mencioné antes?",
    questions: [
      { id: "recall1", text: "Primera palabra (Papel)", points: 1 },
      { id: "recall2", text: "Segunda palabra (Bicicleta)", points: 1 },
      { id: "recall3", text: "Tercera palabra (Cuchara)", points: 1 }
    ]
  },
  {
    id: "language",
    title: "Lenguaje",
    questions: [
      { id: "naming1", text: "¿Qué es esto? (mostrar un lápiz)", points: 1 },
      { id: "naming2", text: "¿Qué es esto? (mostrar un reloj)", points: 1 },
      { id: "repeat", text: "Repita: 'Ni sí, ni no, ni pero'", points: 1 },
      { id: "command1", text: "Tome el papel con la mano derecha", points: 1 },
      { id: "command2", text: "Dóblelo por la mitad", points: 1 },
      { id: "command3", text: "Póngalo en el suelo", points: 1 }
    ]
  },
  {
    id: "final",
    title: "Lectura, Escritura y Dibujo",
    questions: [
      { id: "read", text: "Lea y ejecute: 'CIERRE LOS OJOS'", points: 1 },
      { id: "write", text: "Escriba una frase completa", points: 1 },
      { id: "copy", text: "Copie el dibujo de los pentágonos intersectados", points: 1 }
    ]
  }
];

const PatientTest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { testId } = useParams();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos en segundos
  const [testComplete, setTestComplete] = useState(false);
  
  const currentSection = mmseQuestions[currentSectionIndex];
  const totalSections = mmseQuestions.length;
  
  // Control del tiempo
  useEffect(() => {
    if (timeLeft <= 0 || testComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, testComplete]);
  
  const handleTimeUp = () => {
    toast({
      title: "Tiempo agotado",
      description: "Se ha terminado el tiempo para completar la prueba.",
      variant: "destructive"
    });
    finishTest();
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Actualizar progreso
    const totalQuestions = mmseQuestions.reduce((acc, section) => 
      acc + section.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length + 1;
    setProgress(Math.round((answeredQuestions / totalQuestions) * 100));
  };
  
  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo(0, 0); // Scroll al inicio al cambiar de sección
    } else {
      finishTest();
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const finishTest = () => {
    setTestComplete(true);
    
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = mmseQuestions.reduce((acc, section) => 
      acc + section.questions.reduce((sum, q) => sum + q.points, 0), 0);
    
    toast({
      title: "Prueba completada",
      description: `Su puntuación es: ${totalScore}/${maxScore}`
    });
    
    // Aquí se enviarían los resultados a la API
    console.log("Resultados de la prueba:", { answers, totalScore, maxScore });
    
    // Después de un tiempo, redirigir al usuario
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };
  
  const renderQuestions = (questions: any[]) => {
    return questions.map((question) => (
      <div key={question.id} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between mb-2">
          <Label className="text-lg font-medium">{question.text}</Label>
        </div>
        
        <RadioGroup
          defaultValue={answers[question.id]?.toString() || ""}
          className="flex flex-col space-y-2 mt-2"
          onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id={`${question.id}-correct`} />
            <Label htmlFor={`${question.id}-correct`} className="text-green-600">Correcto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id={`${question.id}-incorrect`} />
            <Label htmlFor={`${question.id}-incorrect`} className="text-red-500">Incorrecto</Label>
          </div>
        </RadioGroup>
      </div>
    ));
  };
  
  if (testComplete) {
    return (
      <Card className="max-w-3xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Prueba Completada</CardTitle>
          <CardDescription>Gracias por completar la prueba MMSE</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg mb-4">
            Sus respuestas han sido registradas correctamente.
          </p>
          <p className="text-center">
            Será redirigido a la página principal en unos segundos...
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="container py-8 px-4 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Mini-Mental State Examination (MMSE)</CardTitle>
              <CardDescription>
                Evaluación de estado cognitivo general
              </CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-primary'}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-muted-foreground">tiempo restante</p>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{currentSection.title}</CardTitle>
          {currentSection.description && (
            <CardDescription className="text-base mt-2">
              {currentSection.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {renderQuestions(currentSection.questions)}
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
            {currentSectionIndex === totalSections - 1 ? "Finalizar Prueba" : "Siguiente"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        <p>Sección {currentSectionIndex + 1} de {totalSections}</p>
      </div>
    </div>
  );
};

export default PatientTest;
