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
          <h3 className="font-semibold text-lg text-amber-300">Challenge: Override a Live API Request</h3>
          <p className="text-slate-300 mt-2">
            This component fetches product data from a real API. Your task is to use your browser's DevTools to intercept and modify the response to build a "Sale" feature.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Left side: The Live Component */}
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[350px] shadow-inner">
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
              <p>{error}</p>
            </div>
          )}
          {product && <ProductCard product={product} />}
        </div>
        
        {/* Right side: Instructions */}
        <div className="text-slate-300 space-y-3 text-left">
          <h4 className="font-bold text-base text-slate-100 mb-2">How to Complete the Challenge:</h4>
          <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm">
            <li>Open DevTools (F12).</li>
            <li>In the Sources tab, enable Local Overrides and select a folder.</li>
            <li>Go to the Network tab and refresh this page.</li>
            <li>Find the `products/1` request, right-click it, and select "Override content".</li>
            <li>In the JSON response, add the key-value pair: <br /> <code className="bg-slate-700 text-cyan-300 px-2 py-1 rounded text-xs">"discountPrice": 99.99</code></li>
            <li>Save your changes (Ctrl+S). An active override will be indicated.</li>
            <li>Refresh the page to see the "SALE!" banner appear.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NetworkOverrideDemo;