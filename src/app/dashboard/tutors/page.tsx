'use client';
import { Header } from "@/app/components/ui/Header";
import { DataTable } from "@/app/components/ui/Table";
import { Row } from "@tanstack/react-table";
import { Tutor } from "@/app/types/api";
//import apiClient from "@/app/lib/apiClient";
//import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/app/components/ui/Link";
import { TutorsTableSkeleton } from "@/app/components/skeletons/TableSkeletons";
import { useTutors } from "@/store/useGetTutors";
import { useState } from "react";
import { Pagination } from "@/app/components/ui/Pagination";

export default function TutorsPage() {
    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: 10,
        sortBy: "FullName",
        sortDescending: false,
        searchTerm: ''
    })
    const { data, isLoading, isError } = useTutors(queryParams)

    if(isLoading) {
        return <TutorsTableSkeleton />
    }

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
                        <Link href={`/dashboard/tutors/details/${row.original.id}`}>
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
                <span className={`px-2 py-1 rounded-full text-sm ${row.original.numberOfStudents > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {row.original.numberOfStudents > 0 ? 'Active' : 'Inactive'}
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
        setQueryParams(prev => ({
            ...prev,
            page,
        }))
    };

    // if (isLoading) {
    //     return <div className="text-center text-lg">Loading tutors...</div>;
    // }

    if (isError) {
        return <div className="text-center text-lg text-red-600">Failed to load tutors. Please try again later.</div>;
    }

    return (
        <div className="flex flex-col">
            <Header userName="Admin" header="Tutors" showFilter={true} />
            <div className="p-6 bg-white rounded-lg shadow">
                <DataTable 
                    columns={columns} 
                    data={data?.data.tutors || []}
                    onSortChange={(sortBy, sortDescending) => {
                       setQueryParams(prev => ({
                        ...prev,
                        sortBy,
                        sortDescending,
                        page: 1
                       }));
                    }} 
                />
                <Pagination 
                    currentPage={pagination?.currentPage || 1}
                    totalPages={pagination?.totalPages || 1}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
