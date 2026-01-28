
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 hidden sm:inline">
            LocalDoc <span className="text-blue-600">Explorer</span>
          </span>
          <span className="font-bold text-xl tracking-tight text-slate-800 sm:hidden">
            LDE
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
