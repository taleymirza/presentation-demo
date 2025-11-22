import React, { useState, useEffect, useCallback } from "react";
import type { SlideData } from "./types";
import Slide from "./components/Slide";
import InteractiveDropdown from "./components/DropdownSearch";
import SensorsDemo from "./components/SensorsDemo";
import AutofillDemo from "./components/AutofillDemo";
import ClickToRevealList from "./components/ClickToRevealList";
import NetworkOverrideDemo from "./components/NetworkOverrideDemo";
import CssOverviewDemo from "./components/CSSOverviewDemo";
import WorkshopLayout from "./components/WorkshopLayout";

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
    instructions: `
## Sensors Emulation

This demo shows how to use DevTools to simulate different geographic locations and timezones.

### Steps:

1. **Open DevTools**: Press \`Cmd+Option+I\` (Mac) or \`F12\` (Windows/Linux)
2. **Open Command Menu**: Press \`Cmd+Shift+P\` or \`Ctrl+Shift+P\`
3. **Find Sensors**: Type "Sensors" and select **Show Sensors**
4. **Change Location**: In the Sensors tab, find the **Location** dropdown
5. **Select a City**: Choose **London**, **Mumbai**, **Tokyo**, or any other city
6. **Watch the Magic**: The component on the right will update automatically!

### What You'll See:

- The detected locale changes based on the selected location
- The timezone updates to match the new location
- The date and time format adjusts to the local conventions
- The displayed text may change to the local language
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 7,
    title: "Challenge: Design System Audit",
    content: <CssOverviewDemo />,
    instructions: `
## Challenge: Design System Audit

The component on the right has **intentional style errors**. Your mission is to find them using CSS Overview!

---

## What is CSS Overview?

The CSS Overview panel provides a comprehensive analysis of your page's CSS, helping you identify inconsistencies and potential improvements.

### How to Access:

1. **Open Command Menu**: Press \`Cmd+Shift+P\` or \`Ctrl+Shift+P\`
2. **Find CSS Overview**: Type "CSS Overview" and select **Show CSS Overview**
3. **Capture Report**: Click the **Capture overview** button

### What to Explore:

- **Colors**: View all colors used on the page and their frequency
- **Font Info**: See all fonts, sizes, and weights
- **Unused Declarations**: Find CSS rules that have no effect
- **Media Queries**: Review all media queries in use
- **Contrast Issues**: Identify accessibility problems with text contrast

---

### Your Task:

1. **Capture Overview**: Open CSS Overview and click "Capture overview"
2. **Find Color Issues**: 
   - Look at the **Colors** section
   - The brand blue should be \`#0d6efd\`
   - Find the button using the wrong shade (\`#0d6dfd\`)
3. **Find Font Issues**:
   - Check the **Font info** section
   - All body text should be 16px
   - Find the text that's 15.8px
4. **Find Contrast Issues**:
   - Look at **Contrast issues**
   - Find the low-contrast text that's hard to read

### Expected Findings:

✅ One incorrect color value (very subtle!)
✅ One non-standard font size
✅ One accessibility contrast violation

### Why This Matters:

These subtle inconsistencies are nearly impossible to spot by eye but can be found instantly with CSS Overview!
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 5,
    title: "Challenge: Network Response Override",
    content: <NetworkOverrideDemo />,
    instructions: `
## Challenge: Network Response Override

The component on the right fetches product data from a real API. Your task is to override the response to add a "Sale" feature!

### Setup (if not done already):

1. **Enable Overrides**: Go to Sources → Overrides → Select folder
2. **Grant Permission**: Allow DevTools to save files

### Your Mission:

1. **Open Network Panel**: Click the **Network** tab
2. **Refresh Page**: Press \`Cmd+R\` or \`F5\` to see network requests
3. **Find API Request**: Look for the \`products/1\` request
4. **Override Response**: Right-click → **Override content**
5. **Edit JSON**: DevTools opens the Sources panel with the response
6. **Add Sale Price**: Insert this line in the JSON:
   \`\`\`json
   "discountPrice": 99.99
   \`\`\`
7. **Save**: Press \`Cmd+S\` or \`Ctrl+S\`
8. **Reload**: Refresh the page to see the "SALE!" banner appear!

### Why This Is Powerful:

- Test features before backend implementation
- Debug API issues locally
- Develop frontend independently
- Mock error states and edge cases

### Success Criteria:

✅ The product card shows a "SALE!" badge
✅ The discounted price appears
✅ The override persists across reloads
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 8,
    title: "DevTools: Autofill Demo",
    content: <AutofillDemo />,
    instructions: `
## Autofill Testing

Test how your forms behave when users have autofill data saved in their browser.

### Method 1: Create Test Profile

1. **Open Chrome Settings**: Click the three dots → Settings
2. **Navigate to Autofill**: Go to "Autofill and passwords" → "Addresses and more"
3. **Add Profile**: Click "Add" and create a test profile
4. **Fill Form**: Return here and click any form field
5. **Select Profile**: Choose your test profile from the popup
6. **Watch**: The entire form fills instantly!

### Method 2: Emulate Autofill State

1. **Open Rendering Panel**: 
   - Press \`Cmd+Shift+P\` → Type "Rendering" → Select **Show Rendering**
   - OR: DevTools menu (⋮) → More tools → Rendering
2. **Enable Emulation**: Find and enable **Emulate auto-fill**
3. **See Styles**: Form fields show autofill styling

### Why Test Autofill?

- Ensure autofill styling looks good
- Verify \`autocomplete\` attributes work correctly
- Test form validation with autofilled data
- Check accessibility of autofill states

### Pro Tip:

Use proper \`autocomplete\` attributes (like \`given-name\`, \`email\`, \`street-address\`) to help browsers autofill correctly!
    `,
    backgroundColor: "bg-cyan-900",
    textColor: "text-cyan-100",
  },

  {
    id: 9,
    title: "Interactive Dropdown Demo",
    content: <InteractiveDropdown />,
    instructions: `
## Debugging Interactive Elements

Ever tried to inspect a dropdown or tooltip that disappears when you click away? Here's how to fix that!

### The Problem:

Try to inspect the dropdown on the right. Notice how it closes immediately when you try to inspect it? Frustrating!

### Solution 1: Emulate Focused Page

1. **Open Command Menu**: Press \`Cmd+Shift+P\` or \`Ctrl+Shift+P\`
2. **Type**: "Emulate a focused page"
3. **Enable**: Select the option
4. **Inspect**: Now the dropdown stays open even when you click DevTools!

### Solution 2: setTimeout Trick

1. **Open Console**: Click the Console tab
2. **Run Command**:
   \`\`\`js
   setTimeout(() => { debugger; }, 3000);
   \`\`\`
3. **Quick!**: You have 3 seconds to open the dropdown
4. **Paused**: The debugger pauses execution, freezing the dropdown open
5. **Inspect**: Now you can inspect it in the Elements panel!

### Solution 3: Force Element State

1. **Right-click** the dropdown trigger in Elements panel
2. **Force State**: Select :hover, :focus, or :active
3. **Inspect**: The dropdown stays visible

### When to Use Each:

- **Emulate Focused**: Best for dropdowns and tooltips
- **setTimeout**: Great for hover states and animations
- **Force State**: Perfect for CSS pseudo-classes

### Try It:

Open the dropdown on the right and try each method!
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },
  {
    id: 11,
    title: "Kernighan’s Law",
    content: (
      <blockquote className="border-l-4 border-gray-300 pl-8 text-left italic text-gray-300 mt-12">
        Debugging is twice as hard as writing the code in the first place.
        Therefore, if you write the code as cleverly as possible, you are, by
        definition, not smart enough to debug it.
      </blockquote>
    ),
    instructions: `
## Kernighan’s Law

> "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."

Keep this in mind as you write your code!
    `,
    backgroundColor: "bg-gray-900",
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
    <WorkshopLayout
      title={currentSlide.title}
      instructions={currentSlide.instructions || "No instructions available."}
      currentStep={currentSlideIndex}
      totalSteps={SLIDES_DATA.length}
      onNext={goToNextSlide}
      onPrev={goToPrevSlide}
    >
      <div className={`w-full h-full flex items-center justify-center ${currentSlide.backgroundColor}`}>
        {SLIDES_DATA.map((slide, index) => {
          if (index !== currentSlideIndex) return null;
          
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
            <div key={slide.id} className="w-full h-full flex items-center justify-center p-8">
               <Slide {...slide} content={slideContent} />
            </div>
          );
        })}
      </div>
    </WorkshopLayout>
  );
};

export default App;
