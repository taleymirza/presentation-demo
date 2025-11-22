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
import DevToolsAIDemo from "./components/DevToolsAIDemo";

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


This demo shows how to use DevTools to simulate different geographic locations and timezones.

### Steps

1. **Open DevTools**: Press \`Cmd+Option+I\` (Mac) or \`F12\` (Windows/Linux)
2. **Open Command Menu**: Press \`Cmd+Shift+P\` or \`Ctrl+Shift+P\`
3. **Find Sensors**: Type "Sensors" and select **Show Sensors**
4. **Change Location**: In the Sensors tab, find the **Location** dropdown
5. **Select a City**: Choose **London**, **Mumbai**, **Tokyo**, or any other city
6. **Observe Changes**: The component on the right will update automatically

### Expected Behavior

- The detected locale changes based on the selected location
- The timezone updates to match the new location
- The date and time format adjusts to the local conventions
- The displayed text may change to the local language

### Learn More

<a href="https://developer.chrome.com/docs/devtools/remote-debugging" target="_blank" rel="noopener noreferrer">Remote debug Android devices | Chrome DevTools</a>
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 7,
    title: "Challenge: Design System Audit",
    content: <CssOverviewDemo />,
    instructions: `


The component on the right has **intentional style errors**. Your task is to find them using CSS Overview.

---

## What is CSS Overview?

The CSS Overview panel provides a comprehensive analysis of your page's CSS, helping you identify inconsistencies and potential improvements.

### How to Access

1. **Open Command Menu**: Press \`Cmd+Shift+P\` or \`Ctrl+Shift+P\`
2. **Find CSS Overview**: Type "CSS Overview" and select **Show CSS Overview**
3. **Capture Report**: Click the **Capture overview** button

### What to Explore

- **Colors**: View all colors used on the page and their frequency
- **Font Info**: See all fonts, sizes, and weights
- **Unused Declarations**: Find CSS rules that have no effect
- **Media Queries**: Review all media queries in use
- **Contrast Issues**: Identify accessibility problems with text contrast

---

### Your Task

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

### Expected Findings

- One incorrect color value (very subtle)
- One non-standard font size
- One accessibility contrast violation

### Notes

These subtle inconsistencies are nearly impossible to spot by eye but can be found instantly with CSS Overview.

### Learn More

<a href="https://developer.chrome.com/docs/devtools/css-overview" target="_blank" rel="noopener noreferrer">CSS Overview: Identify potential CSS improvements | Chrome DevTools</a>
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 5,
    title: "Challenge: Network Response Override",
    content: <NetworkOverrideDemo />,
    instructions: `


The component on the right fetches product data from a real API. Your task is to override the response to add a "Sale" feature.

### Setup (if not done already)

1. **Enable Overrides**: Go to Sources → Overrides → Select folder
2. **Grant Permission**: Allow DevTools to save files

### Your Task

1. **Open Network Panel**: Click the **Network** tab
2. **Refresh Page**: Press \`Cmd+R\` or \`F5\` to see network requests
3. **Find API Request**: Look for the \`products/1\` request
4. **Override Response**: Right-click → **Override content**
5. **Edit JSON**: DevTools opens the Sources panel with the response
6. **Add Sale Price**: Insert this line in the JSON:
   \`\`\`json
   "discountPrice": 7.99
   \`\`\`
7. **Save**: Press \`Cmd+S\` or \`Ctrl+S\`
8. **Reload**: Refresh the page to see the "SALE!" banner appear

### Benefits

- Test features before backend implementation
- Debug API issues locally
- Develop frontend independently
- Mock error states and edge cases

### Success Criteria

- The product card shows a "SALE!" badge
- The discounted price appears
- The override persists across reloads

### Learn More

<a href="https://developer.chrome.com/docs/devtools/overrides" target="_blank" rel="noopener noreferrer">Override web content and HTTP response headers locally | Chrome DevTools</a>
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 8,
    title: "DevTools: Autofill Demo",
    content: <AutofillDemo />,
    instructions: `


Test how your forms behave when users have autofill data saved in their browser using the new Chrome DevTools Autofill panel.

### Open the Autofill Panel

1. **Open Command Menu**: Press \`Cmd+Shift+P\` (Mac) or \`Ctrl+Shift+P\` (Windows/Linux)
2. **Find Autofill**: Type "autofill" and select **Show Autofill**
3. **Panel Opens**: The Autofill panel appears in the DevTools drawer

### Method 1: Use Test Address Data (Recommended)

1. **Enable Test Data**: In the Autofill panel, check **Show test address data in autofill menu**
2. **Right-click Form Field**: Right-click any address form field on the right
3. **Select Test Data**: Choose a test address from the **Developer tools** menu
4. **Observe**: The form fills instantly with test data
5. **Inspect Mapping**: The Autofill panel shows how form fields map to autofill values

### Method 2: Use Your Saved Addresses

1. **Save Address**: Chrome Settings → "Autofill and passwords" → "Addresses and more" → Add address
2. **Focus Form Field**: Click any form field on the right
3. **Select Address**: Choose your saved address from the autofill dropdown
4. **Inspect**: The Autofill panel shows the data mapping

### What to Inspect

- **Form Field Mapping**: See how each field maps to autofill data
- **Predicted Values**: Check what Chrome predicts for each field
- **Autocomplete Attributes**: Verify your \`autocomplete\` attributes are correct

### Best Practices

Use proper \`autocomplete\` attributes (like \`given-name\`, \`email\`, \`street-address\`) to help browsers autofill correctly.

### Learn More

<a href="https://developer.chrome.com/docs/devtools/autofill" target="_blank" rel="noopener noreferrer">Autofill: Inspect and debug saved addresses | Chrome DevTools</a>
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },

  {
    id: 9,
    title: "Interactive Dropdown Demo",
    content: <InteractiveDropdown />,
    instructions: `


Learn how to inspect dropdowns and tooltips that disappear when you click away.

### The Problem

Try to inspect the dropdown on the right. Notice how it closes immediately when you try to inspect it?

### Solution 1: Force Element State (Recommended)

This is the most straightforward method for debugging hover states:

1. **Right-click** an item in the dropdown (like "debug a select") and choose **Inspect**
2. In the DevTools Elements panel, that element will be highlighted
3. In the **Styles panel** on the right, click the **:hov** button
4. Check the **:hover** checkbox in the menu that appears
5. The item's hover state is now "stuck" on - you can inspect and edit the hover styles directly

This works for \`:focus\`, \`:active\`, and other pseudo-states too.

### Solution 2: Emulate Focused Page

1. **Open Command Menu**: Press \`Cmd+Shift+P\` or \`Ctrl+Shift+P\`
2. **Type**: "Emulate a focused page"
3. **Enable**: Select the option
4. **Inspect**: Now the dropdown stays open even when you click DevTools

### Comparison

- **Force State**: Best for hover, focus, and active states
- **Emulate Focused**: Best for dropdowns and tooltips that close on blur

### Exercise

Open the dropdown on the right and try both methods.

### Learn More

<a href="https://developer.chrome.com/docs/devtools/css/animations" target="_blank" rel="noopener noreferrer">Inspect and modify CSS animation effects | Chrome DevTools</a>
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },
  {
    id: 13,
    title: "DevTools AI: The Buggy Zone",
    content: <DevToolsAIDemo />,
    instructions: `


Chrome DevTools now integrates AI to help you understand errors and debug faster.

### Scenario 1: Console Insights
**The Cryptic Crash**: Clicking this button causes a crash with a slightly obscure cause.

1. Click **invoke_crash_handler()**.
2. Look at the error in the **Console**.
3. Click the **"Understand this error"** button (lightbulb icon) next to the error.

### Scenario 2: Network Insights
**The 404 Mystery**: This request fails. Why? Is it the headers? The URL?

1. Click **fetch_secure_data()**.
2. Go to the **Network** panel.
3. Right-click the failed request (red).
4. Select **"Ask AI"**.

### Scenario 3: DOM & Styling
**The Phantom Overlay**: This button is visible, but you can't click it. It seems broken.

1. Try to click **"Click Me!"**.
2. Inspect the button.
3. In the **Elements** panel, right-click the element.
4. Select **"Ask AI"** and ask "Why can't I click this?".

### Scenario 4: Accessibility
**The Hidden Message**: There is text below, but it is very hard to read.

1. Inspect the "Secret Message" text.
2. Use AI to ask "How do I fix the contrast?".
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


> "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."

Keep this in mind as you write your code!
    `,
    backgroundColor: "bg-gray-900",
    textColor: "text-gray-100",
  },
  {
    id: 12,
    title: "Feedback & Questions",
    content: (
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          <img 
            src="/instructor.jpg"
            alt="Talia Asghar"
            className="w-48 h-48 rounded-full object-cover object-top border-4 border-blue-500 shadow-xl"
          />
          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-100 mb-2">Talia Asghar</h2>
            <p className="text-xl text-blue-400 mb-1">Google Developers Expert - Web</p>
            <p className="text-lg text-gray-300">Software Engineer & Public Speaker</p>
          </div>
        </div>
        
        <div className="mt-12 space-y-4">
          <h3 className="text-3xl font-bold text-gray-100">Questions?</h3>
          <p className="text-xl text-gray-300">
            I'd love to hear your feedback and answer any questions!
          </p>
        </div>
      </div>
    ),
    instructions: `


### Professional Links

<a href="https://www.linkedin.com/in/taleyamirza/" target="_blank" rel="noopener noreferrer">LinkedIn</a> - Let's connect professionally

<a href="https://g.dev/taleyamirza" target="_blank" rel="noopener noreferrer">Google Developers Expert Profile</a> - Learn more about my GDE work

### Social Media

<a href="https://bsky.app/profile/taleyamirza.bsky.social" target="_blank" rel="noopener noreferrer">Bluesky</a> - @taleyamirza

<a href="https://x.com/TaleyaMirza" target="_blank" rel="noopener noreferrer">X (Twitter)</a> - @TaleyaMirza

<a href="https://instagram.com/taleyamirza" target="_blank" rel="noopener noreferrer">Instagram</a> - @taleyamirza

<a href="https://www.tiktok.com/@taleyamirza" target="_blank" rel="noopener noreferrer">TikTok</a> - @taleyamirza

<a href="https://www.facebook.com/taleya.mirza/" target="_blank" rel="noopener noreferrer">Facebook</a> - Taleya Mirza

---

Thank you for attending this workshop! I hope you found these DevTools techniques helpful.
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
      <div className={`w-full min-h-full flex items-center justify-center ${currentSlide.backgroundColor}`}>
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
            <div key={slide.id} className="w-full min-h-full flex items-center justify-center p-8">
               <Slide {...slide} content={slideContent} />
            </div>
          );
        })}
      </div>
    </WorkshopLayout>
  );
};

export default App;
