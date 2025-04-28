'use client'
import { Header } from "@/app/components/ui/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "@/app/components/ui/Table";
import { ColumnDef } from "@tanstack/react-table";
import { StudentData } from "@/app/types/api";
import { Link } from "@/app/components/ui/Link";
import Image from "next/image";
import { StudentsTableSkeleton } from "@/app/components/skeletons/TableSkeletons";
import { useStudents } from "@/store/useGetStudents";
import { useEffect, useState } from "react";
import { Pagination } from "@/app/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { Label } from "@/app/components/ui/Label";
import { FilterButton } from "@/app/components/ui/FilterButton";

export default function StudentsPage() {
  const searchParams = useSearchParams();

  const [queryParams, setQueryParams] = useState({
    page: parseInt(searchParams.get('page') || '1'),
    pageSize: 10,
    sortBy: searchParams.get('sortBy') || 'FullName',
    sortDescending: searchParams.get('sortDescending') === 'true' || false,
    searchTerm: searchParams.get('searchTerm') || '',
    accountType: searchParams.get('accountType') || '',
    status: searchParams.get('status') || '',
  });

  useEffect(() => {
    setQueryParams({
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '10'),
      sortBy: searchParams.get('sortBy') || 'FullName',
      sortDescending: searchParams.get('sortDescending') === 'true' || false,
      searchTerm: searchParams.get('searchTerm') || '',
      accountType: searchParams.get('accountType') || '',
      status: searchParams.get('status') || '',
    })
  }, [searchParams])

  const { data, isLoading, error } = useStudents(queryParams);

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
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newUrl);
  };

  const columns: ColumnDef<StudentData>[] = [
      {
        header: 'Name',
        accessorKey: 'fullName',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              {row.original.studentName.profilePicture ? (
                <Image
                  src={row.original.studentName.profilePicture}
                  alt="Student Avatar"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <FontAwesomeIcon 
                    icon={faCircleUser} 
                    className="text-gray-500 text-3xl" 
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <Link href={`/dashboard/students/profile/${row.original.studentId}`} >
                <div className="ml-2 font-medium text-dark-gray hover:text-primary">
                  {row.original.studentName.fullName}
                </div>
              </Link>
            </div>
          </div>
        )
      },
      {
          header: 'Account Holder',
          accessorKey: 'accountHolder',
      },
      {
          header: 'Ongoing Lessons',
          accessorKey: 'ongoingLessons',
      },
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
          cell: ({ row }) => (
              <span className={`px-2 py-1 rounded-full text-sm ${
                row.original.status === "Active" 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                  {row.original.status === "Active" ? 'Active' : 'Inactive'}
              </span>
          ),
      },
  ];

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
    // setQueryParams(prev => ({
    //   ...prev,
    //   page
    // }));
  };

  // const handleSearch = (searchTerm: string) => {
  //   setQueryParams(prev => ({
  //     ...prev,
  //     searchTerm,
  //     page: 1
  //   }))
  // }

  if (isLoading) {
    return <StudentsTableSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading student data</div>;
  }

  // if (data && data.students && data.students.length === 0) {
  //   return (
  //     <div className="flex-flex-col">
  //       <Header userName="Admin" header="Students" showFilter={true}/>
  //       <div className="p-6 bg-white rounded-lg shadow">
  //         <p>No students found matching your search criteria</p>
  //       </div>
  //     </div>
  //   )
  // }

  if (!data?.students?.length) {
    return (
      <div className="flex flex-col">
        <Header userName="Admin" header="Students" />
        <div className="p-6 bg-white rounded-lg shadow">
          <p>No students found {queryParams.searchTerm && ` matching "${queryParams.searchTerm}"`}</p>
        </div>
      </div>
    );
  }

  return (
      <div className="flex flex-col">
          <Header userName="Admin" header="Students" />

          <div className="fixed top-5 right-130 z-50">
            <FilterButton 
              onApply={handleFilterApply}
              filterOptions={[
                {
                  key: 'accountType',
                  label:'Account Type',
                  type: 'select',
                  options: [
                    { value: 'Parent', label: 'Parent Account'},
                    { value: 'Child', label: 'Child Account'}
                  ]
                },
                {
                  key: 'status',
                  label: 'Status',
                  type: 'select',
                  options: [
                    { value: 'Active', label: 'Active'},
                    { value: 'Inactive', label: 'Inactive'}
                  ]
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
                className='border border-gray-300 rounded p-1 text-sm bg-white'
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
                data={data?.students || []}
                onSortChange={(sortBy, sortDescending) => {
                  
                  
                  const params = new URLSearchParams(window.location.search);
                  params.set('sortBy', sortBy);
                  params.set('sortDescending', sortDescending.toString());
                  params.set('page', '1');
                  window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`)
                }} 
                />
                {data?.pagination && (
                  <Pagination 
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
          </div>
      </div>
  );
}