
import React from 'react';
import CardItem from './CardItem';
import ListItem from './ListItem';
import { DataItem } from '../types';

interface CardGridProps {
  items: DataItem[];
  viewMode?: 'grid' | 'list';
}

const CardGrid: React.FC<CardGridProps> = ({ items, viewMode = 'grid' }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">No se encontraron archivos</h3>
        <p className="text-slate-500 mt-2">Intenta ajustar tu búsqueda.</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-3 max-w-5xl mx-auto">
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CardGrid;
