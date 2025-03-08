import React, { useState, useEffect, useRef } from 'react';
import '../css/Dropdown.css'

interface DropdownProps {
  options: string[];
  multiple?: boolean;             // toggle multi select
  selectedValues?: string[];
  selectedValue?: string;
  onChange?: (selected: string | string[]) => void;
  placeholder?: string;
  label?: string;
  truncateDisplayText?: boolean   // true => truncate spillover text, false => expand textbox
  showNone?: boolean              // show "None" selection to clear option. Only available for single select.
  showSelectAll?: boolean;        // show "select all" / "deselect all" toggle. Only available for multi select.
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  multiple = false,
  selectedValues = [],
  selectedValue = '',
  onChange,
  placeholder = 'Select...',
  label,
  truncateDisplayText = true,
  showNone = true,
  showSelectAll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Local state
  const [localSelectedValues, setLocalSelectedValues] = useState<string[]>(selectedValues);
  const [localSelectedValue, setLocalSelectedValue] = useState<string>(selectedValue);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Make sure clicking  outside closes the dropdown
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);

  // This keeps the local state in sync if props change
  useEffect(() => {
    setLocalSelectedValues(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    setLocalSelectedValue(selectedValue);
  }, [selectedValue]);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };


  const handleSingleSelect = (option: string) => {

    setLocalSelectedValue(option);
    setIsOpen(false);
    onChange && onChange(option);

  };


  const handleMultiSelect = (option: string) => {

    let newSelected: string[];
    if (localSelectedValues.includes(option)) {
      newSelected = localSelectedValues.filter((val) => val !== option);
    } else {
      newSelected = [...localSelectedValues, option];
    }
    setLocalSelectedValues(newSelected);
    onChange && onChange(newSelected);

  };


  const decideMultipleOrSingle = (option: string) => {
    multiple ? handleMultiSelect(option) : handleSingleSelect(option)
  };


  const handleSelect = (option: string) => {

    const isSelected = multiple
      ? localSelectedValues.includes(option)
      : localSelectedValue === option;

    return (

      <div
        key={option}
        className={`dropdown-item ${isSelected ? 'selected-item' : ''}`}
        onClick={() => decideMultipleOrSingle(option)}
      >
        {multiple && (
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className = 'checkbox'
          />
        )}
        {option}
      </div>

    );
  }

  
  const handleSelectAll = () => {

    if (localSelectedValues.length === options.length) {

      // if all values are selected, we should deselect them
      setLocalSelectedValues([]);
      onChange && onChange([]);

    } else {

      // if not all values are selected, we should select them all
      setLocalSelectedValues([...options]);
      onChange && onChange([...options]);

    }

  };

  // For placeholder text which displays when dropdown is closed
  let displayText = placeholder;
  if (multiple) {
    if (localSelectedValues.length === 0) {
      displayText = placeholder;
    } else {
      displayText = localSelectedValues.join(', ');
    }
  } else {
    displayText = localSelectedValue || placeholder;
  }




  return (
    
    <div className='dropdown-container' ref={dropdownRef}>

      {label && 
        <label className='dropdown-label'>
          {label}
        </label>
      }

      <div
        className={`dropdown-toggle ${truncateDisplayText ? 'truncate-text' : 'expand-text'}`}
        onClick={toggleDropdown}
      >
        {displayText}
      </div>

      {isOpen && (

        <div className='dropdown-menu'>

          {!multiple && showNone && (
            <div
              className="dropdown-item"
              onClick={() => handleSingleSelect('')}
            >
              None
            </div>
          )}

          {multiple && showSelectAll && (
            <div
              className={`select-deselect-all`}
              onClick={handleSelectAll}
            >
              {localSelectedValues.length === options.length
                ? 'Deselect All'
                : 'Select All'}
            </div>
          )}

          {options.map((option) => handleSelect(option))}

        </div>

      )}
      
    </div>

  );

};

export default Dropdown;