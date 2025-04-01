import React from 'react';

export function SearchBar() {
    return (
        <div className="flex items-center">
            <div className="relative flex items-center">
                <input 
                    type="text"
                    placeholder="Search anything here..."
                    className='w-64 px-5 py-2 text-sm text-secondary bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary'
                 /> 
                 <button className="absolute right-2">
                    <svg 
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" 
                            />
                        </svg>
                 </button>
            </div>
        </div>
    )
}