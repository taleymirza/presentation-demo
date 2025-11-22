import React, { useState } from 'react';
import { AlertTriangle, WifiOff, Layers, MousePointerClick, Info } from 'lucide-react';

export const BuggyZone: React.FC = () => {
  const [count, setCount] = useState(0);

  // 1. Logic Bug: Intentional cryptic error for Console Insights
  const triggerCrypticError = () => {
    const deepStructure: any = {
      config: {
        settings: {
          // theme: 'dark' // Intentionally missing
        }
      }
    };
    
    console.log("Attempting to load theme...");
    
    // This will throw: Cannot read properties of undefined (reading 'primary')
    // But we wrap it to make the stack trace slightly more interesting/realistic
    const applyTheme = (themeObj: any) => {
      const color = themeObj.colors.primary; // Error here
      document.body.style.backgroundColor = color;
    };

    applyTheme(deepStructure.config.settings.theme); 
  };

  // 2. Network Bug: Fetching non-existent resource
  const triggerNetworkError = async () => {
    try {
      console.log("Fetching user data...");
      const res = await fetch('https://jsonplaceholder.typicode.com/users/99999', {
        headers: {
          'X-Custom-Auth': 'Invalid-Token',
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    } catch (e) {
      console.error("Network Request Failed", e);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto bg-slate-800/50 p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-700 text-sm">


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario 1: Console Insights */}
        <section className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden hover:border-blue-500/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <AlertTriangle size={100} className="text-blue-500" />
          </div>
          <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <AlertTriangle size={24} />
            Scenario 1: The Cryptic Crash
          </h3>

          <button 
            onClick={triggerCrypticError}
            className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            invoke_crash_handler()
          </button>
        </section>

        {/* Scenario 2: Network Insights */}
        <section className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden hover:border-blue-500/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <WifiOff size={100} className="text-blue-500" />
          </div>
          <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <WifiOff size={24} />
            Scenario 2: The 404 Mystery
          </h3>

          <button 
            onClick={triggerNetworkError}
            className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            fetch_secure_data()
          </button>
        </section>

        {/* Scenario 3: DOM/Styling (The Unclickable Button) */}
        <section className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden hover:border-blue-500/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Layers size={100} className="text-blue-500" />
          </div>
          <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <Layers size={24} />
            Scenario 3: The Phantom Overlay
          </h3>

          
          <div className="relative inline-block mt-1 p-3 bg-slate-800/50 rounded border border-slate-700/50">
            <button 
              onClick={() => setCount(c => c + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg transition-transform active:scale-95 text-sm"
            >
              Click Me! (Clicks: {count})
            </button>
            
            {/* THE BUG: An invisible overlay blocking the button */}
            <div 
              className="absolute inset-0 z-10 bg-transparent cursor-not-allowed"
              title="I am the invisible blocker!"
              aria-hidden="true"
            ></div>
          </div>
        </section>

         {/* Scenario 4: Contrast/CSS */}
         <section className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden hover:border-blue-500/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <MousePointerClick size={100} className="text-blue-500" />
          </div>
          <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <MousePointerClick size={24} />
            Scenario 4: The Hidden Message
          </h3>

          
          <div className="p-4 bg-slate-800 rounded border border-slate-700/50">
            <p className="text-[#2a3648] font-semibold text-base">
              Can you read this secret message?
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
