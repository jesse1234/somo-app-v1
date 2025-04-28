'use client';
import { Header } from "@/app/components/ui/Header";
import { DataTable } from "@/app/components/ui/Table";
import { Row } from "@tanstack/react-table";
import { Tutor } from "@/app/types/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/app/components/ui/Link";
import { TutorsTableSkeleton } from "@/app/components/skeletons/TableSkeletons";
import { useTutors } from "@/store/useGetTutors";
import { useEffect, useState } from "react";
import { Pagination } from "@/app/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { Label } from "@/app/components/ui/Label";
import { FilterButton } from "@/app/components/ui/FilterButton";

export default function TutorsPage() {
    const searchParams = useSearchParams();

    const [queryParams, setQueryParams] = useState({
        page: parseInt(searchParams.get('page') || '1'),
        pageSize: parseInt(searchParams.get('pageSize') || '10'),
        sortBy: searchParams.get('sortBy') || "FullName",
        sortDescending: searchParams.get('sortDescending') === 'true' || false,
        searchTerm: searchParams.get('searchTerm') || '',
        status: searchParams.get('status') || '',
        startDate: searchParams.get('startDate') || '',
        endDate: searchParams.get('endDate') || '',
        minStudents: parseInt(searchParams.get('minStudents') || ''),
        maxStudents: parseInt(searchParams.get('maxStudents') || ''),
    })

    useEffect(() => {
        setQueryParams({
            page: parseInt(searchParams.get('page') || '1'),
            pageSize: parseInt(searchParams.get('pageSize') || '10'),
            sortBy: searchParams.get('sortBy') || "FullName",
            sortDescending: searchParams.get('sortDescending') === 'true' || false,
            searchTerm: searchParams.get('searchTerm') || '',
            status: searchParams.get('status') || '',
            startDate: searchParams.get('startDate') || '',
            endDate: searchParams.get('endDate') || '',
            minStudents: parseInt(searchParams.get('minStudents') || ''),
            maxStudents: parseInt(searchParams.get('maxStudents') || ''),
        });
    }, [searchParams])

    const { data, isLoading, isError } = useTutors(queryParams);

    const handleFilterApply = (filters: Record<string, string | number>) => {
        const params = new URLSearchParams(window.location.search);

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '' && value !== undefined) {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
        });
        params.set('page', '1');
        const newUrl = `${window.location.search}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
    };

    if(isLoading) {
        return <TutorsTableSkeleton />
    };

    const columns = [
        {
            header: 'Tutor',
            accessorKey: 'fullName',
            cell: ({ row }: { row: Row<Tutor> }) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 fa-3x" />
                    </div>
                    <div className="flex flex-col">
                        <Link href={`/dashboard/tutors/details/${row.original.id}`} >
                            <div className="font-medium text-dark-gray hover:text-primary">{row.original.fullName}</div>
                        </Link>
                        <div className="text-sm text-gray-500">{row.original.email}</div>
                    </div>
                </div>
            ),
        },
        // {
        //     header: 'Id',
        //     accessorKey: 'id',
        // },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Phone',
            accessorKey: 'phoneNumber',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }: { row: Row<Tutor> }) => (
                <span className={`px-2 py-1 rounded-full text-sm ${row.original.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {row.original.status === 'Active' ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            header: 'Number of Students',
            accessorKey: 'numberOfStudents',
        },
    ];

    const pagination = data?.data.pagination

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page.toString());
        window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
        // setQueryParams(prev => ({
        //     ...prev,
        //     page,
        // }))
    };

    // if (isLoading) {
    //     return <div className="text-center text-lg">Loading tutors...</div>;
    // }

    if (isError) {
        return <div className="text-center text-lg text-red-600">Failed to load tutors. Please try again later.</div>;
    }

    if (!data?.data?.tutors?.length) {
        return (
            <div className="flex flex-col">
                <Header userName="Admin" header="Tutors"  />
                <div className="p-6 bg-white rounded-lg shadow">
                    <p>No tutors found {queryParams.searchTerm && `matching "${queryParams.searchTerm}"`}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Header userName="Admin" header="Tutors"  />

            <div className="fixed top-5 right-130 z-50">
                <FilterButton
                    onApply={handleFilterApply}
                    filterOptions={[
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'select',
                            options: [
                                { value: 'Active', label: 'Active'},
                                { value: 'Inactive', label: 'Inactive'}
                            ]
                        },
                        {
                            key: 'minStudents',
                            label: 'Minimum Students',
                            type: 'number',
                            min: 0
                        },
                        {
                            key: 'maxStudents',
                            label: 'Maximum Students',
                            type: 'number',
                            min: 0 
                        }
                    ]} 
                />
            </div>

            <div className="mb-4 flex items-center justify-end space-x-2">
                <Label htmlFor="pageSize">Show</Label>
                <select 
                    id="pageSize"
                    value={queryParams.pageSize}
                    onChange={(e) => {
                        const newSize = parseInt(e.target.value);
                        const params = new URLSearchParams(window.location.search);
                        params.set('pageSize', newSize.toString());
                        params.set('page', '1');
                        window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
                        setQueryParams(prev => ({
                            ...prev,
                            pageSize: newSize,
                            page: 1
                        }));
                    }}
                    className='border border-gray-300 rounded p-1 text-sm bg-white text-dark-gray'
                >
                    {[10, 20, 30, 50, 100].map(size => (
                        <option key={size} value={size}>
                            {size} entries
                        </option>
                    ))}
                </select>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
                <DataTable 
                    columns={columns} 
                    data={data?.data.tutors || []}
                    onSortChange={(sortBy, sortDescending) => {
                    //    setQueryParams(prev => ({
                    //     ...prev,
                    //     sortBy,
                    //     sortDescending,
                    //     page: 1
                    //    }));
                    const params = new URLSearchParams(window.location.search);
                    params.set('sortBy', sortBy);
                    params.set('sortDescending', sortDescending.toString());
                    params.set('page', '1');
                    window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`)
                    }} 
                />
                {pagination && (
                    <Pagination 
                    currentPage={pagination?.currentPage || 1}
                    totalPages={pagination?.totalPages || 1}
                    onPageChange={handlePageChange}
                />
                )}
            </div>
        </div>
    );
}
