import React from "react";
import { Eye, CheckCircle, AlertCircle, Zap } from "lucide-react";

const FeatureCard = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white p-4 rounded-lg shadow-md border ${className}`}>
    <div className="flex items-center mb-2">
      <div className="p-2 bg-blue-100 rounded-full mr-3">
        <Zap className="text-blue-600" size={18} />
      </div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed text-sm">{children}</p>
  </div>
);

const CssOverviewDemo: React.FC = () => {
  return (
    <div className="max-w-6xl w-full mx-auto bg-slate-50 p-4 rounded-xl shadow-2xl border border-slate-200 text-sm">
      <div className="flex items-start gap-4 mb-6">
        <Eye className="text-purple-600 mt-1 flex-shrink-0" size={24} />
        <div className="w-100">
          <h3 className="font-semibold text-lg text-purple-700 ">
            Challenge: Audit Page for Style Issues
          </h3>
          <p className="text-slate-600 mt-2 ">
            This page has subtle style errors. Use the CSS Overview tool to find
            them instantly.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* --- Left Column: Styling & Font Issues --- */}
        <div className="space-y-4 bg-gray-200 rounded-lg p-6 shadow-inner text-left">
          <FeatureCard title="Styling Rules">
            The button below should use the brand blue:{" "}
            <code className="bg-gray-300 text-xs px-1 rounded">#0d6efd</code>.
          </FeatureCard>

          <div className="text-center my-3">
            <button
              className="font-bold py-2 px-4 rounded-lg text-white shadow-md text-sm"
              style={{ backgroundColor: "#0d6efd" }} /* CORRECT COLOR */
            >
              Official Button
            </button>
            <button
              className="font-bold py-2 px-4 rounded-lg text-white shadow-md ml-3 text-sm"
              style={{
                backgroundColor: "#0d6dfd",
              }} /* SUBTLY INCORRECT COLOR */
            >
              Mismatched Button
            </button>
          </div>

          <FeatureCard title="Font Size Rules">
            All body text must be 16px.
            <span style={{ fontSize: "15.8px" }}>
              {" "}
              This line is slightly smaller.
            </span>{" "}
            {/* INCORRECT FONT SIZE */}
          </FeatureCard>
        </div>

        {/* --- Right Column: Accessibility & Instructions --- */}
        <div className="space-y-4 text-left">
          <div
            className="p-4 rounded-lg bg-white border shadow-md"
            style={{
              backgroundColor: "#E5E7EB",
              color: "#9CA3AF",
            }} /* LOW CONTRAST */
          >
            <div className="flex items-center">
              <AlertCircle className="mr-2" size={18} />
              <h4 className="font-bold text-base">Accessibility Info</h4>
            </div>
            <p className="text-sm mt-2">
              This box has low-contrast text, making it hard to read. The tool
              will flag this.
            </p>
          </div>

          <div className="text-slate-700 space-y-2 bg-white p-4 rounded-lg shadow-md border">
            <h4 className="font-bold text-sm text-slate-800 mb-2">
              How to Complete the Challenge:
            </h4>
            <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm">
              <li>
                Open DevTools, go to 'More tools', and select 'CSS Overview'.
              </li>
              <li>Click "Capture overview" to run the report.</li>
              <li>
                In the report, find these errors:
                <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-xs">
                  <li>Under "Colors," find the non-standard blue.</li>
                  <li>Under "Font info," find the unoptimized font size.</li>
                  <li>Under "Contrast issues," find the low-contrast text.</li>
                </ul>
              </li>
              <li className="text-green-700 flex items-center gap-2 mt-3">
                <CheckCircle size={16} />
                <span className="font-semibold">Page audited in seconds!</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssOverviewDemo;
