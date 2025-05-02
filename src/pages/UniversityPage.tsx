import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import SupersetDashboard from '../components/SupersetDashboard';
import DocumentCarousel from '../components/DocumentCarousel';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';

// Example university data
const universityData = {
  id: 1,
  name: 'Московский государственный университет имени М.В. Ломоносова',
  shortName: 'МГУ',
  region: 'Центральный',
  city: 'Москва',
  foundedYear: 1755,
  studentsCount: 38200,
  facultiesCount: 41,
  programsCount: 128,
  employmentRate: 92,
  internationalRating: 78,
  website: 'https://www.msu.ru'
};

// Example metrics data
const metricOptions = [
  { value: 'students', label: 'Количество студентов' },
  { value: 'publications', label: 'Научные публикации' },
  { value: 'funds', label: 'Объем финансирования' },
  { value: 'score', label: 'Рейтинговый балл' },
  { value: 'employmentRate', label: 'Трудоустройство' },
  { value: 'citations', label: 'Цитирования' },
];

// Example correlation data
const correlationData = [
  { x: 10, y: 40 },
  { x: 20, y: 35 },
  { x: 30, y: 45 },
  { x: 40, y: 60 },
  { x: 50, y: 75 },
  { x: 60, y: 65 },
  { x: 70, y: 85 },
];

const UniversityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  
  // Metric X state
  const [metricXSearchQuery, setMetricXSearchQuery] = useState('');
  const [metricX, setMetricX] = useState('');
  const [openMetricX, setOpenMetricX] = useState(false);
  const [filteredMetricsX, setFilteredMetricsX] = useState(metricOptions);
  
  // Metric Y state
  const [metricYSearchQuery, setMetricYSearchQuery] = useState('');
  const [metricY, setMetricY] = useState('');
  const [openMetricY, setOpenMetricY] = useState(false);
  const [filteredMetricsY, setFilteredMetricsY] = useState(metricOptions);
  
  // Filter metrics X based on search query
  useEffect(() => {
    if (metricXSearchQuery.trim() === '') {
      setFilteredMetricsX(metricOptions);
    } else {
      const filtered = metricOptions.filter(metric => 
        metric.label.toLowerCase().includes(metricXSearchQuery.toLowerCase())
      );
      setFilteredMetricsX(filtered);
    }
  }, [metricXSearchQuery]);
  
  // Filter metrics Y based on search query
  useEffect(() => {
    if (metricYSearchQuery.trim() === '') {
      setFilteredMetricsY(metricOptions);
    } else {
      const filtered = metricOptions.filter(metric => 
        metric.label.toLowerCase().includes(metricYSearchQuery.toLowerCase())
      );
      setFilteredMetricsY(filtered);
    }
  }, [metricYSearchQuery]);
  
  // Handle metric X selection
  const handleMetricXSelect = (metricValue: string) => {
    setMetricX(metricValue);
    const selected = metricOptions.find(metric => metric.value === metricValue);
    if (selected) {
      setMetricXSearchQuery(selected.label);
    }
    setOpenMetricX(false);
  };
  
  // Handle metric Y selection
  const handleMetricYSelect = (metricValue: string) => {
    setMetricY(metricValue);
    const selected = metricOptions.find(metric => metric.value === metricValue);
    if (selected) {
      setMetricYSearchQuery(selected.label);
    }
    setOpenMetricY(false);
  };
  
  // In a real application, this would fetch university data based on the ID
  // For this prototype, we'll just use the example data
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-2">{universityData.name}</h1>
      <p className="text-university-textSecondary mb-8">ID: {id || '1'}</p>
      
      <div className="glass-card p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Информация об университете</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
          <div>
            <p className="text-university-textSecondary">Короткое название</p>
            <p className="text-university-text font-medium">{universityData.shortName}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Регион</p>
            <p className="text-university-text font-medium">{universityData.region}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Город</p>
            <p className="text-university-text font-medium">{universityData.city}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Год основания</p>
            <p className="text-university-text font-medium">{universityData.foundedYear}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Количество студентов</p>
            <p className="text-university-text font-medium">{universityData.studentsCount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Количество факультетов</p>
            <p className="text-university-text font-medium">{universityData.facultiesCount}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Образовательные программы</p>
            <p className="text-university-text font-medium">{universityData.programsCount}</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Трудоустройство выпускников</p>
            <p className="text-university-text font-medium">{universityData.employmentRate}%</p>
          </div>
          <div>
            <p className="text-university-textSecondary">Международный рейтинг</p>
            <p className="text-university-text font-medium">Топ-{universityData.internationalRating}</p>
          </div>
          <div className="lg:col-span-3">
            <p className="text-university-textSecondary">Веб-сайт</p>
            <a 
              href={universityData.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-university-blue hover:underline"
            >
              {universityData.website}
            </a>
          </div>
        </div>
      </div>
      
      <DocumentCarousel />
      
      <SupersetDashboard title="Дашборд Superset университета" />
      
      <div className="glass-card p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Создать график университета</h2>
        
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
              <label className="block text-sm mb-1">Метрика X</label>
              <Popover open={openMetricX} onOpenChange={setOpenMetricX}>
                <PopoverTrigger asChild>
                  <div 
                    className="relative flex items-center w-full cursor-pointer"
                    onClick={() => !openMetricX && setOpenMetricX(true)}
                  >
                    <Input
                      type="text"
                      placeholder="Выберите или начните вводить..."
                      value={metricXSearchQuery}
                      onChange={(e) => {
                        setMetricXSearchQuery(e.target.value);
                        !openMetricX && setOpenMetricX(true);
                      }}
                      className="w-full pr-8"
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setOpenMetricX(false);
                        }
                      }}
                    />
                    <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                  <Command>
                    <CommandList>
                      <CommandEmpty>Метрик не найдено</CommandEmpty>
                      <CommandGroup>
                        {filteredMetricsX.map((metric) => (
                          <CommandItem
                            key={`x-${metric.value}`}
                            value={metric.label}
                            onSelect={() => handleMetricXSelect(metric.value)}
                            className="flex items-center justify-between"
                          >
                            <div>{metric.label}</div>
                            {metricX === metric.value && (
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
              <label className="block text-sm mb-1">Метрика Y</label>
              <Popover open={openMetricY} onOpenChange={setOpenMetricY}>
                <PopoverTrigger asChild>
                  <div 
                    className="relative flex items-center w-full cursor-pointer"
                    onClick={() => !openMetricY && setOpenMetricY(true)}
                  >
                    <Input
                      type="text"
                      placeholder="Выберите или начните вводить..."
                      value={metricYSearchQuery}
                      onChange={(e) => {
                        setMetricYSearchQuery(e.target.value);
                        !openMetricY && setOpenMetricY(true);
                      }}
                      className="w-full pr-8"
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setOpenMetricY(false);
                        }
                      }}
                    />
                    <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
                  <Command>
                    <CommandList>
                      <CommandEmpty>Метрик не найдено</CommandEmpty>
                      <CommandGroup>
                        {filteredMetricsY.map((metric) => (
                          <CommandItem
                            key={`y-${metric.value}`}
                            value={metric.label}
                            onSelect={() => handleMetricYSelect(metric.value)}
                            className="flex items-center justify-between"
                          >
                            <div>{metric.label}</div>
                            {metricY === metric.value && (
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
            
            <button 
              className="btn-accent w-full"
              onClick={() => console.log('Building graph for', { metricX, metricY })}
            >
              Построить график
            </button>
          </div>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart
                data={correlationData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  stroke="#B0BEC5"
                  label={{ value: metricOptions.find(m => m.value === metricX)?.label || '', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  stroke="#B0BEC5" 
                  label={{ value: metricOptions.find(m => m.value === metricY)?.label || '', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1B2A47', 
                    borderColor: '#374151',
                    color: '#ECEFF1'
                  }}
                  formatter={(value, name) => {
                    if (name === 'y') return [value, metricOptions.find(m => m.value === metricY)?.label];
                    return [value, metricOptions.find(m => m.value === metricX)?.label];
                  }}
                />
                <Legend />
                <Bar dataKey="y" name={metricOptions.find(m => m.value === metricY)?.label || ''} fill="#2196F3" />
              </BarChart>
            ) : (
              <LineChart
                data={correlationData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  stroke="#B0BEC5"
                  label={{ value: metricOptions.find(m => m.value === metricX)?.label || '', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  stroke="#B0BEC5" 
                  label={{ value: metricOptions.find(m => m.value === metricY)?.label || '', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1B2A47', 
                    borderColor: '#374151',
                    color: '#ECEFF1'
                  }}
                  formatter={(value, name) => {
                    if (name === 'y') return [value, metricOptions.find(m => m.value === metricY)?.label];
                    return [value, metricOptions.find(m => m.value === metricX)?.label];
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="y"
                  name={metricOptions.find(m => m.value === metricY)?.label || ''}
                  stroke="#2196F3"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
