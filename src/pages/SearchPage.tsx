
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Example data
const universities = [
  { 
    id: 1, 
    name: 'Московский государственный университет', 
    city: 'Москва', 
    region: 'Центральный', 
    foundedYear: 1755,
    direction: 'Классический',
    accreditation: 'Государственная'
  },
  { 
    id: 2, 
    name: 'Санкт-Петербургский государственный университет', 
    city: 'Санкт-Петербург', 
    region: 'Северо-Западный', 
    foundedYear: 1724,
    direction: 'Классический',
    accreditation: 'Государственная'
  },
  { 
    id: 3, 
    name: 'МГТУ им. Н.Э. Баумана', 
    city: 'Москва', 
    region: 'Центральный', 
    foundedYear: 1830,
    direction: 'Технический',
    accreditation: 'Государственная'
  },
  { 
    id: 4, 
    name: 'Новосибирский государственный университет', 
    city: 'Новосибирск', 
    region: 'Сибирский', 
    foundedYear: 1958,
    direction: 'Классический',
    accreditation: 'Государственная'
  },
  { 
    id: 5, 
    name: 'Казанский федеральный университет', 
    city: 'Казань', 
    region: 'Приволжский', 
    foundedYear: 1804,
    direction: 'Классический',
    accreditation: 'Государственная'
  },
  { 
    id: 6, 
    name: 'Высшая школа экономики', 
    city: 'Москва', 
    region: 'Центральный', 
    foundedYear: 1992,
    direction: 'Экономический',
    accreditation: 'Государственная'
  },
  { 
    id: 7, 
    name: 'МИРБИС', 
    city: 'Москва', 
    region: 'Центральный', 
    foundedYear: 1988,
    direction: 'Экономический',
    accreditation: 'Частная'
  }
];

const regions = ['Все регионы', 'Центральный', 'Северо-Западный', 'Приволжский', 'Сибирский', 'Южный'];
const directions = ['Все направления', 'Классический', 'Технический', 'Экономический', 'Медицинский', 'Гуманитарный'];
const accreditations = ['Все', 'Государственная', 'Частная'];

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Все регионы');
  const [selectedDirection, setSelectedDirection] = useState('Все направления');
  const [selectedAccreditation, setSelectedAccreditation] = useState('Все');
  
  const navigate = useNavigate();

  // Filter universities based on search query and filters
  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'Все регионы' || university.region === selectedRegion;
    const matchesDirection = selectedDirection === 'Все направления' || university.direction === selectedDirection;
    const matchesAccreditation = selectedAccreditation === 'Все' || university.accreditation === selectedAccreditation;
    
    return matchesSearch && matchesRegion && matchesDirection && matchesAccreditation;
  });

  const handleViewUniversity = (id: number) => {
    navigate(`/university/${id}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">Поиск университетов</h1>
      
      <div className="glass-card p-6 animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={24} className="text-university-textSecondary" />
          </div>
          <input
            type="text"
            placeholder="Поиск университета по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-muted border border-border rounded-md text-lg focus:outline-none focus:ring-1 focus:ring-university-blue"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Регион</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Направление</label>
            <select
              value={selectedDirection}
              onChange={(e) => setSelectedDirection(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            >
              {directions.map((direction) => (
                <option key={direction} value={direction}>
                  {direction}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Аккредитация</label>
            <select
              value={selectedAccreditation}
              onChange={(e) => setSelectedAccreditation(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            >
              {accreditations.map((accreditation) => (
                <option key={accreditation} value={accreditation}>
                  {accreditation}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <p className="text-university-textSecondary mb-6">
          Найдено университетов: {filteredUniversities.length}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <div 
                key={university.id} 
                className="bg-muted/50 rounded-md p-4 border border-border/50"
              >
                <h3 className="text-university-text font-medium text-lg mb-2">{university.name}</h3>
                <p className="text-university-textSecondary mb-1">
                  {university.city}, {university.region}
                </p>
                <p className="text-university-textSecondary mb-3">
                  Год основания: {university.foundedYear}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-university-blue/20 text-university-blue text-xs px-2 py-1 rounded-full mr-2">
                      {university.direction}
                    </span>
                    <span className="bg-university-mint/20 text-university-mint text-xs px-2 py-1 rounded-full">
                      {university.accreditation}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleViewUniversity(university.id)} 
                    className="btn-primary text-sm"
                  >
                    Открыть
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-university-textSecondary">Университеты не найдены</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
