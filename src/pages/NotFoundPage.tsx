
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="glass-card p-8 max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-university-textSecondary mb-6">
          Страница не найдена
        </p>
        <p className="text-university-textSecondary mb-8">
          Запрашиваемая страница не существует или была перемещена
        </p>
        <Link to="/" className="btn-primary inline-block">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
