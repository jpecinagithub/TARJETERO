
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Tag, Download } from 'lucide-react';
import { DataItem } from '../types';
import ViewerPdf from '../components/ViewerPdf';
import ViewerImage from '../components/ViewerImage';

interface DetailProps {
  items: DataItem[];
}

const Detail: React.FC<DetailProps> = ({ items }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = items.find((i) => i.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Archivo no encontrado</h2>
        <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const fileUrl = `./data/${item.filename}`;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver atrás
        </button>
        
        <a
          href={fileUrl}
          download={item.filename}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-all font-medium"
        >
          <Download className="w-4 h-4" />
          Descargar original
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          {item.type === 'pdf' ? (
            <ViewerPdf url={fileUrl} title={item.title} />
          ) : (
            <ViewerImage url={fileUrl} title={item.title} />
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Formato</p>
                  <p className="text-sm font-medium uppercase">{item.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Archivo</p>
                  <p className="text-sm font-mono truncate">{item.filename}</p>
                </div>
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Categorías</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.description && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Descripción</p>
                <p className="text-slate-600 leading-relaxed italic text-sm">
                  "{item.description}"
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
            <h4 className="font-bold mb-2">¿Sabías que...?</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              Esta aplicación está diseñada para funcionar sin conexión una vez que se han cargado los documentos. 
              Puedes añadirla a tu pantalla de inicio como una App nativa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
