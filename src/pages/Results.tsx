
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const resultsData = [
  { id: 1, patientName: "María García", test: "MMSE", date: "2025-05-10", score: 24, maxScore: 30 },
  { id: 2, patientName: "María García", test: "MoCA", date: "2025-04-12", score: 22, maxScore: 30 },
  { id: 3, patientName: "María García", test: "Prueba del Reloj", date: "2025-03-05", score: 8, maxScore: 10 },
  { id: 4, patientName: "Carlos López", test: "MMSE", date: "2025-05-01", score: 26, maxScore: 30 },
  { id: 5, patientName: "Ana Martínez", test: "MoCA", date: "2025-04-28", score: 25, maxScore: 30 },
  { id: 6, patientName: "Pedro Sánchez", test: "Prueba del Reloj", date: "2025-04-22", score: 6, maxScore: 10 }
];

const trendData = [
  { month: "Ene", mmse: 24, moca: 22, clock: 7 },
  { month: "Feb", mmse: 23, moca: 21, clock: 7 },
  { month: "Mar", mmse: 22, moca: 20, clock: 6 },
  { month: "Abr", mmse: 23, moca: 21, clock: 7 },
  { month: "May", mmse: 24, moca: 22, clock: 8 }
];

const testDistributionData = [
  { name: "MMSE", value: 42 },
  { name: "MoCA", value: 38 },
  { name: "Prueba del Reloj", value: 25 }
];

const MMSECategoryData = [
  { name: "Orientación", normal: 9, paciente: 8, max: 10 },
  { name: "Registro", normal: 3, paciente: 3, max: 3 },
  { name: "Atención", normal: 5, paciente: 3, max: 5 },
  { name: "Recuerdo", normal: 2, paciente: 1, max: 3 },
  { name: "Lenguaje", normal: 8, paciente: 7, max: 9 }
];

const Results = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resultados de Evaluaciones</h1>
        <p className="text-muted-foreground">Visualice y analice los resultados de las evaluaciones cognitivas</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="detailed">Detalle</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-7">
            <Card className="col-span-7 md:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resultados Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Prueba</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Puntuación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultsData.slice(0, 5).map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>{result.patientName}</TableCell>
                        <TableCell>{result.test}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell className="text-right font-medium">
                          {result.score}/{result.maxScore}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="col-span-7 md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Distribución de Pruebas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={testDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Puntuaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="mmse" 
                      name="MMSE" 
                      stroke="#1E88E5" 
                      strokeWidth={2}
                      dot={{ stroke: '#1E88E5', strokeWidth: 2, r: 4, fill: 'white' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="moca" 
                      name="MoCA" 
                      stroke="#26A69A" 
                      strokeWidth={2}
                      dot={{ stroke: '#26A69A', strokeWidth: 2, r: 4, fill: 'white' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clock" 
                      name="Prueba del Reloj" 
                      stroke="#AB47BC" 
                      strokeWidth={2}
                      dot={{ stroke: '#AB47BC', strokeWidth: 2, r: 4, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Categorías MMSE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MMSECategoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="max" name="Máximo" fill="#E0E0E0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="normal" name="Normal" fill="#2196F3" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="paciente" name="Paciente" fill="#F44336" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Prueba</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Puntuación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultsData.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>{result.patientName}</TableCell>
                        <TableCell>{result.test}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell className="text-right font-medium">
                          {result.score}/{result.maxScore}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
