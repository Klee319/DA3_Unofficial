import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

function CustomSelect({ value, onChange, options, label, id }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    // 外側クリックで閉じる
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { value: optionValue } });
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="custom-select-wrapper" ref={selectRef}>
            {label && <label className="custom-select-label" htmlFor={id}>{label}</label>}
            <div 
                className={`custom-select ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                id={id}
            >
                <div className="custom-select-trigger">
                    <span>{selectedOption?.label || value}</span>
                    <svg 
                        className="custom-select-arrow" 
                        width="12" 
                        height="8" 
                        viewBox="0 0 12 8" 
                        fill="none"
                    >
                        <path 
                            d="M1 1L6 6L11 1" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isOpen && (
                    <div className="custom-select-options" role="listbox">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                                role="option"
                                aria-selected={value === option.value}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomSelect;
