import React, { useState } from 'react';
import PropTypes from 'prop-types';

const countries = [
  { code: '+234', label: '🇳🇬', name: 'Nigeria' },
  { code: '+1', label: '🇺🇸', name: 'USA' },
  { code: '+44', label: '🇬🇧', name: 'UK' },
  // Add more as needed
];

const PhoneField = ({
  id,
  name,
  value,
  handleChange,
  errorMessage,
  className,
  floatingLabel,
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [selectedCode, setSelectedCode] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCountrySelect = (country) => {
    setSelectedCode(country);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => setHasFocus(true);
  const handleInputBlur = () => setHasFocus(false);

  return (
    <div className={`relative w-full mb-4 ${className}`}>
      <div className="flex items-center border rounded px-2 py-1 focus-within:ring-1 focus-within:ring-cFF0 focus-within:border-cFF0">
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 px-2 text-gray-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedCode.label}</span>
            <span className="ml-1">{selectedCode.code}</span>
            <svg
              className="w-3 h-3 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 bg-white border mt-1 rounded shadow w-28 max-h-40 overflow-y-auto text-sm">
              {countries.map((country) => (
                <li
                  key={country.code}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCountrySelect(country)}
                >
                  {country.label} {country.code}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="tel"
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="flex-1 ml-2 outline-none bg-transparent placeholder-gray-400"
          placeholder="Phone number"
        />
      </div>
      <label
        htmlFor={name}
        className="absolute left-3 px-2 top-2.5 duration-200 text-dark-grey transition-all hidden peer-focus:block peer-focus:bg-white peer-placeholder-shown:text-sm peer-focus:-top-4"
      >
        {floatingLabel} 
      </label>
      {/* Help/error text */}
      {hasFocus && errorMessage === '' && (
        <div className="text-sm text-gray-500 mt-1">Enter your phone number.</div>
      )}
      {errorMessage && (
        <div className="text-sm text-red-500 mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

PhoneField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  floatingLabel: PropTypes.string,
};

PhoneField.defaultProps = {
  errorMessage: '',
  className: '',
  floatingLabel: 'Phone Number',
};

export default PhoneField;
