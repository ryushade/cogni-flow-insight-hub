import React, { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  FileChartPie, 
  Download, 
  MoreVertical,
  ChevronDown, 
  Calendar,
  User,
  FileCheck,
  FilePenLine,
  Mail
} from "lucide-react";
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

// Datos de ejemplo para los informes
const reportsData = [
  { 
    id: "1", 
    patientName: "María García", 
    patientId: "P001", 
    test: "MMSE", 
    date: "2025-05-15", 
    score: "24/30",
    doctor: "Dr. Martínez",
    status: "Generado",
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
    patientName: "Carlos López", 
    patientId: "P002", 
    test: "MoCA", 
    date: "2025-05-12", 
    score: "22/30",
    doctor: "Dr. Ruiz",
    status: "Generado" 
  },
  { 
    id: "3", 
    patientName: "Ana Martínez", 
    patientId: "P003", 
    test: "Prueba del Reloj", 
    date: "2025-05-10", 
    score: "8/10",
    doctor: "Dr. Martínez",
    status: "Pendiente" 
  },
  { 
    id: "4", 
    patientName: "Pedro Sánchez", 
    patientId: "P004", 
    test: "MMSE", 
    date: "2025-05-08", 
    score: "26/30",
    doctor: "Dr. Gómez",
    status: "Generado" 
  },
  { 
    id: "5", 
    patientName: "Isabel Rodríguez", 
    patientId: "P005", 
    test: "MoCA", 
    date: "2025-05-05", 
    score: "25/30",
    doctor: "Dr. Ruiz",
    status: "Pendiente" 
  }
];

// Plantillas de informes
const reportTemplates = [
  { id: "1", name: "Informe Estándar", description: "Plantilla general para todos los tipos de pruebas" },
  { id: "2", name: "Informe Detallado MMSE", description: "Análisis detallado de resultados MMSE" },
  { id: "3", name: "Informe MoCA con Gráficos", description: "Incluye gráficos comparativos" },
  { id: "4", name: "Reporte Ejecutivo", description: "Versión resumida para revisión rápida" }
];

const ReportsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedReport, setSelectedReport] = useState<(typeof reportsData)[0] | null>(null);
  const [reportDetailsOpen, setReportDetailsOpen] = useState(false);
  
  const filteredReports = reportsData.filter(report => {
    const matchesTerm = 
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filterType === "all") return matchesTerm;
    return matchesTerm && (
      (filterType === "mmse" && report.test === "MMSE") ||
      (filterType === "moca" && report.test === "MoCA") ||
      (filterType === "clock" && report.test === "Prueba del Reloj") ||
      (filterType === "pending" && report.status === "Pendiente") ||
      (filterType === "generated" && report.status === "Generado")
    );
  });

  const handleGenerateReport = (reportId: string) => {
    toast({
      title: "Informe generado",
      description: `El informe ${reportId} se ha generado correctamente.`,
    });
  };

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Descargando informe",
      description: `El informe ${reportId} se está descargando.`,
    });
  };

  const handleViewDetails = (reportId: string) => {
    const report = reportsData.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setReportDetailsOpen(true);
    }
  };

  const handleSendEmail = (reportId: string) => {
    toast({
      title: "Correo enviado",
      description: `El informe ${reportId} se ha enviado por email correctamente.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Informes</h1>
        <p className="text-muted-foreground">
          Genere y gestione informes de resultados de pruebas cognitivas
        </p>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="reports">Informes</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por paciente, prueba..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los informes</SelectItem>
                  <SelectItem value="mmse">MMSE</SelectItem>
                  <SelectItem value="moca">MoCA</SelectItem>
                  <SelectItem value="clock">Prueba del Reloj</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="generated">Generados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>
              <FileChartPie className="mr-2 h-4 w-4" />
              Nuevo Informe
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Informes de resultados</CardTitle>
              <CardDescription>
                Gestione los informes de resultados de las pruebas cognitivas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>ID</TableHead>
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
                      <TableCell className="font-medium">{report.patientName}</TableCell>
                      <TableCell>{report.patientId}</TableCell>
                      <TableCell>{report.test}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.score}</TableCell>
                      <TableCell>{report.doctor}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-md text-xs inline-block font-medium ${
                          report.status === "Generado" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {report.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {report.status === "Pendiente" ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleGenerateReport(report.id)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Generar
                            </Button>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="outline" 
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
                          )}
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(report.id)}>
                                <FileCheck className="h-4 w-4 mr-2" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FilePenLine className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendEmail(report.id)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Enviar por email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredReports.length} de {reportsData.length} informes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-medium">Plantillas de informes disponibles</div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Nueva Plantilla
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map(template => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      Previsualizar
                    </Button>
                    <Button size="sm">
                      Usar Plantilla
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Details Dialog */}
      <Dialog open={reportDetailsOpen} onOpenChange={setReportDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Detalles del Informe</span>
              <Badge variant={selectedReport?.status === "Generado" ? "success" : "warning"}>
                {selectedReport?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Información detallada sobre los resultados de la evaluación
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Paciente</p>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{selectedReport.patientName}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">ID: {selectedReport.patientId}</p>
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
                  <h3 className="text-md font-medium">Categorías</h3>
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
                <h3 className="text-md font-medium">Notas</h3>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
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
              {selectedReport?.status === "Generado" && (
                <>
                  <Button variant="outline" onClick={() => handleSendEmail(selectedReport.id)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar por Email
                  </Button>
                  <Button onClick={() => handleDownloadReport(selectedReport.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsManagement;
