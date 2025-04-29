
import React from 'react';
import { Download } from 'lucide-react';

// Example data
const rankingData = [
  { id: 1, rank: 1, name: 'Московский государственный университет', score: 98.5 },
  { id: 2, rank: 2, name: 'Санкт-Петербургский государственный университет', score: 96.2 },
  { id: 3, rank: 3, name: 'МГТУ им. Н.Э. Баумана', score: 94.8 },
  { id: 4, rank: 4, name: 'Московский физико-технический институт', score: 93.7 },
  { id: 5, rank: 5, name: 'Высшая школа экономики', score: 92.3 },
  { id: 6, rank: 6, name: 'Новосибирский государственный университет', score: 91.1 },
  { id: 7, rank: 7, name: 'Томский политехнический университет', score: 89.9 },
  { id: 8, rank: 8, name: 'Казанский федеральный университет', score: 88.5 },
  { id: 9, rank: 9, name: 'Уральский федеральный университет', score: 87.6 },
  { id: 10, rank: 10, name: 'ИТМО', score: 86.3 },
];

const UniversityRankingTable = () => {
  const handleDownload = () => {
    // In a real application, this would generate and download an XLS file
    console.log('Downloading XLS');
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Рейтинг университетов</h2>
        <button 
          onClick={handleDownload} 
          className="btn-primary flex items-center gap-2"
        >
          <Download size={16} />
          <span>Скачать XLS</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-3 px-4 text-left">Место</th>
              <th className="py-3 px-4 text-left">Название</th>
              <th className="py-3 px-4 text-right">Баллы</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((university) => (
              <tr 
                key={university.id} 
                className="border-b border-border/50 hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4">{university.rank}</td>
                <td className="py-3 px-4">{university.name}</td>
                <td className="py-3 px-4 text-right font-semibold">{university.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityRankingTable;
