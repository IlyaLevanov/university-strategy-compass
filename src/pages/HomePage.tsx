
import React from 'react';
import UniversityRankingTable from '../components/UniversityRankingTable';
import SupersetDashboard from '../components/SupersetDashboard';
import ChartBuilder from '../components/ChartBuilder';

type HomePageProps = {
  userRole: 'reader' | 'manager';
};

const HomePage: React.FC<HomePageProps> = ({ userRole }) => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Управление стратегией развития университета</h1>
        <p className="text-university-textSecondary">
          Информационно-аналитическая система | Роль: <span className="capitalize">{userRole}</span>
        </p>
      </div>
      
      <UniversityRankingTable />
      
      <SupersetDashboard title="Дашборд Superset" />
      
      <ChartBuilder title="Построитель графиков" />
    </div>
  );
};

export default HomePage;
