'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { SearchProvider } from '../contexts/SearchContext'

export function Providers({ children }: {children: React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                {children}
            </SearchProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
