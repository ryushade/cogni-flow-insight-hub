import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Users,
  ClipboardList,
  BarChart,
  Home,
  Calendar,
  FileChartPie
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Inicio',
    icon: <Home className="h-5 w-5" />
  },
  {
    path: '/pacientes',
    label: 'Pacientes',
    icon: <Users className="h-5 w-5" />
  },
  {
    path: '/pruebas',
    label: 'Pruebas',
    icon: <ClipboardList className="h-5 w-5" />
  },
  {
    path: '/resultados',
    label: 'Resultados',
    icon: <BarChart className="h-5 w-5" />
  },
  {
    path: '/informes',
    label: 'Informes',
    icon: <FileChartPie className="h-5 w-5" />
  },
  {
    path: '/citas',
    label: 'Citas',
    icon: <Calendar className="h-5 w-5" />
  }
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-collapse on mobile
  const effectiveCollapsed = isMobile ? true : collapsed;
  
  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-border transition-all duration-300",
        effectiveCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!effectiveCollapsed && (
          <h1 className="text-xl font-semibold text-medical-700">CogniTest</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("ml-auto", effectiveCollapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {effectiveCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-medical-700 font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-medical-600"
                  )
                }
              >
                {item.icon}
                {!effectiveCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div 
          className={cn(
            "flex items-center gap-3",
            effectiveCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-medical-200 flex items-center justify-center text-medical-700 font-medium">
            MD
          </div>
          {!effectiveCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Dr. Martínez</span>
              <span className="text-xs text-muted-foreground">Neurología</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
