import React from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon, ArrowRight, Tag } from "lucide-react";
import { Document, Page } from "react-pdf";
import { DataItem } from "../types";

interface CardItemProps {
  item: DataItem;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const isPdf = item.type === "pdf";

  // ✅ URL robusta para Vite + GitHub Pages + espacios en nombres
  const fileUrl = `${import.meta.env.BASE_URL}data/${encodeURIComponent(
    item.filename
  )}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Preview */}
      <div className="h-32 w-full flex items-center justify-center overflow-hidden bg-white">
        {isPdf ? (
          <Document
            file={{ url: fileUrl }}
            loading={
              <div className="text-xs text-slate-400">Cargando…</div>
            }
            error={
              <div className="text-xs text-red-600">
                No se pudo cargar
              </div>
            }
            onLoadError={(e) =>
              console.error("PDF load error:", e, "URL:", fileUrl)
            }
          >
            <Page
              pageNumber={1}
              width={240}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        ) : (
          <ImageIcon className="w-12 h-12 text-blue-500 opacity-80 group-hover:scale-110 transition-transform" />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
              isPdf
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.type}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {item.id}
          </span>
        </div>

        <h3
          className="font-bold text-slate-800 text-lg mb-1 line-clamp-1"
          title={item.title}
        >
          {item.title}
        </h3>

        <p className="text-xs text-slate-500 mb-4 font-mono truncate">
          {item.filename}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
              >
                <Tag className="w-2 h-2" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <Link
            to={`/item/${item.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-colors group/btn"
          >
            Ver Archivo
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
