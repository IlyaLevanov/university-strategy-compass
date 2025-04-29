
import React from 'react';
import { useParams } from 'react-router-dom';
import SupersetDashboard from '../components/SupersetDashboard';
import ChartBuilder from '../components/ChartBuilder';
import DocumentCarousel from '../components/DocumentCarousel';

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

const UniversityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
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
      
      <ChartBuilder title="Построитель графиков университета" />
    </div>
  );
};

export default UniversityPage;
