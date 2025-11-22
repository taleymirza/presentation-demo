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
    <div className="max-w-4xl w-full mx-auto bg-slate-50 p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-200">
      <div className="flex items-start gap-3 mb-6">
        <Eye className="text-purple-600 mt-1 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-sm text-purple-700">
            Audit Page for Style Issues
          </h3>
          <p className="text-slate-600 mt-1 text-sm">
            This page has subtle style errors. Use the CSS Overview tool to find them instantly.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Styling Rules Card */}
        <div className="bg-gray-200 rounded-lg p-4 shadow-inner">
          <FeatureCard title="Styling Rules">
            Spot the Inconsistent Button according to the design system. The button below should use the brand blue:{" "}
            <code className="bg-gray-300 text-xs px-1 rounded">#0d6efd</code>.
          </FeatureCard>

          <div className="text-center my-3 flex flex-wrap gap-2 justify-center">
            <button
              className="font-bold py-2 px-4 rounded-lg text-white shadow-md text-sm"
              style={{ backgroundColor: "#0d6efd" }} /* CORRECT COLOR */
            >
            Primary Button
            </button>
            <button
              className="font-bold py-2 px-4 rounded-lg text-white shadow-md text-sm"
              style={{
                backgroundColor: "#0d6dfd",
              }} /* SUBTLY INCORRECT COLOR */
            >
              Primary Button
            </button>
          </div>
        </div>

        {/* Font Size Rules Card */}
        <div className="bg-gray-200 rounded-lg p-4 shadow-inner">
          <FeatureCard title="Font Size Rules">
            All body text must be 16px.
            <span style={{ fontSize: "15.8px" }}>
              Can you spot the Inconsistent Font Size?
            </span>
          </FeatureCard>
        </div>

        {/* Accessibility Info Card */}
        <div
          className="p-4 rounded-lg border shadow-md"
          style={{
            backgroundColor: "#E5E7EB",
            color: "#9CA3AF",
          }}
        >
          <div className="flex items-center">
            <AlertCircle className="mr-2 flex-shrink-0" size={18} />
            <h4 className="font-bold text-sm sm:text-base">Accessibility Info</h4>
          </div>
          <p className="text-xs sm:text-sm mt-2">
            This box has low-contrast text, making it hard to read. The CSS Overview tool will flag this.
          </p>
        </div>


      </div>
    </div>
  );
};

export default CssOverviewDemo;
