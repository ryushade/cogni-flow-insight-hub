
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList, Search } from "lucide-react";

// Datos de ejemplo para las pruebas cognitivas
const testsData = [
  {
    id: "1",
    name: "Mini-Mental State Examination (MMSE)",
    type: "Evaluación cognitiva",
    status: "Disponible",
    lastUpdated: "2025-05-15",
  },
  {
    id: "2",
    name: "Montreal Cognitive Assessment (MoCA)",
    type: "Evaluación cognitiva",
    status: "Disponible",
    lastUpdated: "2025-05-10",
  },
  {
    id: "3",
    name: "Prueba del Reloj",
    type: "Evaluación visoespacial",
    status: "Disponible",
    lastUpdated: "2025-05-12",
  },
  {
    id: "4",
    name: "Test de Fluidez Verbal",
    type: "Evaluación del lenguaje",
    status: "En desarrollo",
    lastUpdated: "2025-04-30",
  },
  {
    id: "5",
    name: "Trail Making Test",
    type: "Evaluación de atención",
    status: "En desarrollo",
    lastUpdated: "2025-04-25",
  },
];

const TestList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTests = testsData.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleTestSelect = (testId: string) => {
    navigate(`/test`);
    toast({
      title: "Prueba seleccionada",
      description: "Preparando la prueba para su aplicación.",
    });
  };
  
  const handlePatientTest = (testId: string) => {
    navigate(`/paciente/test/${testId}`);
    toast({
      title: "Vista de paciente",
      description: "Accediendo a la interfaz de paciente para la prueba.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pruebas Cognitivas</h1>
        <p className="text-muted-foreground">
          Gestione y aplique pruebas cognitivas estandarizadas
        </p>
      </div>
      
      <div className="flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar pruebas..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <ClipboardList className="mr-2 h-4 w-4" />
          Nueva Prueba
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pruebas disponibles</CardTitle>
          <CardDescription>
            Lista de pruebas cognitivas estandarizadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Última actualización</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.name}</TableCell>
                  <TableCell>{test.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        test.status === "Disponible" ? "default" : "secondary"
                      }
                    >
                      {test.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{test.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={test.status !== "Disponible"}
                        onClick={() => handleTestSelect(test.id)}
                      >
                        Aplicar
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        disabled={test.status !== "Disponible"}
                        onClick={() => handlePatientTest(test.id)}
                      >
                        Vista paciente
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestList;
