
import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CardGrid from '../components/CardGrid';
import { DataItem, ItemType } from '../types';
import { RefreshCcw, FileSearch } from 'lucide-react';

interface HomeProps {
  items: DataItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const Home: React.FC<HomeProps> = ({ items, loading, error, onRetry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<ItemType | 'all'>('all');

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesSearch = 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.filename.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = activeType === 'all' || item.type === activeType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [items, searchTerm, activeType]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-3xl border border-red-100 p-8 text-center max-w-2xl mx-auto">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <FileSearch className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Error de Carga</h2>
        <p className="text-slate-600 mb-8">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
        >
          <RefreshCcw className="w-5 h-5" />
          Reintentar Carga
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Catálogo de Documentos
        </h1>
        <p className="text-slate-500 text-lg">
          Explora y visualiza archivos locales PDF e imágenes. Disponible offline.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-20 z-40">
        <div className="w-full md:max-w-md">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <FilterBar activeType={activeType} onTypeChange={setActiveType} />
      </div>

      <CardGrid items={filteredItems} />
    </div>
  );
};

export default Home;
