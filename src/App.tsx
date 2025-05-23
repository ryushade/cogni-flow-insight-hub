
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import TestList from "./pages/TestList";
import Results from "./pages/Results";
import TestApp from "./pages/TestApp";
import PatientTest from "./pages/PatientTest";
import ReportsManagement from "./pages/ReportsManagement";
import PatientReports from "./pages/PatientReports";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, userType }: { children: React.ReactNode, userType?: string }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUserType = localStorage.getItem("userType");
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && currentUserType !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
    };
    
    checkAuth();
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute userType="doctor">
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="/pacientes" element={<PatientList />} />
              <Route path="/pruebas" element={<TestList />} />
              <Route path="/resultados" element={<Results />} />
              <Route path="/test" element={<TestApp />} />
              <Route path="/citas" element={<PatientTest />} />
              <Route path="/informes" element={<ReportsManagement />} />
            </Route>
            
            <Route path="/paciente/test/:testId" element={
              <ProtectedRoute userType="patient">
                <PatientTest />
              </ProtectedRoute>
            } />
            
            <Route path="/paciente/informes/:patientId" element={
              <ProtectedRoute userType="patient">
                <PatientReports />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
