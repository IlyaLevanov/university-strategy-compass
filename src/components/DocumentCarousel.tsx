
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Search } from 'lucide-react';

// Example data
const documents = [
  { id: 1, title: 'Стратегия развития 2023-2030', tags: ['стратегия', 'развитие', 'план'] },
  { id: 2, title: 'Годовой отчет 2022', tags: ['отчет', 'финансы', '2022'] },
  { id: 3, title: 'Образовательная программа', tags: ['образование', 'программа', 'бакалавриат'] },
  { id: 4, title: 'Научные достижения', tags: ['наука', 'исследования', 'публикации'] },
  { id: 5, title: 'Международное сотрудничество', tags: ['международный', 'партнерство', 'обмен'] },
  { id: 6, title: 'Инфраструктура кампуса', tags: ['инфраструктура', 'кампус', 'строительство'] },
];

const DocumentCarousel = () => {
  const [searchTag, setSearchTag] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter documents based on search tag
  const filteredDocuments = searchTag
    ? documents.filter(doc => doc.tags.some(tag => tag.toLowerCase().includes(searchTag.toLowerCase())))
    : documents;

  const slidesCount = Math.ceil(filteredDocuments.length / 3);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  // Get current slide items
  const currentDocuments = filteredDocuments.slice(currentSlide * 3, (currentSlide + 1) * 3);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Документы</h2>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-university-textSecondary" />
        </div>
        <input
          type="text"
          placeholder="Поиск по тегам документов..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-university-blue"
        />
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="relative">
          <div className="flex space-x-4">
            {currentDocuments.map((doc) => (
              <div key={doc.id} className="flex-1 min-w-0 bg-muted/50 rounded-md p-4 border border-border/50">
                <div className="flex items-center mb-3">
                  <FileText size={20} className="text-university-blue mr-2" />
                  <h3 className="text-university-text font-medium truncate">{doc.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {doc.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-university-blue/20 text-university-blue text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-university-blue text-sm hover:underline">
                  Просмотреть PDF
                </button>
              </div>
            ))}
            {/* Fill empty slots if needed */}
            {currentDocuments.length < 3 && Array(3 - currentDocuments.length).fill(0).map((_, i) => (
              <div key={`empty-${i}`} className="flex-1 invisible"></div>
            ))}
          </div>
          
          {slidesCount > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button 
                onClick={prevSlide}
                className="p-1 rounded-full bg-muted hover:bg-muted-foreground/20"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: slidesCount }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full ${
                      i === currentSlide ? 'bg-university-blue' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-1 rounded-full bg-muted hover:bg-muted-foreground/20"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-university-textSecondary">Документов не найдено</p>
        </div>
      )}
    </div>
  );
};

export default DocumentCarousel;
