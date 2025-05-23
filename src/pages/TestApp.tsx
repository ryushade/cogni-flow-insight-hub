
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MMSE } from "@/components/tests/MMSE";
import { MoCA } from "@/components/tests/MoCA";
import { ClockDrawing } from "@/components/tests/ClockDrawing";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Copy } from "lucide-react";

const TestApp = () => {
  const [selectedTest, setSelectedTest] = useState("mmse");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [activeTab, setActiveTab] = useState("configurar");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated as doctor
    const userType = localStorage.getItem("userType");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn || userType !== "doctor") {
      navigate("/login");
    }
  }, [navigate]);
  
  // Datos de ejemplo de pacientes
  const patients = [
    { id: "1", name: "María García" },
    { id: "2", name: "Carlos López" },
    { id: "3", name: "Ana Martínez" },
    { id: "4", name: "Pedro Sánchez" }
  ];
  
  const generatePatientCode = () => {
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Por favor, seleccione un paciente",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedTest) {
      toast({
        title: "Error",
        description: "Por favor, seleccione una prueba",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    toast({
      title: "Código generado",
      description: "Código de acceso para el paciente creado con éxito"
    });
    
    // In a real app, you would save this code to the database
    console.log("Código generado para el paciente:", {
      patientId: selectedPatient,
      test: selectedTest,
      code
    });
    
    setActiveTab("codigo");
  };
  
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Código copiado",
      description: "El código ha sido copiado al portapapeles"
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Aplicación de Prueba</h1>
        <p className="text-muted-foreground">Administre pruebas cognitivas digitalizadas</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configurar">Configurar</TabsTrigger>
          <TabsTrigger value="codigo" disabled={!generatedCode}>Código de Paciente</TabsTrigger>
          <TabsTrigger value="aplicar">Aplicar Prueba</TabsTrigger>
        </TabsList>
        
        <TabsContent value="configurar">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Configuración de la Prueba</CardTitle>
              <CardDescription>
                Seleccione el paciente y la prueba que desea aplicar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente</Label>
                  <Select 
                    value={selectedPatient} 
                    onValueChange={setSelectedPatient}
                  >
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="test">Prueba cognitiva</Label>
                  <Select 
                    value={selectedTest} 
                    onValueChange={setSelectedTest}
                  >
                    <SelectTrigger id="test">
                      <SelectValue placeholder="Seleccionar prueba" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mmse">Mini-Mental State Examination (MMSE)</SelectItem>
                      <SelectItem value="moca">Montreal Cognitive Assessment (MoCA)</SelectItem>
                      <SelectItem value="clock">Prueba del Reloj</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generatePatientCode} className="ml-auto">
                Generar código de acceso
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="codigo">
          <Card>
            <CardHeader>
              <CardTitle>Código de acceso para el paciente</CardTitle>
              <CardDescription>
                Comparta este código con el paciente para que pueda acceder a la prueba
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Código de acceso:
                </p>
                <div className="flex justify-center mb-4">
                  <InputOTP value={generatedCode} maxLength={6} readOnly>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={copyCodeToClipboard}
                >
                  <Copy className="h-4 w-4" />
                  Copiar código
                </Button>
              </div>
              
              <div className="w-full max-w-md mt-6 p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Instrucciones para el paciente:</h3>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  <li>Acceda a la aplicación desde el enlace que se le ha proporcionado</li>
                  <li>Seleccione la opción "Paciente" en la pantalla de inicio</li>
                  <li>Introduzca el código de 6 dígitos proporcionado</li>
                  <li>Siga las instrucciones para completar la prueba</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("configurar")}>
                Volver a configuración
              </Button>
              <Button onClick={() => setActiveTab("aplicar")}>
                Aplicar prueba ahora
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="aplicar">
          <div className="mt-6">
            {selectedTest === "mmse" && <MMSE />}
            {selectedTest === "moca" && <MoCA />}
            {selectedTest === "clock" && <ClockDrawing />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestApp;
