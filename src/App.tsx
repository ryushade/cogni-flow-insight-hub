
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import TestList from "./pages/TestList";
import Results from "./pages/Results";
import TestApp from "./pages/TestApp";
import PatientTest from "./pages/PatientTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/pacientes" element={<PatientList />} />
            <Route path="/pruebas" element={<TestList />} />
            <Route path="/resultados" element={<Results />} />
            <Route path="/test" element={<TestApp />} />
            <Route path="/citas" element={<PatientTest />} />
          </Route>
          <Route path="/paciente/test/:testId" element={<PatientTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
