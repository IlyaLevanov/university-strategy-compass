
import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { universitiesData } from '../data/mockData';

// Example data
const dummyData = [
  { name: '2018', metricA: 4000, metricB: 2400 },
  { name: '2019', metricA: 3000, metricB: 1398 },
  { name: '2020', metricA: 2000, metricB: 9800 },
  { name: '2021', metricA: 2780, metricB: 3908 },
  { name: '2022', metricA: 1890, metricB: 4800 },
  { name: '2023', metricA: 2390, metricB: 3800 },
];

const metricOptions = [
  { value: 'students', label: 'Количество студентов' },
  { value: 'publications', label: 'Научные публикации' },
  { value: 'funds', label: 'Объем финансирования' },
  { value: 'score', label: 'Рейтинговый балл' },
];

const yearOptions = [
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
];

type ChartBuilderProps = {
  title?: string;
};

const ChartBuilder: React.FC<ChartBuilderProps> = ({ title }) => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [startYear, setStartYear] = useState('2018');
  const [endYear, setEndYear] = useState('2023');
  
  // University A state
  const [universityASearchQuery, setUniversityASearchQuery] = useState('');
  const [selectedUniversityA, setSelectedUniversityA] = useState('');
  const [openUniversityA, setOpenUniversityA] = useState(false);
  const [filteredUniversitiesA, setFilteredUniversitiesA] = useState(universitiesData);
  
  // University B state
  const [universityBSearchQuery, setUniversityBSearchQuery] = useState('');
  const [selectedUniversityB, setSelectedUniversityB] = useState('');
  const [openUniversityB, setOpenUniversityB] = useState(false);
  const [filteredUniversitiesB, setFilteredUniversitiesB] = useState(universitiesData);
  
  // Metric state
  const [metricSearchQuery, setMetricSearchQuery] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('students');
  const [openMetric, setOpenMetric] = useState(false);
  const [filteredMetrics, setFilteredMetrics] = useState(metricOptions);
  
  // Filter universities for University A based on search query
  useEffect(() => {
    if (universityASearchQuery.trim() === '') {
      setFilteredUniversitiesA(universitiesData);
    } else {
      const filtered = universitiesData.filter(university => 
        university.name.toLowerCase().includes(universityASearchQuery.toLowerCase())
      );
      setFilteredUniversitiesA(filtered);
    }
  }, [universityASearchQuery]);
  
  // Filter universities for University B based on search query
  useEffect(() => {
    if (universityBSearchQuery.trim() === '') {
      setFilteredUniversitiesB(universitiesData);
    } else {
      const filtered = universitiesData.filter(university => 
        university.name.toLowerCase().includes(universityBSearchQuery.toLowerCase())
      );
      setFilteredUniversitiesB(filtered);
    }
  }, [universityBSearchQuery]);
  
  // Filter metrics based on search query
  useEffect(() => {
    if (metricSearchQuery.trim() === '') {
      setFilteredMetrics(metricOptions);
    } else {
      const filtered = metricOptions.filter(metric => 
        metric.label.toLowerCase().includes(metricSearchQuery.toLowerCase())
      );
      setFilteredMetrics(filtered);
    }
  }, [metricSearchQuery]);
  
  // Handle university A selection
  const handleUniversityASelect = (universityId: string) => {
    setSelectedUniversityA(universityId);
    const selected = universitiesData.find(uni => uni.id.toString() === universityId);
    if (selected) {
      setUniversityASearchQuery(selected.name);
    }
    setOpenUniversityA(false);
  };
  
  // Handle university B selection
  const handleUniversityBSelect = (universityId: string) => {
    setSelectedUniversityB(universityId);
    const selected = universitiesData.find(uni => uni.id.toString() === universityId);
    if (selected) {
      setUniversityBSearchQuery(selected.name);
    }
    setOpenUniversityB(false);
  };
  
  // Handle metric selection
  const handleMetricSelect = (metricValue: string) => {
    setSelectedMetric(metricValue);
    const selected = metricOptions.find(metric => metric.value === metricValue);
    if (selected) {
      setMetricSearchQuery(selected.label);
    }
    setOpenMetric(false);
  };

  const handleApply = () => {
    // In a real application, this would fetch data based on the selected filters
    console.log('Applying filters:', { 
      chartType, 
      universityA: selectedUniversityA, 
      universityB: selectedUniversityB,
      metric: selectedMetric,
      startYear,
      endYear
    });
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      {title ? <h2 className="text-xl font-semibold mb-4">{title}</h2> : <h2 className="text-xl font-semibold mb-4">Сравнение университетов</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${chartType === 'bar' ? 'bg-university-blue text-white' : 'bg-muted text-university-textSecondary'}`}
              onClick={() => setChartType('bar')}
            >
              Столбчатый
            </button>
            <button
              className={`px-4 py-2 rounded-md ${chartType === 'line' ? 'bg-university-blue text-white' : 'bg-muted text-university-textSecondary'}`}
              onClick={() => setChartType('line')}
            >
              Линейный
            </button>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Университет A</label>
            <Popover open={openUniversityA} onOpenChange={setOpenUniversityA}>
              <PopoverTrigger asChild>
                <div className="relative flex items-center w-full">
                  <Input
                    type="text"
                    placeholder="Выберите или начните вводить..."
                    value={universityASearchQuery}
                    onChange={(e) => setUniversityASearchQuery(e.target.value)}
                    className="w-full pr-8"
                  />
                  <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandEmpty>Университетов не найдено</CommandEmpty>
                    <CommandGroup>
                      {filteredUniversitiesA.map((university) => (
                        <CommandItem
                          key={university.id}
                          value={university.name}
                          onSelect={() => handleUniversityASelect(university.id.toString())}
                          className="flex items-center justify-between"
                        >
                          <div>{university.name}</div>
                          {selectedUniversityA === university.id.toString() && (
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
            <label className="block text-sm mb-1">Университет B</label>
            <Popover open={openUniversityB} onOpenChange={setOpenUniversityB}>
              <PopoverTrigger asChild>
                <div className="relative flex items-center w-full">
                  <Input
                    type="text"
                    placeholder="Выберите или начните вводить..."
                    value={universityBSearchQuery}
                    onChange={(e) => setUniversityBSearchQuery(e.target.value)}
                    className="w-full pr-8"
                  />
                  <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandEmpty>Университетов не найдено</CommandEmpty>
                    <CommandGroup>
                      {filteredUniversitiesB.map((university) => (
                        <CommandItem
                          key={university.id}
                          value={university.name}
                          onSelect={() => handleUniversityBSelect(university.id.toString())}
                          className="flex items-center justify-between"
                        >
                          <div>{university.name}</div>
                          {selectedUniversityB === university.id.toString() && (
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
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Метрика</label>
            <Popover open={openMetric} onOpenChange={setOpenMetric}>
              <PopoverTrigger asChild>
                <div className="relative flex items-center w-full">
                  <Input
                    type="text"
                    placeholder="Выберите или начните вводить..."
                    value={metricSearchQuery}
                    onChange={(e) => setMetricSearchQuery(e.target.value)}
                    className="w-full pr-8"
                  />
                  <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandEmpty>Метрик не найдено</CommandEmpty>
                    <CommandGroup>
                      {filteredMetrics.map((metric) => (
                        <CommandItem
                          key={metric.value}
                          value={metric.label}
                          onSelect={() => handleMetricSelect(metric.value)}
                          className="flex items-center justify-between"
                        >
                          <div>{metric.label}</div>
                          {selectedMetric === metric.value && (
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
            <label className="block text-sm mb-1">Временной период</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-university-textSecondary mb-1">От</label>
                <Select value={startYear} onValueChange={setStartYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={`start-${year.value}`} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs text-university-textSecondary mb-1">До</label>
                <Select value={endYear} onValueChange={setEndYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={`end-${year.value}`} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <button onClick={handleApply} className="btn-accent w-full">
            Применить
          </button>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#B0BEC5" />
              <YAxis stroke="#B0BEC5" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1B2A47', 
                  borderColor: '#374151',
                  color: '#ECEFF1'
                }} 
              />
              <Legend />
              <Bar dataKey="metricA" name="Университет A" fill="#2196F3" />
              <Bar dataKey="metricB" name="Университет B" fill="#4CAF50" />
            </BarChart>
          ) : (
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#B0BEC5" />
              <YAxis stroke="#B0BEC5" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1B2A47', 
                  borderColor: '#374151',
                  color: '#ECEFF1'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="metricA" name="Университет A" stroke="#2196F3" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="metricB" name="Университет B" stroke="#4CAF50" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartBuilder;
