
import React from 'react';

interface ViewerImageProps {
  url: string;
  title: string;
}

const ViewerImage: React.FC<ViewerImageProps> = ({ url, title }) => {
  return (
    <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px]">
      <img
        src={url}
        alt={title}
        className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-sm transition-all duration-500 hover:scale-[1.02]"
      />
    </div>
  );
};

export default ViewerImage;
