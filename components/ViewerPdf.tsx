
import React from 'react';
import { ExternalLink, FileWarning } from 'lucide-react';

interface ViewerPdfProps {
  url: string;
  title: string;
}

const ViewerPdf: React.FC<ViewerPdfProps> = ({ url, title }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative min-h-[500px] md:h-[calc(100vh-300px)]">
        <object
          data={url}
          type="application/pdf"
          className="w-full h-full"
        >
          <iframe
            src={url}
            className="w-full h-full border-none"
            title={title}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <FileWarning className="w-16 h-16 text-slate-400 mb-4" />
              <h4 className="text-lg font-bold text-slate-700">No se pudo previsualizar</h4>
              <p className="text-slate-500 max-w-sm mx-auto mb-6">
                Tu navegador no soporta la visualización de PDFs embebidos.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Abrir en nueva pestaña
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </iframe>
        </object>
      </div>

      <div className="md:hidden">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-blue-200"
        >
          Abrir pantalla completa
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default ViewerPdf;
