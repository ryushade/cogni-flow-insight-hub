
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { MMSE } from "@/components/tests/MMSE";
import { MoCA } from "@/components/tests/MoCA";
import { ClockDrawing } from "@/components/tests/ClockDrawing";

const TestApp = () => {
  const [selectedTest, setSelectedTest] = useState("mmse");
  const [selectedPatient, setSelectedPatient] = useState("");
  
  // Datos de ejemplo de pacientes
  const patients = [
    { id: "1", name: "María García" },
    { id: "2", name: "Carlos López" },
    { id: "3", name: "Ana Martínez" },
    { id: "4", name: "Pedro Sánchez" }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Aplicación de Prueba</h1>
        <p className="text-muted-foreground">Administre pruebas cognitivas digitalizadas</p>
      </div>
      
      <Card className="mb-6">
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
      </Card>
      
      <div className="mt-6">
        {selectedTest === "mmse" && <MMSE />}
        {selectedTest === "moca" && <MoCA />}
        {selectedTest === "clock" && <ClockDrawing />}
      </div>
    </div>
  );
};

export default TestApp;
