
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { FileType } from '../../types/admin';

const DataImportSection: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<Record<FileType, File | null>>({
    A: null,
    B: null,
    C: null
  });

  // Handle file selection for data import
  const handleFileSelect = (type: FileType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles({
        ...selectedFiles,
        [type]: e.target.files[0]
      });
    }
  };

  // Handle data import
  const handleDataImport = () => {
    // In a real application, this would upload the files to the server
    const filesSelected = Object.values(selectedFiles).some(file => file !== null);
    
    if (!filesSelected) {
      toast.error('Выберите хотя бы один файл для импорта');
      return;
    }
    
    toast.success('Данные успешно импортированы');
    
    // Reset files after import
    setSelectedFiles({
      A: null,
      B: null,
      C: null
    });
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Загрузка данных</h2>
      <p className="text-university-textSecondary mb-6">
        Загрузите Excel файлы для обновления данных в системе
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {['A', 'B', 'C'].map((type) => (
          <div key={type} className="flex flex-col">
            <div className="mb-2 flex items-center">
              <FileSpreadsheet className="mr-2 text-university-blue" size={18} />
              <span>Файл данных {type}</span>
            </div>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/70 rounded-md cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Upload className="mb-2 text-university-textSecondary" size={24} />
                {selectedFiles[type as FileType] ? (
                  <p className="text-sm text-university-text">
                    {selectedFiles[type as FileType]?.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-university-textSecondary">
                      Выберите файл Excel
                    </p>
                    <p className="text-xs text-university-textSecondary/70 mt-1">
                      (XLS, XLSX)
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xls,.xlsx"
                onChange={handleFileSelect(type as FileType)}
              />
            </label>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <button onClick={handleDataImport} className="btn-primary flex items-center gap-2">
          <Upload size={16} />
          <span>Импортировать</span>
        </button>
      </div>
    </div>
  );
};

export default DataImportSection;
