
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notificaciones",
      description: "No hay nuevas notificaciones",
    });
  };
  
  return (
    <header className="border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative hidden md:flex items-center flex-1 max-w-md">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Buscar pacientes, pruebas..." 
              className="pl-8 w-full max-w-md bg-background"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-medical-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};
