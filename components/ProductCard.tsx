import React from 'react';
import type { Product } from './NetworkOverrideDemo';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = typeof product.discountPrice === 'number';

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative text-left">
      {hasDiscount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-bounce">
          SALE!
        </div>
      )}
      <div className="h-48 overflow-hidden bg-white p-4 flex items-center justify-center">
        <img
          className="w-full h-full object-contain"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 font-bold text-xl mb-2 truncate" title={product.title}>{product.title}</h3>
        <div className="flex items-baseline justify-start text-gray-700">
          {hasDiscount ? (
            <>
              <p className="text-2xl font-bold text-red-500">${product.discountPrice?.toFixed(2)}</p>
              <p className="text-lg text-gray-500 line-through ml-2">${product.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;