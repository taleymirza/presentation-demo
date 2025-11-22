import React from 'react';

const AutofillDemo: React.FC = () => {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Form submitted! Autofill data correctly populated.');
  };

  const InputField: React.FC<{label: string, id: string, autocomplete: string, type?: string}> = ({ label, id, autocomplete, type = 'text' }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-cyan-200 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        autoComplete={autocomplete}
        className="w-full bg-white/10 p-1.5 rounded-md border border-cyan-500/50 focus:ring-1 focus:ring-cyan-300 focus:outline-none text-sm"
      />
    </div>
  );

  return (
    <div className="text-center max-w-3xl mx-auto p-4">
      <p className="mb-4 text-sm sm:text-base">
        This form is designed to test browser autofill. Use DevTools to create a profile and fill the form instantly.
      </p>
      
      <div className="bg-black/20 p-4 sm:p-6 rounded-xl shadow-inner text-left max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <h3 className="text-base font-semibold text-white border-b border-cyan-400/30 pb-1 mb-2">User Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField label="First Name" id="fname" autocomplete="given-name" />
            <InputField label="Last Name" id="lname" autocomplete="family-name" />
          </div>
          <InputField label="Email Address" id="email" autocomplete="email" type="email" />

          <h3 className="text-base font-semibold text-white border-b border-cyan-400/30 pb-1 mb-2 pt-2">Shipping Address</h3>
          <InputField label="Street Address" id="address" autocomplete="street-address" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField label="City" id="city" autocomplete="address-level2" />
            <InputField label="Postal Code" id="zip" autocomplete="postal-code" />
          </div>
          
          <div className="pt-2">
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-bold py-2 px-4 rounded-md transition-colors text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutofillDemo;
