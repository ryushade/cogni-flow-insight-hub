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
import { Users, User, UserPlus } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Estados para login de doctor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Estados para login de paciente
  const [patientCode, setPatientCode] = useState("");
  
  // Estados para registro de doctor
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    specialty: "",
    institution: "",
    phone: "",
    notes: ""
  });

  // Demo credentials for testing
  const demoDoctor = { email: "doctor@ejemplo.com", password: "doctor123" };
  const demoPatientCode = "123456";
  
  const handleLoginDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim() === "" || password.trim() === "") {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor, complete todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    if (email === demoDoctor.email && password === demoDoctor.password) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema"
      });
      
      localStorage.setItem("userType", "doctor");
      localStorage.setItem("isLoggedIn", "true");
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
    
    if (patientCode.length !== 6) {
      toast({
        title: "Error de inicio de sesión",
        description: "El código debe tener 6 dígitos",
        variant: "destructive"
      });
      return;
    }
    
    if (patientCode === demoPatientCode) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema"
      });
      
      localStorage.setItem("userType", "patient");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("patientId", "P001");
      navigate("/paciente/test/1");
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Código incorrecto",
        variant: "destructive"
      });
    }
  };

  const handleRegisterDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!registerData.firstName || !registerData.lastName || !registerData.email || 
        !registerData.password || !registerData.licenseNumber || !registerData.specialty) {
      toast({
        title: "Error en el registro",
        description: "Por favor, complete todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error en el registro",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Error en el registro",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    // Simular registro exitoso
    toast({
      title: "Registro enviado",
      description: "Su solicitud de registro ha sido enviada para revisión. Recibirá un correo de confirmación en las próximas 24-48 horas.",
    });

    // Limpiar formulario
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      specialty: "",
      institution: "",
      phone: "",
      notes: ""
    });
  };

  const updateRegisterData = (field: string, value: string) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">CogniTest</CardTitle>
          <CardDescription>
            Sistema de Evaluación Cognitiva
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="doctor">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="doctor" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              Ingresar
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-1 text-xs">
              <UserPlus className="h-3 w-3" />
              Registro
            </TabsTrigger>
            <TabsTrigger value="patient" className="flex items-center gap-1 text-xs">
              <User className="h-3 w-3" />
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

          <TabsContent value="register">
            <CardContent className="pt-4 max-h-96 overflow-y-auto">
              <form onSubmit={handleRegisterDoctor}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="firstName">Nombre *</Label>
                      <Input
                        id="firstName"
                        value={registerData.firstName}
                        onChange={(e) => updateRegisterData('firstName', e.target.value)}
                        placeholder="Nombre"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellidos *</Label>
                      <Input
                        id="lastName"
                        value={registerData.lastName}
                        onChange={(e) => updateRegisterData('lastName', e.target.value)}
                        placeholder="Apellidos"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="registerEmail">Correo electrónico *</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => updateRegisterData('email', e.target.value)}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="registerPassword">Contraseña *</Label>
                      <Input
                        id="registerPassword"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => updateRegisterData('password', e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => updateRegisterData('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="licenseNumber">Número de colegiado *</Label>
                    <Input
                      id="licenseNumber"
                      value={registerData.licenseNumber}
                      onChange={(e) => updateRegisterData('licenseNumber', e.target.value)}
                      placeholder="Ej: 123456789"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="specialty">Especialidad *</Label>
                    <Select onValueChange={(value) => updateRegisterData('specialty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neurologia">Neurología</SelectItem>
                        <SelectItem value="psiquiatria">Psiquiatría</SelectItem>
                        <SelectItem value="geriatria">Geriatría</SelectItem>
                        <SelectItem value="medicina-interna">Medicina Interna</SelectItem>
                        <SelectItem value="medicina-familiar">Medicina Familiar</SelectItem>
                        <SelectItem value="psicologia">Psicología</SelectItem>
                        <SelectItem value="otra">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="institution">Institución/Hospital</Label>
                    <Input
                      id="institution"
                      value={registerData.institution}
                      onChange={(e) => updateRegisterData('institution', e.target.value)}
                      placeholder="Hospital/Clínica/Centro de salud"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={registerData.phone}
                      onChange={(e) => updateRegisterData('phone', e.target.value)}
                      placeholder="+34 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Comentarios adicionales</Label>
                    <Textarea
                      id="notes"
                      value={registerData.notes}
                      onChange={(e) => updateRegisterData('notes', e.target.value)}
                      placeholder="Información adicional que considere relevante..."
                      className="min-h-[60px]"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-6">
                  Enviar solicitud de registro
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
