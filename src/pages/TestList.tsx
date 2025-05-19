
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const testTypes = [
  {
    id: "mmse",
    name: "Mini-Mental State Examination (MMSE)",
    description: "Evalúa orientación, memoria inmediata, atención, cálculo, recuerdo diferido y lenguaje.",
    duration: "10-15 minutos",
    maxScore: 30,
    sections: ["Orientación", "Registro", "Atención y Cálculo", "Recuerdo", "Lenguaje"]
  },
  {
    id: "moca",
    name: "Montreal Cognitive Assessment (MoCA)",
    description: "Evalúa función ejecutiva, capacidad visuoespacial, memoria, atención, lenguaje y orientación.",
    duration: "10-15 minutos",
    maxScore: 30,
    sections: ["Visuoespacial/Ejecutiva", "Denominación", "Memoria", "Atención", "Lenguaje", "Abstracción", "Recuerdo diferido", "Orientación"]
  },
  {
    id: "clock",
    name: "Prueba del Reloj",
    description: "Evalúa función ejecutiva, capacidad visuoespacial y construccional.",
    duration: "5 minutos",
    maxScore: 10,
    sections: ["Dibujo del círculo", "Colocación de números", "Colocación de manecillas"]
  }
];

const TestList = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Pruebas Cognitivas</h1>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Pruebas Disponibles</TabsTrigger>
          <TabsTrigger value="assigned">Pruebas Asignadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testTypes.map((test) => (
              <Card key={test.id} className="test-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-medical-700 hover:bg-blue-50">
                      {test.maxScore} pts
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 h-10">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Secciones</h4>
                      <div className="flex flex-wrap gap-1">
                        {test.sections.slice(0, 3).map((section) => (
                          <Badge key={section} variant="secondary" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                        {test.sections.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{test.sections.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Duración aproximada: <span className="text-foreground">{test.duration}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Iniciar prueba</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="assigned">
          <Card>
            <CardHeader>
              <CardTitle>Pruebas Asignadas a Pacientes</CardTitle>
              <CardDescription>
                Pruebas asignadas que están pendientes de completar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium">María García</h3>
                    <p className="text-sm text-muted-foreground">MoCA (Montreal Cognitive Assessment)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-500 text-amber-700">
                      Pendiente
                    </Badge>
                    <Button size="sm">Iniciar</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium">Carlos López</h3>
                    <p className="text-sm text-muted-foreground">Prueba del Reloj</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-500 text-amber-700">
                      Pendiente
                    </Badge>
                    <Button size="sm">Iniciar</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium">Lucía Rodríguez</h3>
                    <p className="text-sm text-muted-foreground">MMSE (Mini-Mental State Examination)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-500 text-amber-700">
                      Pendiente
                    </Badge>
                    <Button size="sm">Iniciar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestList;
