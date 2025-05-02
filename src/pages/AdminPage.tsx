
import React, { useState, useEffect } from 'react';
import { Upload, Check, Search, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Example users data
const usersData = [
  { id: 1, name: 'Иванов А.А.', email: 'ivanov@example.com', role: 'reader' },
  { id: 2, name: 'Петров С.М.', email: 'petrov@example.com', role: 'manager' },
  { id: 3, name: 'Сидорова Е.В.', email: 'sidorova@example.com', role: 'reader' },
  { id: 4, name: 'Козлов И.Н.', email: 'kozlov@example.com', role: 'reader' },
  { id: 5, name: 'Морозова А.С.', email: 'morozova@example.com', role: 'manager' },
];

// Example universities data
const universitiesData = [
  { id: 1, name: 'Московский государственный университет' },
  { id: 2, name: 'Санкт-Петербургский государственный университет' },
  { id: 3, name: 'МГТУ им. Н.Э. Баумана' },
  { id: 4, name: 'Новосибирский государственный университет' },
  { id: 5, name: 'Казанский федеральный университет' },
];

type FileType = 'A' | 'B' | 'C';

const AdminPage: React.FC = () => {
  // Data Import State
  const [selectedFiles, setSelectedFiles] = useState<Record<FileType, File | null>>({
    A: null,
    B: null,
    C: null
  });
  
  // PDF Upload State
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [universitySearchQuery, setUniversitySearchQuery] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(universitiesData);
  const [documentTags, setDocumentTags] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  // User Management State
  const [users, setUsers] = useState(usersData);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  
  // Filter universities based on search query
  useEffect(() => {
    if (universitySearchQuery.trim() === '') {
      setFilteredUniversities(universitiesData);
    } else {
      const filtered = universitiesData.filter(university => 
        university.name.toLowerCase().includes(universitySearchQuery.toLowerCase())
      );
      setFilteredUniversities(filtered);
    }
  }, [universitySearchQuery]);
  
  // Handle file selection for data import
  const handleFileSelect = (type: FileType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles({
        ...selectedFiles,
        [type]: e.target.files[0]
      });
    }
  };
  
  // Filter users based on search query
  useEffect(() => {
    if (userSearchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [userSearchQuery, users]);
  
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
  
  // Handle university selection directly from input
  const handleUniversityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUniversitySearchQuery(e.target.value);
    
    // If exact match, select it directly
    const matchedUniversity = universitiesData.find(
      uni => uni.name.toLowerCase() === e.target.value.toLowerCase()
    );
    
    if (matchedUniversity) {
      setSelectedUniversity(matchedUniversity.id.toString());
    }
  };
  
  // Handle university selection from dropdown
  const handleUniversitySelect = (universityId: string) => {
    setSelectedUniversity(universityId);
    const selected = universitiesData.find(uni => uni.id.toString() === universityId);
    if (selected) {
      setUniversitySearchQuery(selected.name);
    }
  };
  
  // Handle PDF file selection
  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };
  
  // Handle PDF upload
  const handlePdfUpload = () => {
    // In a real application, this would upload the PDF to the server
    
    if (!selectedUniversity && !universitySearchQuery) {
      toast.error('Выберите или введите название университета');
      return;
    }
    
    if (!pdfFile) {
      toast.error('Выберите файл PDF');
      return;
    }
    
    toast.success('PDF документ успешно загружен');
    
    // Reset form after upload
    setSelectedUniversity('');
    setUniversitySearchQuery('');
    setDocumentTags('');
    setPdfFile(null);
  };
  
  // Handle role change
  const handleRoleChange = (userId: number, newRole: 'reader' | 'manager') => {
    setUsers(
      users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    
    toast.success(`Роль пользователя изменена на ${newRole === 'reader' ? 'Читатель' : 'Менеджер'}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">Административная панель</h1>
      
      {/* Data Import Section */}
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
      
      {/* PDF Upload Section */}
      <div className="glass-card p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Загрузка PDF</h2>
        <p className="text-university-textSecondary mb-6">
          Загрузите PDF документы для университетов
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-2">Университет</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск или выбор университета"
                value={universitySearchQuery}
                onChange={handleUniversityInputChange}
                className="w-full pr-10"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="absolute right-0 top-0 h-full px-3 flex items-center"
                    type="button"
                  >
                    <Search size={16} className="text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px] max-h-[300px] overflow-y-auto">
                  {filteredUniversities.length > 0 ? (
                    filteredUniversities.map((university) => (
                      <DropdownMenuItem 
                        key={university.id}
                        onClick={() => handleUniversitySelect(university.id.toString())}
                        className="flex items-center justify-between"
                      >
                        {university.name}
                        {selectedUniversity === university.id.toString() && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                      Ничего не найдено
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2">Теги (через запятую)</label>
            <input
              type="text"
              placeholder="стратегия, отчет, план"
              value={documentTags}
              onChange={(e) => setDocumentTags(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm mb-2">PDF файл</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/70 rounded-md cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors">
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Upload className="mb-2 text-university-textSecondary" size={24} />
              {pdfFile ? (
                <p className="text-sm text-university-text">
                  {pdfFile.name}
                </p>
              ) : (
                <>
                  <p className="text-sm text-university-textSecondary">
                    Выберите PDF документ
                  </p>
                  <p className="text-xs text-university-textSecondary/70 mt-1">
                    (PDF)
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handlePdfSelect}
            />
          </label>
        </div>
        
        <div className="flex justify-end">
          <button onClick={handlePdfUpload} className="btn-primary flex items-center gap-2">
            <Upload size={16} />
            <span>Загрузить</span>
          </button>
        </div>
      </div>
      
      {/* User Management Section */}
      <div className="glass-card p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Управление ролями</h2>
        <p className="text-university-textSecondary mb-6">
          Управление ролями пользователей в системе
        </p>
        
        <div className="flex justify-end mb-4">
          <div className="relative w-64">
            <input
              type="text"
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              placeholder="Поиск по email..."
              className="w-full bg-muted border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-university-textSecondary" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-3 px-4 text-left">Имя</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Роль</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleRoleChange(user.id, 'reader')}
                        className={`flex items-center justify-center px-3 py-1 rounded-md ${
                          user.role === 'reader' 
                            ? 'bg-university-blue text-white' 
                            : 'bg-muted text-university-textSecondary'
                        }`}
                      >
                        {user.role === 'reader' && <Check size={14} className="mr-1" />}
                        Reader
                      </button>
                      
                      <button
                        onClick={() => handleRoleChange(user.id, 'manager')}
                        className={`flex items-center justify-center px-3 py-1 rounded-md ${
                          user.role === 'manager' 
                            ? 'bg-university-mint text-white' 
                            : 'bg-muted text-university-textSecondary'
                        }`}
                      >
                        {user.role === 'manager' && <Check size={14} className="mr-1" />}
                        Manager
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
