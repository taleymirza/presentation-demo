
import React from 'react';

interface SlideIndicatorProps {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  activeColor: string;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({ totalSlides, currentIndex, onDotClick, activeColor }) => {
  const dots = Array.from({ length: totalSlides });

  // A helper to get a contrasting color for the dot border
  const getBorderColor = (textColor: string) => {
    if (textColor.includes('slate-100') || textColor.includes('sky-100') || textColor.includes('emerald-100') || textColor.includes('gray-100')) {
        return 'border-white/50';
    }
    return 'border-black/50';
  }

  const borderColor = getBorderColor(activeColor);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-3 p-2 bg-black/10 rounded-full">
      {dots.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${borderColor} ${currentIndex === index ? '' : 'bg-transparent'}`}
          style={{
            backgroundColor: currentIndex === index ? 'currentColor' : 'transparent',
            color: activeColor.replace('text-',''), // This is a trick to use text color for bg
          }}
        />
      ))}
       <style>{`
          .bg-slate-100 { --tw-bg-opacity: 1; background-color: rgb(241 245 249 / var(--tw-bg-opacity)); }
          .bg-sky-100 { --tw-bg-opacity: 1; background-color: rgb(224 242 254 / var(--tw-bg-opacity)); }
          .bg-indigo-900 { --tw-bg-opacity: 1; background-color: rgb(49 46 129 / var(--tw-bg-opacity)); }
          .bg-emerald-100 { --tw-bg-opacity: 1; background-color: rgb(209 250 229 / var(--tw-bg-opacity)); }
          .bg-gray-100 { --tw-bg-opacity: 1; background-color: rgb(243 244 246 / var(--tw-bg-opacity)); }

          button[style*="background-color: currentColor"] {
            color: white; /* Default color for calculation */
          }
          button[style*="color: slate-100"] { color: #f1f5f9; }
          button[style*="color: sky-100"] { color: #e0f2fe; }
          button[style*="color: indigo-900"] { color: #312e81; }
          button[style*="color: emerald-100"] { color: #d1fae5; }
          button[style*="color: gray-100"] { color: #f3f4f6; }

      `}</style>
    </div>
  );
};

export default SlideIndicator;
