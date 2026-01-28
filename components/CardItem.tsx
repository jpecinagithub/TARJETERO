
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image as ImageIcon, ArrowRight, Tag } from 'lucide-react';
import { DataItem } from '../types';

interface CardItemProps {
  item: DataItem;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const isPdf = item.type === 'pdf';
  const fileUrl = `./data/${item.filename}`;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Thumbnail Area */}
      <div className="h-48 overflow-hidden relative bg-slate-100 flex items-center justify-center border-b border-slate-100">
        {!isPdf && !imageError ? (
          <img 
            src={fileUrl} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br p-6 ${isPdf ? 'from-red-50 to-red-100' : 'from-blue-50 to-blue-100'}`}>
            <div className="relative w-24 h-32 bg-white rounded-sm shadow-md border border-slate-200 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-6 h-6 bg-slate-100 border-b border-l border-slate-200 rounded-bl-sm"></div>
              {isPdf ? (
                <FileText className="w-10 h-10 text-red-500 mb-2" />
              ) : (
                <ImageIcon className="w-10 h-10 text-blue-500 mb-2" />
              )}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${isPdf ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'}`}>
                {item.type}
              </span>
              
              {/* Fake lines to simulate a document */}
              <div className="mt-2 w-12 h-1 bg-slate-100 rounded-full"></div>
              <div className="mt-1 w-8 h-1 bg-slate-100 rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Format Badge Overlay */}
        <div className="absolute top-3 left-3">
          <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-1 rounded-lg shadow-sm backdrop-blur-md ${
            isPdf ? 'bg-red-500/90 text-white' : 'bg-blue-500/90 text-white'
          }`}>
            {item.type}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-mono">{item.id}</span>
          <div className="flex gap-1">
             {item.tags?.slice(0, 1).map(tag => (
               <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                 {tag}
               </span>
             ))}
          </div>
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1" title={item.title}>
          {item.title}
        </h3>
        
        <p className="text-xs text-slate-500 mb-4 font-mono truncate italic">
          {item.filename}
        </p>

        <div className="mt-auto">
          <Link 
            to={`/item/${item.id}`}
            className={`w-full inline-flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl font-medium transition-all group/btn shadow-sm ${
              isPdf ? 'bg-slate-900 hover:bg-red-600' : 'bg-slate-900 hover:bg-blue-600'
            }`}
          >
            Abrir Documento
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
