
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image as ImageIcon, ArrowRight, Tag } from 'lucide-react';
import { DataItem } from '../types';

interface ListItemProps {
  item: DataItem;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const isPdf = item.type === 'pdf';
  const fileUrl = `./data/${item.filename}`;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden">
      <div className="flex items-center p-3 sm:p-4 gap-4">
        {/* Small Thumbnail */}
        <div className="flex-shrink-0 w-12 h-16 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex flex-col items-center justify-center relative shadow-sm">
          {!isPdf && !imageError ? (
            <img src={fileUrl} alt="" className="w-full h-full object-cover" onError={() => setImageError(true)} />
          ) : (
            <>
              {isPdf ? (
                <FileText className="w-6 h-6 text-red-500" />
              ) : (
                <ImageIcon className="w-6 h-6 text-blue-500" />
              )}
              <span className={`text-[8px] font-black mt-1 uppercase ${isPdf ? 'text-red-600' : 'text-blue-600'}`}>
                {item.type}
              </span>
            </>
          )}
        </div>

        {/* Info Area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
             <h3 className="font-bold text-slate-800 text-base truncate" title={item.title}>
              {item.title}
            </h3>
            <span className={`text-[9px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded hidden sm:inline ${isPdf ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              {item.type}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-slate-400 font-mono truncate">
              {item.filename}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                    <Tag className="w-2 h-2" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Link 
            to={`/item/${item.id}`}
            className={`inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-medium transition-all group/btn ${
              isPdf ? 'bg-slate-50 text-slate-700 hover:bg-red-600 hover:text-white' : 'bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white'
            }`}
            title="Abrir documento"
          >
            <span className="hidden sm:inline">Abrir</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
