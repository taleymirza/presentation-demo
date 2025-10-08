import React, { useState, useEffect, useCallback } from "react";
import type { SlideData } from "./types";
import Slide from "./components/Slide";
import Navigation from "./components/Navigation";
import SlideIndicator from "./components/SlideIndicator";
import InteractiveDropdown from "./components/DropdownSearch";
import SensorsDemo from "./components/SensorsDemo";
import AutofillDemo from "./components/AutofillDemo";
import ClickToRevealList from "./components/ClickToRevealList";
import NetworkOverrideDemo from "./components/NetworkOverrideDemo";
import CssOverviewDemo from "./components/CSSOverviewDemo";

const localOverridesItems = [
  <>
    A powerful feature in browser DevTools that lets you save changes you make
    directly to your local files.
  </>,
  <>
    Normally, any style change you make in the "Elements" panel is lost when you
    reload the page.
  </>,
  <>
    With overrides, your changes <strong>persist across page loads</strong>,
    allowing for rapid iteration and debugging without leaving the browser.
  </>,
];
const cssOverviewItems = [
  <>
    A tool in Chrome DevTools for getting a high-level overview of your page's
    CSS.
  </>,
  <>
    It helps you identify potential improvements, inconsistencies, and
    accessibility issues.
  </>,
  <>
    <strong>Key Reports:</strong> It provides reports on colors, fonts, unused
    declarations, and media queries used on the page.
  </>,
  <>
    <strong>Use Cases:</strong> Perfect for auditing for design system
    consistency, finding low-contrast text, and identifying redundant CSS.
  </>,
];

const SLIDES_DATA: SlideData[] = [
  {
    id: 10,
    title: "DevTools: Sensors Demo",
    content: <SensorsDemo />,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },
  {
    id: 6,
    title: "What is CSS Overview?",
    content: cssOverviewItems,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
    isRevealList: true,
  },
  {
    id: 7,
    title: "Challenge: Design System Audit",
    content: <CssOverviewDemo />,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },
  {
    id: 4,
    title: "What Are Local Overrides?",
    content: localOverridesItems,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
    isRevealList: true,
  },
  {
    id: 5,
    title: "Challenge: Network Response Override",
    content: <NetworkOverrideDemo />,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },

  {
    id: 8,
    title: "DevTools: Autofill Demo",
    content: <AutofillDemo />,
    backgroundColor: "bg-cyan-800",
    textColor: "text-cyan-100",
  },

  {
    id: 9,
    title: "Interactive Dropdown Demo",
    content: <InteractiveDropdown />,
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },
  {
    id: 11,
    title: "Kernighan’s Law",
    content: (
      <blockquote class="border-l-4 border-gray-300 pl-8 text-left italic text-gray-300 mt-12">
        Debugging is twice as hard as writing the code in the first place.
        Therefore, if you write the code as cleverly as possible, you are, by
        definition, not smart enough to debug it.
      </blockquote>
    ),
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-100",
  },
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    try {
      const savedSlide = localStorage.getItem("currentSlideIndex");
      if (savedSlide) {
        const parsedSlide = parseInt(savedSlide, 10);
        if (
          !isNaN(parsedSlide) &&
          parsedSlide >= 0 &&
          parsedSlide < SLIDES_DATA.length
        ) {
          return parsedSlide;
        }
      }
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
    }
    return 0;
  });
  const [revealedItemsCount, setRevealedItemsCount] = useState(1);

  useEffect(() => {
    try {
      localStorage.setItem("currentSlideIndex", currentSlideIndex.toString());
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
  }, [currentSlideIndex]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
    setRevealedItemsCount(1);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + SLIDES_DATA.length) % SLIDES_DATA.length
    );
    setRevealedItemsCount(1);
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES_DATA.length) {
      setCurrentSlideIndex(index);
      setRevealedItemsCount(1);
    }
  };

  useEffect(() => {
    const currentSlide = SLIDES_DATA[currentSlideIndex];
    const isRevealSlide = !!currentSlide.isRevealList;
    const totalItems =
      isRevealSlide && Array.isArray(currentSlide.content)
        ? currentSlide.content.length
        : 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "Enter") {
        event.preventDefault();
        const hasMoreItemsToReveal =
          isRevealSlide && revealedItemsCount < totalItems;

        if (hasMoreItemsToReveal) {
          setRevealedItemsCount((prev) => prev + 1);
        } else if (event.key === "ArrowRight") {
          goToNextSlide();
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideIndex, revealedItemsCount, goToNextSlide, goToPrevSlide]);

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden flex items-center justify-center transition-colors duration-700 ${currentSlide.backgroundColor}`}
    >
      <div className="absolute inset-0">
        {SLIDES_DATA.map((slide, index) => {
          let slideContent = slide.content;
          if (slide.isRevealList && Array.isArray(slide.content)) {
            slideContent = (
              <ClickToRevealList
                items={slide.content}
                visibleCount={revealedItemsCount}
              />
            );
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlideIndex
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={index !== currentSlideIndex}
            >
              <Slide {...slide} content={slideContent} />
            </div>
          );
        })}
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
