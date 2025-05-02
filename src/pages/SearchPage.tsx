import React, { useState, useEffect } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Region state
  const [regionSearchQuery, setRegionSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [openRegion, setOpenRegion] = useState(false);
  const [filteredRegions, setFilteredRegions] = useState(regions);
  
  // Direction state
  const [directionSearchQuery, setDirectionSearchQuery] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [openDirection, setOpenDirection] = useState(false);
  const [filteredDirections, setFilteredDirections] = useState(directions);
  
  // Accreditation state
  const [accreditationSearchQuery, setAccreditationSearchQuery] = useState('');
  const [selectedAccreditation, setSelectedAccreditation] = useState('');
  const [openAccreditation, setOpenAccreditation] = useState(false);
  const [filteredAccreditations, setFilteredAccreditations] = useState(accreditations);
  
  const navigate = useNavigate();

  // Filter regions based on search query
  useEffect(() => {
    if (regionSearchQuery.trim() === '') {
      setFilteredRegions(regions);
    } else {
      const filtered = regions.filter(region => 
        region.toLowerCase().includes(regionSearchQuery.toLowerCase())
      );
      setFilteredRegions(filtered);
    }
  }, [regionSearchQuery]);
  
  // Filter directions based on search query
  useEffect(() => {
    if (directionSearchQuery.trim() === '') {
      setFilteredDirections(directions);
    } else {
      const filtered = directions.filter(direction => 
        direction.toLowerCase().includes(directionSearchQuery.toLowerCase())
      );
      setFilteredDirections(filtered);
    }
  }, [directionSearchQuery]);
  
  // Filter accreditations based on search query
  useEffect(() => {
    if (accreditationSearchQuery.trim() === '') {
      setFilteredAccreditations(accreditations);
    } else {
      const filtered = accreditations.filter(accreditation => 
        accreditation.toLowerCase().includes(accreditationSearchQuery.toLowerCase())
      );
      setFilteredAccreditations(filtered);
    }
  }, [accreditationSearchQuery]);

  // Handle region selection
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setRegionSearchQuery(region);
    setOpenRegion(false);
  };
  
  // Handle direction selection
  const handleDirectionSelect = (direction: string) => {
    setSelectedDirection(direction);
    setDirectionSearchQuery(direction);
    setOpenDirection(false);
  };
  
  // Handle accreditation selection
  const handleAccreditationSelect = (accreditation: string) => {
    setSelectedAccreditation(accreditation);
    setAccreditationSearchQuery(accreditation);
    setOpenAccreditation(false);
  };

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
            <Popover open={openRegion} onOpenChange={setOpenRegion}>
              <PopoverTrigger asChild>
                <div 
                  className="relative flex items-center w-full cursor-pointer"
                  onClick={() => !openRegion && setOpenRegion(true)}
                >
                  <Input
                    type="text"
                    placeholder="Выберите или начните вводить..."
                    value={regionSearchQuery}
                    onChange={(e) => {
                      setRegionSearchQuery(e.target.value);
                      !openRegion && setOpenRegion(true);
                    }}
                    className="w-full pr-8"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setOpenRegion(false);
                      }
                    }}
                  />
                  <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandEmpty>Регионов не найдено</CommandEmpty>
                    <CommandGroup>
                      {filteredRegions.map((region) => (
                        <CommandItem
                          key={region}
                          value={region}
                          onSelect={() => handleRegionSelect(region)}
                          className="flex items-center justify-between"
                        >
                          <div>{region}</div>
                          {selectedRegion === region && (
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
            <label className="block text-sm mb-1">Направление</label>
            <Popover open={openDirection} onOpenChange={setOpenDirection}>
              <PopoverTrigger asChild>
                <div 
                  className="relative flex items-center w-full cursor-pointer"
                  onClick={() => !openDirection && setOpenDirection(true)}
                >
                  <Input
                    type="text"
                    placeholder="Выберите или начните вводить..."
                    value={directionSearchQuery}
                    onChange={(e) => {
                      setDirectionSearchQuery(e.target.value);
                      !openDirection && setOpenDirection(true);
                    }}
                    className="w-full pr-8"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setOpenDirection(false);
                      }
                    }}
                  />
                  <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandEmpty>Направлений не найдено</CommandEmpty>
                    <CommandGroup>
                      {filteredDirections.map((direction) => (
                        <CommandItem
                          key={direction}
                          value={direction}
                          onSelect={() => handleDirectionSelect(direction)}
                          className="flex items-center justify-between"
                        >
                          <div>{direction}</div>
                          {selectedDirection === direction && (
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
            <label className="block text-sm mb-1">Аккредитация</label>
            <Popover open={openAccreditation} onOpenChange={setOpenAccreditation}>
              <PopoverTrigger asChild>
                <div 
                  className="relative flex items-center w-full cursor-pointer"
                  onClick={() => !openAccreditation && setOpenAccreditation(true)}
                >
                  <Input
                    type="text"
                    placeholder="Выберите или начните вводить..."
                    value={accreditationSearchQuery}
                    onChange={(e) => {
                      setAccreditationSearchQuery(e.target.value);
                      !openAccreditation && setOpenAccreditation(true);
                    }}
                    className="w-full pr-8"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setOpenAccreditation(false);
                      }
                    }}
                  />
                  <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandEmpty>Вариантов не найдено</CommandEmpty>
                    <CommandGroup>
                      {filteredAccreditations.map((accreditation) => (
                        <CommandItem
                          key={accreditation}
                          value={accreditation}
                          onSelect={() => handleAccreditationSelect(accreditation)}
                          className="flex items-center justify-between"
                        >
                          <div>{accreditation}</div>
                          {selectedAccreditation === accreditation && (
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
