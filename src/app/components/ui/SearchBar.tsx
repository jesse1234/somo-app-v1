'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState('');

    // Only enable search on these routes
    const searchableRoutes = [
        '/dashboard/students',
        '/dashboard/tutors'
    ];

    // Debounced search handler
    const handleSearch = debounce((term: string) => {
        if (!searchableRoutes.some(route => pathname.startsWith(route))) {
            return; // Skip if current page doesn't support search
        }

        const params = new URLSearchParams(window.location.search);
        if (term) {
            params.set('searchTerm', term);
            params.set('page', '1'); // Reset to first page when searching
        } else {
            params.delete('searchTerm');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        // Initialize search term from URL
        const params = new URLSearchParams(window.location.search);
        setSearchTerm(params.get('searchTerm') || '');
    }, []);

    return (
        <div className="flex items-center">
            <div className="relative flex items-center">
                <input 
                    disabled={!searchableRoutes.some(route => pathname.startsWith(route))}
                    className={`w-64 px-5 py-2 text-sm text-secondary bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
                        !searchableRoutes.some(route => pathname.startsWith(route))
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    type="text"
                    placeholder="Search anything here..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    //className='w-64 px-5 py-2 text-sm text-secondary bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary'
                /> 
                <button className="absolute right-2">
                    <svg 
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
    );
}