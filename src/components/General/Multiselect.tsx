import React, { useState, useRef, useEffect } from 'react';
import { Option } from '../../types/Option';

interface MultiSelectProps {
  options: Option[];
  placeholder: string;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, setSelectedOptions, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const multiSelectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(item => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (multiSelectRef.current && !multiSelectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabels = selectedOptions
    .map(val => options.find(option => option.value === val)?.label)
    .filter(label => label !== undefined)
    .join(', ');

  return (
    <div className="relative inline-block text-left" ref={multiSelectRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {selectedOptions.length > 0 
          ? selectedLabels
          : placeholder
        }
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map(option => (
              <label key={option.value} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
