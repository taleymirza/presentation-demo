import React from 'react';
import type { SlideData } from '../types';

const Slide: React.FC<SlideData> = ({ title, content, textColor, imageUrl }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 sm:p-16 text-center ${textColor}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
        <div className="text-lg md:text-2xl leading-relaxed mb-8">{content}</div>
        {imageUrl && (
          <div className="mt-8">
            <img 
              src={imageUrl} 
              alt={title} 
              className="rounded-lg shadow-2xl max-w-full h-auto mx-auto" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;