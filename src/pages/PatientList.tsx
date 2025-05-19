
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";

// Datos de ejemplo de pacientes
const patientData = [
  { id: 1, name: "María García", age: 68, gender: "F", diagnosis: "Alzheimer temprano", lastTest: "2025-05-10", status: "Completo" },
  { id: 2, name: "Carlos López", age: 72, gender: "M", diagnosis: "Deterioro cognitivo leve", lastTest: "2025-05-01", status: "Pendiente" },
  { id: 3, name: "Ana Martínez", age: 65, gender: "F", diagnosis: "Evaluación inicial", lastTest: "2025-04-28", status: "Completo" },
  { id: 4, name: "Pedro Sánchez", age: 78, gender: "M", diagnosis: "Demencia vascular", lastTest: "2025-04-22", status: "Completo" },
  { id: 5, name: "Lucía Rodríguez", age: 70, gender: "F", diagnosis: "Evaluación rutinaria", lastTest: "2025-04-15", status: "Pendiente" },
  { id: 6, name: "José Fernández", age: 75, gender: "M", diagnosis: "Deterioro cognitivo leve", lastTest: "2025-04-08", status: "Completo" },
  { id: 7, name: "Carmen Díaz", age: 69, gender: "F", diagnosis: "Depresión", lastTest: "2025-04-05", status: "Completo" },
  { id: 8, name: "Antonio Moreno", age: 81, gender: "M", diagnosis: "Alzheimer", lastTest: "2025-03-30", status: "Completo" }
];

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrar pacientes basados en la búsqueda
  const filteredPatients = patientData.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Paciente
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>
            Gestione y revise la información de sus pacientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nombre o diagnóstico..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Diagnóstico</TableHead>
                  <TableHead>Última Prueba</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No se encontraron pacientes con esos criterios
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age} años</TableCell>
                      <TableCell>{patient.diagnosis}</TableCell>
                      <TableCell>{patient.lastTest}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={patient.status === "Completo" ? "default" : "outline"}
                          className={patient.status === "Completo" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "border-amber-500 text-amber-700"}
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList;
