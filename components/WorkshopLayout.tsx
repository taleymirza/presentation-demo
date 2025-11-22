import React from 'react';

interface WorkshopLayoutProps {
  title: string;
  instructions: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

// Custom instruction parser that converts markdown to styled HTML
const parseInstructions = (markdown: string) => {
  const lines = markdown.trim().split('\n');
  const elements: React.ReactElement[] = [];
  let currentList: string[] = [];
  let currentCodeBlock: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let listCounter = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ol key={`list-${elements.length}`} className="space-y-3 mb-6">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-semibold mt-0.5">
                {idx + 1}
              </span>
              <span className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ol>
      );
      currentList = [];
    }
  };

  const flushCodeBlock = () => {
    if (currentCodeBlock.length > 0) {
      elements.push(
        <div key={`code-${elements.length}`} className="mb-6 rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">
            {codeLanguage || 'code'}
          </div>
          <pre className="bg-gray-900 p-4 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono">{currentCodeBlock.join('\n')}</code>
          </pre>
        </div>
      );
      currentCodeBlock = [];
      codeLanguage = '';
    }
  };

  const formatInlineCode = (text: string) => {
    return text.replace(/`([^`]+)`/g, '<code class="px-2 py-0.5 bg-gray-800 text-blue-300 rounded text-sm font-mono">$1</code>');
  };

  const formatLinks = (text: string) => {
    // Convert markdown links to styled HTML
    let formatted = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>'
    );

    // Add styling to existing HTML anchor tags if they don't have classes
    // We use a negative lookahead to avoid adding class if it already exists
    formatted = formatted.replace(
      /<a (?!.*class=)([^>]+)>/g, 
      '<a class="text-blue-400 hover:text-blue-300 underline transition-colors" $1>'
    );

    return formatted;
  };

  const formatBold = (text: string) => {
    return text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>');
  };

  const formatText = (text: string) => {
    return formatLinks(formatBold(formatInlineCode(text)));
  };

  lines.forEach((line, index) => {
    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        flushList();
        inCodeBlock = true;
        codeLanguage = line.trim().substring(3);
      } else {
        inCodeBlock = false;
        flushCodeBlock();
      }
      return;
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line);
      return;
    }

    // Handle H2 headers
    if (line.startsWith('## ')) {
      flushList();
      const text = line.substring(3).trim();
      elements.push(
        <div key={`h2-${elements.length}`} className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">{text}</h2>
        </div>
      );
      return;
    }

    // Handle H3 headers
    if (line.startsWith('### ')) {
      flushList();
      const text = line.substring(4).trim();
      elements.push(
        <div key={`h3-${elements.length}`} className="flex items-center gap-2 mb-3 mt-6">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-blue-300">{text}</h3>
        </div>
      );
      return;
    }

    // Handle horizontal rules
    if (line.trim() === '---') {
      flushList();
      elements.push(
        <div key={`hr-${elements.length}`} className="my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      );
      return;
    }

    // Handle blockquotes
    if (line.trim().startsWith('>')) {
      flushList();
      const text = line.substring(1).trim();
      elements.push(
        <div key={`quote-${elements.length}`} className="mb-6 pl-4 border-l-4 border-blue-500 bg-blue-500/5 py-3 pr-4 rounded-r">
          <p className="text-gray-300 italic" dangerouslySetInnerHTML={{ __html: formatText(text) }} />
        </div>
      );
      return;
    }

    // Handle numbered lists
    if (/^\d+\.\s/.test(line.trim())) {
      const text = line.trim().replace(/^\d+\.\s/, '');
      currentList.push(formatText(text));
      return;
    }

    // Handle bullet lists
    if (line.trim().startsWith('- ')) {
      flushList();
      const text = line.trim().substring(2);
      elements.push(
        <div key={`bullet-${elements.length}`} className="flex items-start gap-3 mb-3">
          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2"></span>
          <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(text) }} />
        </div>
      );
      return;
    }

    // Handle regular paragraphs
    if (line.trim()) {
      flushList();
      elements.push(
        <p key={`p-${elements.length}`} className="text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatText(line.trim()) }} />
      );
    } else {
      flushList();
    }
  });

  flushList();
  flushCodeBlock();

  return elements;
};

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
          <div className="flex gap-3">
            <div className="w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-sm text-gray-400">Step {currentStep + 1} of {totalSteps}</p>
            </div>
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
        
        <div className="flex-1 overflow-y-auto p-8">
          {parseInstructions(instructions)}
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
