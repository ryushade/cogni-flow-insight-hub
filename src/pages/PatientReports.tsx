
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText,
  Download,
  Calendar,
  User,
  FileCheck,
  Mail
} from "lucide-react";

// Example patient data - in a real app would be fetched based on patient ID
const patientData = {
  id: "P001",
  name: "María García",
  age: 68,
  email: "maria.garcia@ejemplo.com",
  phone: "+34 612 345 678"
};

// Example patient reports data
const patientReports = [
  { 
    id: "1", 
    test: "MMSE", 
    date: "2025-05-15", 
    score: "24/30",
    doctor: "Dr. Martínez",
    status: "Disponible",
    notes: "La paciente muestra signos de deterioro cognitivo leve. Se recomienda seguimiento en 3 meses.",
    categories: [
      { name: "Orientación", score: 8, maxScore: 10 },
      { name: "Registro", score: 3, maxScore: 3 },
      { name: "Atención y Cálculo", score: 4, maxScore: 5 },
      { name: "Recuerdo", score: 2, maxScore: 3 },
      { name: "Lenguaje", score: 7, maxScore: 9 }
    ]
  },
  { 
    id: "2", 
    test: "MoCA", 
    date: "2025-05-12", 
    score: "22/30",
    doctor: "Dr. Ruiz",
    status: "Disponible",
    notes: "Hay dificultades en las áreas de memoria y atención. Propongo comenzar ejercicios cognitivos."
  },
  { 
    id: "3", 
    test: "Prueba del Reloj", 
    date: "2025-05-10", 
    score: "8/10",
    doctor: "Dr. Martínez",
    status: "Disponible",
    notes: "Buena ejecución general, con ligeras dificultades en la ubicación de los números."
  }
];

const PatientReports = () => {
  const { patientId } = useParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<(typeof patientReports)[0] | null>(null);
  const [reportDetailsOpen, setReportDetailsOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState(patientData);
  
  useEffect(() => {
    // Simulate API call to get patient data based on patientId
    console.log(`Fetching data for patient: ${patientId}`);
    // In a real app, you would fetch the patient data here
  }, [patientId]);
  
  const filteredReports = patientReports.filter(report => {
    return (
      report.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Descargando informe",
      description: `El informe ${reportId} se está descargando.`,
    });
  };

  const handleViewDetails = (reportId: string) => {
    const report = patientReports.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setReportDetailsOpen(true);
    }
  };

  const handleRequestCopy = (reportId: string) => {
    toast({
      title: "Solicitud enviada",
      description: `Se ha enviado una solicitud para recibir una copia del informe ${reportId} por email.`,
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mis Informes Médicos</h1>
          <p className="text-muted-foreground">
            Consulte sus informes de evaluaciones cognitivas
          </p>
        </div>
        <div className="bg-medical-50 p-4 rounded-lg border border-medical-200 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-medical-200 flex items-center justify-center text-medical-700 font-bold">
            {patientInfo.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-medium">{patientInfo.name}</h2>
            <p className="text-sm text-muted-foreground">ID: {patientInfo.id}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative w-full max-w-sm">
          <Input
            type="search"
            placeholder="Buscar informes..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informes disponibles</CardTitle>
          <CardDescription>
            Todos los informes de sus evaluaciones cognitivas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No hay informes disponibles</h3>
              <p className="text-muted-foreground">
                No se encontraron informes que coincidan con su búsqueda
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prueba</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Puntuación</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.test}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.score}</TableCell>
                    <TableCell>{report.doctor}</TableCell>
                    <TableCell>
                      <Badge variant="success">{report.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewDetails(report.id)}
                            >
                              <FileCheck className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalles del informe</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Descargar
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Descargar informe PDF</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredReports.length} {filteredReports.length === 1 ? "informe" : "informes"} disponibles
          </div>
        </CardFooter>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={reportDetailsOpen} onOpenChange={setReportDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Detalles del Informe</span>
              <Badge variant="success">
                {selectedReport?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Resultado de la evaluación y recomendaciones médicas
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Paciente</p>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{patientInfo.name}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{selectedReport.date}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Prueba: {selectedReport.test}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Puntuación Total</p>
                    <p className="text-xl font-bold">{selectedReport.score}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Médico</p>
                    <p>{selectedReport.doctor}</p>
                  </div>
                </div>
              </div>
              
              {selectedReport.categories && (
                <div className="space-y-2">
                  <h3 className="text-md font-medium">Categorías evaluadas</h3>
                  <div className="space-y-2">
                    {selectedReport.categories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${(category.score / category.maxScore) * 100}%` }} 
                            />
                          </div>
                          <span className="text-sm font-medium min-w-[40px] text-right">
                            {category.score}/{category.maxScore}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="text-md font-medium">Observaciones médicas</h3>
                <p className="text-sm p-3 bg-muted rounded-md">
                  {selectedReport.notes || "No hay notas disponibles para este informe."}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setReportDetailsOpen(false)}>
              Cerrar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleRequestCopy(selectedReport?.id || "")}>
                <Mail className="h-4 w-4 mr-2" />
                Solicitar por Email
              </Button>
              <Button onClick={() => handleDownloadReport(selectedReport?.id || "")}>
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientReports;
