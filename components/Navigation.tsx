
import React from 'react';

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

const ArrowIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-10 w-10" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
    />
  </svg>
);


const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext }) => {
  return (
    <>
      {/* Previous Slide Button */}
      <button
        onClick={onPrev}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 text-white/70 hover:text-white hover:bg-black/20 rounded-r-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <ArrowIcon direction="left" />
      </button>
      
      {/* Next Slide Button */}
      <button
        onClick={onNext}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 text-white/70 hover:text-white hover:bg-black/20 rounded-l-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <ArrowIcon direction="right" />
      </button>
    </>
  );
};

export default Navigation;
