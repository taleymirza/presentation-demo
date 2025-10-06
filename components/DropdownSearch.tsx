import React, { useState, useRef, useEffect } from "react";
import { Search, Clock, X } from "lucide-react";

interface Option {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  description: string | null;
  endIcon: React.ComponentType<{ className?: string }>;
}

export default function InteractiveDropdown(): React.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<Option[]>([
    {
      icon: Clock,
      text: "debug a dropdown",
      description: "Google Search",
      endIcon: X,
    },
    {
      icon: Clock,
      text: "debug a select",
      description: null,
      endIcon: X,
    },
    {
      icon: Clock,
      text: "most common select html bug",
      description: null,
      endIcon: X,
    },
    {
      icon: Clock,
      text: "should i git commit package lock json",
      description: null,
      endIcon: X,
    },
    {
      icon: Clock,
      text: "ai studio",
      description: null,
      endIcon: X,
    },
    {
      icon: Clock,
      text: "linkedin",
      description: null,
      endIcon: X,
    },
    {
      icon: Clock,
      text: "coverage tool",
      description: null,
      endIcon: X,
    },
    {
      icon: Clock,
      text: "code names",
      description: null,
      endIcon: X,
    },
  ]);

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          setInputValue(filteredOptions[selectedIndex].text);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.text);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: Option
  ) => {
    e.stopPropagation();
    setOptions((prevOptions) =>
      prevOptions.filter((opt) => opt.text !== option.text)
    );
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    //   <div className="max-w-3xl mx-auto">
    //     <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
    //       Interactive Dropdown Demo
    //     </h1>

    <div className="relative h-64" ref={dropdownRef}>
      {/* Combined Container */}
      <div
        className={`relative bg-white text-left ${
          isOpen
            ? "rounded-t-3xl rounded-b-3xl shadow-lg"
            : "rounded-full shadow-sm hover:shadow-md"
        } border border-gray-300 transition-shadow`}
      >
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-4 text-lg text-gray-800 bg-transparent focus:outline-none relative z-20"
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && filteredOptions.length > 0 && (
          <div className="border-t border-gray-200">
            {filteredOptions.map((option, index) => {
              const IconComponent = option.icon;
              const EndIconComponent = option.endIcon;
              const isSelected = index === selectedIndex;
              const isLast = index === filteredOptions.length - 1;

              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`group flex items-center px-4 py-3 cursor-pointer transition-colors ${
                    isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                  }  ${isLast ? "rounded-b-3xl" : ""}`}
                >
                  <IconComponent className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 ml-4 min-w-0">
                    <div className="text-gray-800 leading-tight">
                      {option.text}
                    </div>
                    {option.description && (
                      <div className="text-xs text-gray-500 leading-tight">
                        {option.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleRemoveClick(e, option)}
                    className="ml-4 p-1 hover:bg-gray-200 rounded-full transition-colors opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    <EndIconComponent className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {isOpen && filteredOptions.length === 0 && inputValue && (
          <div className="border-t border-gray-200 p-4">
            <p className="text-gray-500 text-center">No results found</p>
          </div>
        )}
      </div>
    </div>

    // {/* Instructions */}
    //     <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
    //       <h2 className="text-xl font-semibold text-gray-800 mb-4">
    //         Debugging Features:
    //       </h2>
    //       <ul className="space-y-2 text-gray-600">
    //         <li className="flex items-start">
    //           <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
    //             Click
    //           </span>
    //           <span>input field to open dropdown</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
    //             Type
    //           </span>
    //           <span>to filter options</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
    //             ↑↓
    //           </span>
    //           <span>arrow keys to navigate</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
    //             Enter
    //           </span>
    //           <span>to select highlighted option</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
    //             Esc
    //           </span>
    //           <span>to close dropdown</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
    //             X
    //           </span>
    //           <span>
    //             icon appears on hover - click to remove item from list
    //           </span>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}
