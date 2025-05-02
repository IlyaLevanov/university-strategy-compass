
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Upload, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { universitiesData } from '../../data/mockData';

const PdfUploadSection: React.FC = () => {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [universitySearchQuery, setUniversitySearchQuery] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(universitiesData);
  const [open, setOpen] = useState(false);
  const [documentTags, setDocumentTags] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
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
  
  // Handle university selection
  const handleUniversitySelect = (universityId: string) => {
    setSelectedUniversity(universityId);
    const selected = universitiesData.find(uni => uni.id.toString() === universityId);
    if (selected) {
      setUniversitySearchQuery(selected.name);
    }
    setOpen(false);
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

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Загрузка PDF</h2>
      <p className="text-university-textSecondary mb-6">
        Загрузите PDF документы для университетов
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm mb-2">Университет</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                role="combobox"
                aria-expanded={open}
                className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {universitySearchQuery || "Поиск или выбор университета"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Поиск университета..." 
                  value={universitySearchQuery}
                  onValueChange={setUniversitySearchQuery}
                  autoFocus={true}
                />
                <CommandList>
                  <CommandEmpty>Университетов не найдено</CommandEmpty>
                  <CommandGroup>
                    {filteredUniversities.map((university) => (
                      <CommandItem
                        key={university.id}
                        value={university.name}
                        onSelect={() => handleUniversitySelect(university.id.toString())}
                        className="flex items-center justify-between"
                      >
                        <div>{university.name}</div>
                        {selectedUniversity === university.id.toString() && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="block text-sm mb-2">Теги (через запятую)</label>
          <input
            type="text"
            placeholder="стратегия, отчет, план"
            value={documentTags}
            onChange={(e) => setDocumentTags(e.target.value)}
            className="w-full bg-muted border border-input rounded-md px-3 py-2"
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
  );
};

export default PdfUploadSection;
