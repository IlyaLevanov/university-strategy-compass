
import React from 'react';
import DataImportSection from '../components/admin/DataImportSection';
import PdfUploadSection from '../components/admin/PdfUploadSection';
import UserManagementSection from '../components/admin/UserManagementSection';

const AdminPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">Административная панель</h1>
      
      <DataImportSection />
      <PdfUploadSection />
      <UserManagementSection />
    </div>
  );
};

export default AdminPage;
