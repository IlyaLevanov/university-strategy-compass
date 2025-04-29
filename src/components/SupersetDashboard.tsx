
import React from 'react';

type SupersetDashboardProps = {
  title?: string;
};

const SupersetDashboard: React.FC<SupersetDashboardProps> = ({ title }) => {
  return (
    <div className="glass-card p-6 animate-fade-in">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      
      <div className="aspect-video w-full bg-muted/50 rounded-md flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">Дашборд Superset</h3>
          <p className="text-sm text-university-textSecondary mb-4">
            В реальном приложении здесь будет встроенный iframe с дашбордом Superset
          </p>
          <div className="h-[300px] border border-dashed border-border/50 rounded flex items-center justify-center">
            <p className="text-university-textSecondary">iframe src="https://superset-dashboard.example"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupersetDashboard;
