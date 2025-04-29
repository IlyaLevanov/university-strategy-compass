
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

type AppLayoutProps = {
  children: React.ReactNode;
  userRole?: 'reader' | 'manager';
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, userRole = 'reader' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userRole={userRole} />
      
      <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
