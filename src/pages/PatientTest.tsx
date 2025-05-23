
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

// Estructura de las preguntas del MMSE para pacientes
const mmseQuestions = [
  {
    id: "orientation",
    title: "Orientación Temporal",
    questions: [
      { 
        id: "year", 
        text: "¿En qué año estamos?", 
        points: 1,
        type: "text",
        expectedAnswer: new Date().getFullYear().toString(),
        placeholder: "Ejemplo: 2025"
      },
      { 
        id: "season", 
        text: "¿En qué estación del año estamos?", 
        points: 1,
        type: "radio",
        options: ["Primavera", "Verano", "Otoño", "Invierno"]
      },
      { 
        id: "date", 
        text: "¿Qué fecha es hoy?", 
        points: 1,
        type: "text",
        placeholder: "Ejemplo: 23 de mayo"
      },
      { 
        id: "day", 
        text: "¿Qué día de la semana es hoy?", 
        points: 1,
        type: "radio",
        options: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
      },
      { 
        id: "month", 
        text: "¿En qué mes estamos?", 
        points: 1,
        type: "radio",
        options: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
      }
    ]
  },
  {
    id: "location",
    title: "Orientación Espacial",
    questions: [
      { 
        id: "country", 
        text: "¿En qué país estamos?", 
        points: 1,
        type: "text",
        placeholder: "Escriba el nombre del país"
      },
      { 
        id: "city", 
        text: "¿En qué ciudad estamos?", 
        points: 1,
        type: "text",
        placeholder: "Escriba el nombre de la ciudad"
      },
      { 
        id: "place", 
        text: "¿Dónde estamos ahora? (edificio, institución)", 
        points: 1,
        type: "text",
        placeholder: "Ejemplo: hospital, clínica, casa"
      },
      { 
        id: "floor", 
        text: "¿En qué piso estamos?", 
        points: 1,
        type: "number",
        placeholder: "Ejemplo: 1, 2, 3..."
      },
      { 
        id: "district", 
        text: "¿En qué distrito/colonia estamos?", 
        points: 1,
        type: "text",
        placeholder: "Escriba el nombre del distrito o colonia"
      }
    ]
  },
  {
    id: "registration",
    title: "Registro",
    description: "Memorice estas tres palabras: PAPEL, BICICLETA, CUCHARA",
    instructions: "Lea atentamente las palabras y después escríbalas en los campos.",
    questions: [
      { 
        id: "object1", 
        text: "Primera palabra", 
        points: 1,
        type: "text",
        expectedAnswer: "PAPEL",
        placeholder: "Escriba la primera palabra"
      },
      { 
        id: "object2", 
        text: "Segunda palabra", 
        points: 1,
        type: "text",
        expectedAnswer: "BICICLETA",
        placeholder: "Escriba la segunda palabra"
      },
      { 
        id: "object3", 
        text: "Tercera palabra", 
        points: 1,
        type: "text",
        expectedAnswer: "CUCHARA",
        placeholder: "Escriba la tercera palabra"
      }
    ]
  },
  {
    id: "attention",
    title: "Atención y Cálculo",
    description: "Reste de 7 en 7 empezando desde 100",
    instructions: "Escriba el resultado de cada resta.",
    questions: [
      { 
        id: "calc1", 
        text: "100 - 7 = ?", 
        points: 1,
        type: "number",
        expectedAnswer: "93",
        placeholder: "Escriba el número"
      },
      { 
        id: "calc2", 
        text: "93 - 7 = ?", 
        points: 1,
        type: "number",
        expectedAnswer: "86",
        placeholder: "Escriba el número"
      },
      { 
        id: "calc3", 
        text: "86 - 7 = ?", 
        points: 1,
        type: "number",
        expectedAnswer: "79",
        placeholder: "Escriba el número"
      },
      { 
        id: "calc4", 
        text: "79 - 7 = ?", 
        points: 1,
        type: "number",
        expectedAnswer: "72",
        placeholder: "Escriba el número"
      },
      { 
        id: "calc5", 
        text: "72 - 7 = ?", 
        points: 1,
        type: "number",
        expectedAnswer: "65",
        placeholder: "Escriba el número"
      }
    ]
  },
  {
    id: "recall",
    title: "Recuerdo",
    description: "¿Recuerda las tres palabras que le mencioné antes?",
    instructions: "Escriba las tres palabras que memorizó anteriormente.",
    questions: [
      { 
        id: "recall1", 
        text: "Primera palabra", 
        points: 1,
        type: "text",
        expectedAnswer: "PAPEL",
        placeholder: "Escriba la primera palabra"
      },
      { 
        id: "recall2", 
        text: "Segunda palabra", 
        points: 1,
        type: "text",
        expectedAnswer: "BICICLETA",
        placeholder: "Escriba la segunda palabra"
      },
      { 
        id: "recall3", 
        text: "Tercera palabra", 
        points: 1,
        type: "text",
        expectedAnswer: "CUCHARA",
        placeholder: "Escriba la tercera palabra"
      }
    ]
  },
  {
    id: "language",
    title: "Lenguaje",
    questions: [
      { 
        id: "naming1", 
        text: "¿Qué es esto? (se muestra un lápiz)", 
        points: 1,
        type: "text",
        expectedAnswer: "LAPIZ",
        image: "/placeholder.svg",
        placeholder: "Escriba el nombre del objeto"
      },
      { 
        id: "naming2", 
        text: "¿Qué es esto? (se muestra un reloj)", 
        points: 1,
        type: "text",
        expectedAnswer: "RELOJ",
        image: "/placeholder.svg",
        placeholder: "Escriba el nombre del objeto"
      },
      { 
        id: "repeat", 
        text: "Repita exactamente esta frase: 'Ni sí, ni no, ni pero'", 
        points: 1,
        type: "text",
        expectedAnswer: "NI SI, NI NO, NI PERO",
        placeholder: "Escriba la frase exactamente igual"
      },
      { 
        id: "command", 
        text: "Siga estas instrucciones: Tome el papel con la mano derecha, dóblelo por la mitad y póngalo en el suelo", 
        points: 3,
        type: "checkbox",
        instructions: "Marque cada acción que ha realizado:",
        options: [
          "He tomado el papel con la mano derecha",
          "He doblado el papel por la mitad",
          "He puesto el papel en el suelo"
        ]
      }
    ]
  },
  {
    id: "final",
    title: "Lectura, Escritura y Dibujo",
    questions: [
      { 
        id: "read", 
        text: "Lea y ejecute lo siguiente:", 
        instruction: "CIERRE LOS OJOS",
        points: 1,
        type: "checkbox",
        options: ["He cerrado los ojos"]
      },
      { 
        id: "write", 
        text: "Escriba una frase completa (debe tener sujeto y verbo)", 
        points: 1,
        type: "textarea",
        placeholder: "Escriba aquí su frase..."
      },
      { 
        id: "copy", 
        text: "Copie este dibujo de los pentágonos intersectados", 
        points: 1,
        type: "drawing",
        image: "/placeholder.svg",
        instructions: "Utilice el área de dibujo para copiar la figura"
      }
    ]
  }
];

const PatientTest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { testId } = useParams();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos en segundos
  const [testComplete, setTestComplete] = useState(false);
  const [patientName, setPatientName] = useState("María García");
  const [patientId, setPatientId] = useState("P001");
  
  const currentSection = mmseQuestions[currentSectionIndex];
  const totalSections = mmseQuestions.length;
  
  useEffect(() => {
    // Check if user is authenticated as patient
    const userType = localStorage.getItem("userType");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn || userType !== "patient") {
      navigate("/login");
      return;
    }
    
    // Get patient ID from localStorage (would come from login)
    const storedPatientId = localStorage.getItem("patientId");
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }
  }, [navigate]);
  
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
  
  const handleAnswerChange = (questionId: string, value: any) => {
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
  
  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("patientId");
    
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión correctamente",
    });
    
    navigate("/login");
  };
  
  const finishTest = () => {
    setTestComplete(true);
    
    // Calcular puntuación según las respuestas
    let totalScore = 0;
    let maxScore = 0;
    
    mmseQuestions.forEach(section => {
      section.questions.forEach(question => {
        maxScore += question.points;
        
        if (answers[question.id]) {
          // Verificar respuestas según el tipo de pregunta
          if (question.type === 'text' && question.expectedAnswer) {
            const userAnswer = String(answers[question.id]).trim().toUpperCase();
            const expectedAnswer = question.expectedAnswer.toUpperCase();
            if (userAnswer === expectedAnswer) {
              totalScore += question.points;
            }
          } else if (question.type === 'number' && question.expectedAnswer) {
            if (String(answers[question.id]) === question.expectedAnswer) {
              totalScore += question.points;
            }
          } else if (question.type === 'checkbox') {
            // Para checkboxes, asignar puntos proporcionales según las opciones marcadas
            const selected = Array.isArray(answers[question.id]) ? answers[question.id].length : 0;
            const total = question.options ? question.options.length : 1;
            const points = (selected / total) * question.points;
            totalScore += Math.round(points);
          } else if (question.type === 'textarea' || question.type === 'drawing') {
            // Para texto libre o dibujo, asignamos el punto si hay contenido
            if (answers[question.id] && answers[question.id].length > 0) {
              totalScore += question.points;
            }
          } else if (question.type === 'radio') {
            // Para respuestas de opción múltiple simplemente asignamos el punto
            // En un sistema real, se verificaría la exactitud según el día actual
            totalScore += question.points;
          }
        }
      });
    });
    
    toast({
      title: "Prueba completada",
      description: `Su puntuación es: ${totalScore}/${maxScore}`
    });
    
    // Aquí se enviarían los resultados a la API
    console.log("Resultados de la prueba:", { answers, totalScore, maxScore });
    
    // Después de un tiempo, redirigir al usuario a sus informes
    setTimeout(() => {
      navigate(`/paciente/informes/${patientId}`);
    }, 5000);
  };
  
  const renderQuestionInput = (question: any) => {
    switch (question.type) {
      case 'text':
        return (
          <Input 
            type="text" 
            id={question.id}
            placeholder={question.placeholder}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="mt-2"
          />
        );
        
      case 'number':
        return (
          <Input 
            type="number" 
            id={question.id}
            placeholder={question.placeholder}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="mt-2"
          />
        );
        
      case 'textarea':
        return (
          <Textarea 
            id={question.id}
            placeholder={question.placeholder}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="mt-2"
          />
        );
        
      case 'checkbox':
        return (
          <div className="space-y-2 mt-2">
            {question.options?.map((option: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id={`${question.id}-${idx}`}
                  checked={Array.isArray(answers[question.id]) && answers[question.id].includes(option)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAnswers(prev => {
                      const current = Array.isArray(prev[question.id]) ? [...prev[question.id]] : [];
                      if (checked) {
                        return { ...prev, [question.id]: [...current, option] };
                      } else {
                        return { ...prev, [question.id]: current.filter(item => item !== option) };
                      }
                    });
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
        
      case 'radio':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="grid grid-cols-2 gap-2 mt-2"
          >
            {question.options?.map((option: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'drawing':
        // Para una implementación simple, usamos un textarea
        // En una implementación completa, se utilizaría un canvas para dibujar
        return (
          <div className="mt-2 space-y-2">
            {question.image && <img src={question.image} alt="Figura a copiar" className="max-w-[200px] mx-auto mb-4" />}
            <p className="text-sm text-muted-foreground">{question.instructions}</p>
            <Textarea 
              id={question.id}
              placeholder="Dibujo no disponible en esta versión. Por favor, describa lo que dibujaría."
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="h-32"
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const renderQuestions = (questions: any[]) => {
    return questions.map((question) => (
      <div key={question.id} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="mb-2">
          <Label className="text-lg font-medium">{question.text}</Label>
          {question.instruction && (
            <div className="mt-2 p-2 bg-muted rounded text-center font-bold text-lg">
              {question.instruction}
            </div>
          )}
          {question.image && question.type !== 'drawing' && (
            <div className="mt-2 flex justify-center">
              <img src={question.image} alt="Imagen de referencia" className="max-w-[200px]" />
            </div>
          )}
        </div>
        
        {renderQuestionInput(question)}
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
            Será redirigido a la página de sus informes en unos segundos...
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="container py-8 px-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Test Cognitivo</h1>
          <p className="text-muted-foreground">Paciente: {patientName}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Salir</span>
        </Button>
      </div>
      
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
          {currentSection.instructions && (
            <p className="text-sm text-muted-foreground mt-2">
              {currentSection.instructions}
            </p>
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
