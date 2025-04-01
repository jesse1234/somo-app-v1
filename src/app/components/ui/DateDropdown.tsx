'use client'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { RangeKeyDict, Range } from 'react-date-range';

interface DatePickerDropdownProps {
  onChange: (dateRange: { startDate: Date; endDate: Date }) => void;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({ onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selectedRange = ranges.selection;
    if (selectedRange) {
      setDateRange([selectedRange]);
      onChange({
        startDate: selectedRange.startDate || new Date(),
        endDate: selectedRange.endDate || new Date()
      });
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        {format(dateRange[0].startDate!, 'MMM d')} - {format(dateRange[0].endDate!, 'MMM d')}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showPicker && (
        <div className="absolute right-0 z-10 mt-2 bg-white shadow-lg rounded-md p-2">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
          <div className="flex justify-end p-2">
            <button 
              onClick={() => setShowPicker(false)}
              className="text-sm text-primary"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
