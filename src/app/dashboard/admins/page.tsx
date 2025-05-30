'use client'
import { Header } from "@/app/components/ui/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "@/app/components/ui/Table";
// import { ColumnDef, Row } from "@tanstack/react-table";
import { Row } from "@tanstack/react-table";
// import apiClient from "@/app/lib/apiClient";
import {  AdminResponse } from "@/app/types/api";
// import { useQuery } from "@tanstack/react-query";
import { Link } from "@/app/components/ui/Link";
import Image from "next/image";
import { StudentsTableSkeleton } from "@/app/components/skeletons/TableSkeletons";
import { Button } from "@/app/components/ui/Buttons";
import { useGetAdmins } from "@/store/useGetAdmins";

export default function AdminPage() {
  const { data, isLoading, error } = useGetAdmins()

  const columns = [
      {
        header: 'Name',
        accessorKey: 'fullName',
        cell: ({ row }: { row: Row<AdminResponse['data'][number]>}) => (
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              {row.original.profilePicture ? (
                <Image
                  src={row.original.profilePicture}
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
              <Link href={`/dashboard/students/profile/${row.original.id}`}>
                <div className="ml-2 font-medium text-dark-gray hover:text-primary">
                  {row.original.fullName}
                </div>
              </Link>
            </div>
          </div>
        )
      },
      {
          header: 'Email',
          accessorKey: 'email',
      },
      {
          header: 'Status',
          accessorKey: 'status',
          cell: ({ row }: { row: Row<AdminResponse['data'][number]>}) => (
              <span className={`px-2 py-1 rounded-full text-sm ${row.original.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {row.original.status === 'Active' ? 'Active' : 'Inactive'}
              </span>
          ),
      },
  ];

  if (isLoading) {
    return <StudentsTableSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading admin data</div>;
  }

  if (!data?.data?.length) {
    return (
      <div className="flex flex-col">
        <Header userName="Admin" header="Students" />
        <div className="p-6 bg-white rounded-lg shadow">
          <p>No admins found</p>
        </div>
      </div>
    );
  }

  return (
      <div className="flex flex-col">
          <Header userName="Admin" header="Admins" />
          <div className="flex justify-end mb-2">
            <Link href='/dashboard/admins/create_admin'><Button variant='default'>Create Admin</Button></Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
              <DataTable columns={columns} data={data.data} />
          </div>
      </div>
  );
}