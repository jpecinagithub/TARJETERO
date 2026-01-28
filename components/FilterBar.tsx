
import React from 'react';
import { FileText, Image as ImageIcon, LayoutGrid } from 'lucide-react';
import { ItemType } from '../types';

interface FilterBarProps {
  activeType: ItemType | 'all';
  onTypeChange: (type: ItemType | 'all') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeType, onTypeChange }) => {
  const filters = [
    { id: 'all', label: 'Todos', icon: LayoutGrid },
    { id: 'pdf', label: 'PDFs', icon: FileText },
    { id: 'image', label: 'Imágenes', icon: ImageIcon },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeType === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => onTypeChange(filter.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'}
            `}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
