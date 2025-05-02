import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchableDropdown } from "@/components/ui/searchable-dropdown";
import { Input } from '@/components/ui/input';

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

// Convert array strings to option objects
const regionOptions = regions.map(region => ({ value: region, label: region }));
const directionOptions = directions.map(direction => ({ value: direction, label: direction }));
const accreditationOptions = accreditations.map(accreditation => ({ value: accreditation, label: accreditation }));

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Region state
  const [regionSearchQuery, setRegionSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  
  // Direction state
  const [directionSearchQuery, setDirectionSearchQuery] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  
  // Accreditation state
  const [accreditationSearchQuery, setAccreditationSearchQuery] = useState('');
  const [selectedAccreditation, setSelectedAccreditation] = useState('');
  
  const navigate = useNavigate();

  // Filter universities based on search query and filters
  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === '' || selectedRegion === 'Все регионы' || university.region === selectedRegion;
    const matchesDirection = selectedDirection === '' || selectedDirection === 'Все направления' || university.direction === selectedDirection;
    const matchesAccreditation = selectedAccreditation === '' || selectedAccreditation === 'Все' || university.accreditation === selectedAccreditation;
    
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
            <SearchableDropdown
              options={regionOptions}
              value={selectedRegion}
              onValueChange={setSelectedRegion}
              searchQuery={regionSearchQuery}
              onSearchQueryChange={setRegionSearchQuery}
              emptyMessage="Регионов не найдено"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Направление</label>
            <SearchableDropdown
              options={directionOptions}
              value={selectedDirection}
              onValueChange={setSelectedDirection}
              searchQuery={directionSearchQuery}
              onSearchQueryChange={setDirectionSearchQuery}
              emptyMessage="Направлений не найдено"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Аккредитация</label>
            <SearchableDropdown
              options={accreditationOptions}
              value={selectedAccreditation}
              onValueChange={setSelectedAccreditation}
              searchQuery={accreditationSearchQuery}
              onSearchQueryChange={setAccreditationSearchQuery}
              emptyMessage="Вариантов не найдено"
            />
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
