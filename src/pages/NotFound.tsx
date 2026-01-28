
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <span className="text-8xl font-black text-slate-200 select-none mb-4">404</span>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Oops, página no encontrada</h1>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        Parece que el recurso que buscas no existe o ha sido movido a otro lugar.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
      >
        <Home className="w-5 h-5" />
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
