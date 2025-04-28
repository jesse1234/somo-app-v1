'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    executeSearch: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchTerm, setSearchTerm] = useState('');

    const executeSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, executeSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}