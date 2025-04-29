
import React, { useState } from 'react';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

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

const regionOptions = [
  { value: 'all', label: 'Все регионы' },
  { value: 'central', label: 'Центральный' },
  { value: 'northwest', label: 'Северо-Западный' },
  { value: 'south', label: 'Южный' },
];

type ChartBuilderProps = {
  title?: string;
};

const ChartBuilder: React.FC<ChartBuilderProps> = ({ title }) => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [metricA, setMetricA] = useState(metricOptions[0].value);
  const [metricB, setMetricB] = useState(metricOptions[1].value);
  const [region, setRegion] = useState(regionOptions[0].value);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2018, 0, 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2023, 11, 31));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleApply = () => {
    // In a real application, this would fetch data based on the selected filters
    console.log('Applying filters:', { chartType, metricA, metricB, region, startDate, endDate });
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      
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
            <label className="block text-sm mb-1">Метрика A</label>
            <select
              value={metricA}
              onChange={(e) => setMetricA(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            >
              {metricOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Метрика B</label>
            <select
              value={metricB}
              onChange={(e) => setMetricB(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            >
              {metricOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Регион</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2"
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Временной период</label>
            <div className="relative">
              <button 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full bg-muted border border-border rounded-md px-3 py-2 flex items-center justify-between"
              >
                <span>
                  {startDate && endDate
                    ? `${format(startDate, 'dd.MM.yyyy')} - ${format(endDate, 'dd.MM.yyyy')}`
                    : 'Выберите период'}
                </span>
                <Calendar size={16} />
              </button>
              
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-1 p-4 glass-card z-10">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Начало</label>
                      <input
                        type="date"
                        value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                        className="w-full bg-muted border border-border rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Конец</label>
                      <input
                        type="date"
                        value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                        className="w-full bg-muted border border-border rounded-md px-3 py-2"
                      />
                    </div>
                    <button 
                      onClick={() => setShowDatePicker(false)}
                      className="btn-primary"
                    >
                      Готово
                    </button>
                  </div>
                </div>
              )}
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
              <Bar dataKey="metricA" name="Метрика A" fill="#2196F3" />
              <Bar dataKey="metricB" name="Метрика B" fill="#4CAF50" />
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
              <Line type="monotone" dataKey="metricA" name="Метрика A" stroke="#2196F3" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="metricB" name="Метрика B" stroke="#4CAF50" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartBuilder;
