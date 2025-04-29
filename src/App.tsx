
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import UniversityPage from "./pages/UniversityPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => {
  // In a real app, this would be based on authentication
  const [userRole, setUserRole] = useState<'reader' | 'manager'>('reader');

  // Function to toggle user role (for demo purposes)
  const toggleRole = () => {
    setUserRole(prev => prev === 'reader' ? 'manager' : 'reader');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={toggleRole} 
              className="btn-primary text-sm"
            >
              Переключить роль: {userRole === 'reader' ? 'Читатель' : 'Менеджер'}
            </button>
          </div>

          <AppLayout userRole={userRole}>
            <Routes>
              <Route path="/" element={<HomePage userRole={userRole} />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/university" element={<UniversityPage />} />
              <Route path="/university/:id" element={<UniversityPage />} />
              {userRole === 'manager' && <Route path="/admin" element={<AdminPage />} />}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
