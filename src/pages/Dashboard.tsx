
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, UserRound, CheckSquare, Clock } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const sampleData = [
  { name: 'Ene', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Abr', value: 24 },
  { name: 'May', value: 30 },
  { name: 'Jun', value: 22 },
  { name: 'Jul', value: 28 },
];

const recentPatients = [
  { id: 1, name: "María García", age: 68, test: "MMSE", date: "2025-05-18", score: 24 },
  { id: 2, name: "Carlos López", age: 72, test: "Prueba del Reloj", date: "2025-05-17", score: 8 },
  { id: 3, name: "Ana Martínez", age: 65, test: "MoCA", date: "2025-05-15", score: 22 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Panel de Control</h1>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Button>Nueva evaluación</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pacientes Totales
            </CardTitle>
            <UserRound className="h-5 w-5 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">
              +4 nuevos este mes
            </p>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tests Completados
            </CardTitle>
            <CheckSquare className="h-5 w-5 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground mt-1">
              +18 esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pruebas Pendientes
            </CardTitle>
            <Clock className="h-5 w-5 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 para hoy
            </p>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Media de Puntuación
            </CardTitle>
            <AreaChart className="h-5 w-5 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3</div>
            <p className="text-xs text-muted-foreground mt-1">
              +1.2 vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>Evaluaciones Mensuales</CardTitle>
            <CardDescription>
              Total de evaluaciones realizadas por mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1E88E5" 
                    strokeWidth={2} 
                    dot={{ stroke: '#1E88E5', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 6, fill: '#1E88E5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Evaluaciones Recientes</CardTitle>
            <CardDescription>
              Últimas pruebas completadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full bg-medical-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-medical-700">
                        {patient.name.split(' ').map(part => part[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.age} años - {patient.test}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{patient.score}</div>
                    <div className="text-xs text-muted-foreground">puntos</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
