import React from 'react';

interface ClickToRevealListProps {
  items: React.ReactNode[];
  visibleCount: number;
}

const ClickToRevealList: React.FC<ClickToRevealListProps> = ({ items, visibleCount }) => {
  return (
    <ul className="list-none text-left space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <li
          key={index}
          className={`transition-all duration-500 ease-in-out ${index < visibleCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          aria-hidden={index >= visibleCount}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ClickToRevealList;
