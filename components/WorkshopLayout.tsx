import React from 'react';
import ReactMarkdown from 'react-markdown';

interface WorkshopLayoutProps {
  title: string;
  instructions: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const WorkshopLayout: React.FC<WorkshopLayoutProps> = ({
  title,
  instructions,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-white">
      {/* Left Panel: Instructions */}
      <div className="w-1/2 h-full flex flex-col border-r border-gray-700 bg-gray-900">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <div>
            <h1 className="text-xl font-bold text-blue-400">{title}</h1>
            <p className="text-sm text-gray-400">Step {currentStep + 1} of {totalSteps}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              disabled={currentStep === 0}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              onClick={onNext}
              disabled={currentStep === totalSteps - 1}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none">
          <ReactMarkdown>{instructions}</ReactMarkdown>
        </div>
      </div>

      {/* Right Panel: Workspace/Demo */}
      <div className="w-1/2 h-full flex flex-col bg-gray-950 relative">
        <div className="absolute inset-0 overflow-auto">
           {children}
        </div>
      </div>
    </div>
  );
};

export default WorkshopLayout;
