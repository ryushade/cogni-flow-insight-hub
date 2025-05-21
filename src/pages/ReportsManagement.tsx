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
import { FileText, Search, FileChartPie, Download, MoreVertical, ChevronDown } from "lucide-react";

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
    status: "Generado" 
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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Descargar
                            </Button>
                          )}
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Enviar por email</DropdownMenuItem>
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
    </div>
  );
};

export default ReportsManagement;
