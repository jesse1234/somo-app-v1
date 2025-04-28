'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Buttons';

interface FilterOption {
    key: string;
    label: string;
    options?: { value: string; label: string; }[];
    type?: 'select' | 'number';
    min?: number;
    max?: number;
}

interface FilterButtonProps {
    onApply: (filters: Record<string, string | number>) => void;
    filterOptions: FilterOption[];
}

export function FilterButton({ onApply, filterOptions }: FilterButtonProps) {
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [filters, setFilters] = useState<Record<string, string | number>>({});

    const handleFilterChange = (key: string, value: string | number) => {
        setFilters(prev => ({
            ...prev, 
            [key]: value
        }));
    };

    const handleApply = () => {
        setShowFilterDropdown(false);
        onApply(filters);
    }

    return (
        <div className="relative">
            <button
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-200"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
                <FontAwesomeIcon icon={faFilter} style={{color: "#23417F"}}/>
                <span>Apply Filter</span>
            </button>

            {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 p-4">
                    <div className="space-y-4">
                        {filterOptions.map((option) => (
                            <div key={option.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{option.label}</label>
                                {option.type === 'number' ? (
                                    <input 
                                        type="number"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={filters[option.key] || ''}
                                        onChange={(e) => handleFilterChange(
                                            option.key,
                                            e.target.value ? parseInt(e.target.value) : ''
                                        )}
                                        min={option.min}
                                        max={option.max}
                                        placeholder={`Enter ${option.label}`}
                                    />
                                ) : (
                                    <select 
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={filters[option.key] || ''}
                                        onChange={(e) => handleFilterChange(option.key, e.target.value)}
                                    >
                                        <option value="">All {option.label}</option>
                                        {option.options?.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}

                        <Button
                            variant="default"
                            onClick={handleApply}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}