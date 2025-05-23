
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, User } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patientCode, setPatientCode] = useState("");
  const [userType, setUserType] = useState("doctor"); // "doctor" or "patient"
  const [rememberMe, setRememberMe] = useState(false);

  // Demo credentials for testing
  const demoDoctor = { email: "doctor@ejemplo.com", password: "doctor123" };
  const demoPatientCode = "123456";
  
  const handleLoginDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for demo purposes
    if (email.trim() === "" || password.trim() === "") {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor, complete todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    // Demo authentication logic
    if (email === demoDoctor.email && password === demoDoctor.password) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema"
      });
      
      // Save user type in localStorage for demo purposes
      localStorage.setItem("userType", "doctor");
      localStorage.setItem("isLoggedIn", "true");
      
      // Navigate to doctor dashboard
      navigate("/");
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas",
        variant: "destructive"
      });
    }
  };
  
  const handleLoginPatient = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (patientCode.length !== 6) {
      toast({
        title: "Error de inicio de sesión",
        description: "El código debe tener 6 dígitos",
        variant: "destructive"
      });
      return;
    }
    
    // Demo authentication for patient
    if (patientCode === demoPatientCode) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema"
      });
      
      // Save user type in localStorage for demo purposes
      localStorage.setItem("userType", "patient");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("patientId", "P001");
      
      // Navigate to patient test
      navigate("/paciente/test/1");
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Código incorrecto",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">CogniTest</CardTitle>
          <CardDescription>
            Sistema de Evaluación Cognitiva
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="doctor" onValueChange={setUserType}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profesional
            </TabsTrigger>
            <TabsTrigger value="patient" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Paciente
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctor">
            <CardContent className="pt-4">
              <form onSubmit={handleLoginDoctor}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Para demo: doctor@ejemplo.com
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Para demo: doctor123
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => 
                        setRememberMe(checked === true)
                      }
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Recordar sesión
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-6">
                  Iniciar sesión
                </Button>
              </form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="patient">
            <CardContent className="pt-4">
              <form onSubmit={handleLoginPatient}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patientCode">Código de paciente</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Introduzca el código de 6 dígitos proporcionado por su médico
                    </p>
                    
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={6}
                        value={patientCode}
                        onChange={setPatientCode}
                      >
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
                    
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Para demo: 123456
                    </p>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-6">
                  Acceder a mi prueba
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col">
          <p className="text-xs text-center text-muted-foreground mt-4">
            Sistema de Evaluación Neuropsicológica © 2025
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
