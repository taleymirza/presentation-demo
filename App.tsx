import React, { useState, useEffect, useCallback } from "react";
import type { SlideData } from "./types";
import Slide from "./components/Slide";
import Navigation from "./components/Navigation";
import SlideIndicator from "./components/SlideIndicator";
import InteractiveDropdown from "./components/DropdownSearch";

const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    title: "Welcome to React Slides",
    content:
      "A modern presentation experience built with React and Tailwind CSS. Use the arrow keys or click the on-screen cursors to navigate.",
    backgroundColor: "bg-slate-900",
    textColor: "text-slate-100",
  },
  {
    id: 2,
    title: "Component-Based Architecture",
    content:
      "Each slide, navigation control, and indicator is a reusable React component, promoting clean code and maintainability.",
    backgroundColor: "bg-sky-700",
    textColor: "text-sky-100",
  },
  {
    id: 3,
    title: "Key Features",
    content: (
      <ul className="list-disc text-left space-y-4 max-w-2xl mx-auto">
        <li>
          <strong>Declarative UI:</strong> Build complex UIs from small,
          isolated pieces of code called “components”.
        </li>
        <li>
          <strong>Virtual DOM:</strong> React creates an in-memory data
          structure cache, computes the resulting differences, and then updates
          the browser's displayed DOM efficiently.
        </li>
        <li>
          <strong>JSX:</strong> A syntax extension to JavaScript that lets you
          write HTML-like markup inside a JavaScript file.
        </li>
      </ul>
    ),
    backgroundColor: "bg-teal-800",
    textColor: "text-teal-100",
  },
  {
    id: 4,
    title: "Dynamic Content",
    content:
      "Slides can feature different layouts, backgrounds, and even images, like the one below.",
    backgroundColor: "bg-indigo-100",
    textColor: "text-indigo-900",
    imageUrl: "https://picsum.photos/800/400",
  },
  {
    id: 5,
    title: "Styled with Tailwind CSS",
    content:
      "All styling is handled directly in the JSX using Tailwind's utility-first classes, making design rapid and responsive.",
    backgroundColor: "bg-emerald-800",
    textColor: "text-emerald-100",
  },
  {
    id: 6,
    title: "A Simple Component",
    content: (
      <div className="text-left bg-gray-900 rounded-lg p-6 font-mono text-base overflow-x-auto shadow-lg max-w-2xl mx-auto">
        <pre>
          <code className="language-jsx text-green-300">
            {`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`}
          </code>
        </pre>
      </div>
    ),
    backgroundColor: "bg-gray-200",
    textColor: "text-gray-800",
  },
  {
    id: 7,
    title: "Interactive Dropdown Demo",
    content: <InteractiveDropdown />,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },
  {
    id: 8,
    title: "The End",
    content: "Explore the code to see how it all works. Thank you for viewing!",
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + SLIDES_DATA.length) % SLIDES_DATA.length
    );
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES_DATA.length) {
      setCurrentSlideIndex(index);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextSlide();
      } else if (event.key === "ArrowLeft") {
        goToPrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextSlide, goToPrevSlide]);

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden flex items-center justify-center transition-colors duration-700 ${currentSlide.backgroundColor}`}
    >
      <div className="absolute inset-0">
        {SLIDES_DATA.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlideIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {index === currentSlideIndex && <Slide {...slide} />}
          </div>
        ))}
      </div>

      <Navigation onPrev={goToPrevSlide} onNext={goToNextSlide} />

      <SlideIndicator
        totalSlides={SLIDES_DATA.length}
        currentIndex={currentSlideIndex}
        onDotClick={goToSlide}
        activeColor={currentSlide.textColor}
      />
    </main>
  );
};

export default App;
