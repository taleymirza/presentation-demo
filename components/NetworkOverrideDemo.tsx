import React, { useState, useEffect } from 'react';
import { HardDriveDownload, AlertTriangle, Loader } from 'lucide-react';
import ProductCard from './ProductCard';

const API_URL = 'https://dummyjson.com/products/1';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  discountPrice?: number;
}

const NetworkOverrideDemo: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (e) {
        if (e instanceof Error) {
            setError(`Failed to fetch product data. ${e.message}.`);
        } else {
            setError("An unknown error occurred.");
        }
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto bg-slate-800/50 p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-700 text-sm">
      <div className="flex items-start gap-4 mb-6">
        <HardDriveDownload className="text-amber-300 mt-1 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-amber-300">Challenge: Override a Live API Request</h3>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            This component fetches product data from a real API. Your task is to use your browser's DevTools to intercept and modify the response to build a "Sale" feature.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center min-h-[350px] shadow-inner">
        {loading && (
          <div className="flex flex-col items-center text-gray-500">
            <Loader className="animate-spin mb-4" size={32} />
            <p>Fetching product data...</p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center text-red-600 text-center">
            <AlertTriangle className="mb-4" size={32} />
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {product && <ProductCard product={product} />}
      </div>
    </div>
  );
};

export default NetworkOverrideDemo;