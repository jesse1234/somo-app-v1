'use client'
import { Header } from "@/app/components/ui/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "@/app/components/ui/Table";
import { ColumnDef } from "@tanstack/react-table";
//import { Row } from "@tanstack/react-table";
import apiClient from "@/app/lib/apiClient";
import { StudentResponse, StudentData } from "@/app/types/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/app/components/ui/Link";
import Image from "next/image";
import { StudentsTableSkeleton } from "@/app/components/skeletons/TableSkeletons";
import { Button } from "@/app/components/ui/Buttons";

export default function AdminPage() {
  const { data, isLoading, error } = useQuery<StudentResponse>({
      queryKey: ['students'],
      queryFn: async () => {
          const response = await apiClient.get('/api/Admin/getAllStudents');
          return response.data;
      }
  });

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
              <Link href={`/dashboard/students/profile/${row.original.studentId}`}>
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
          // Using ongoingLessons to determine status since numberOfStudents isn't available
          cell: ({ row }) => (
              <span className={`px-2 py-1 rounded-full text-sm ${
                row.original.ongoingLessons > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                  {row.original.ongoingLessons > 0 ? 'Active' : 'Inactive'}
              </span>
          ),
      },
  ];

  if (isLoading) {
    return <StudentsTableSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading student data</div>;
  }

  if (!data?.data?.length) {
    return (
      <div className="flex flex-col">
        <Header userName="Admin" header="Students" showFilter={true}/>
        <div className="p-6 bg-white rounded-lg shadow">
          <p>No students found</p>
        </div>
      </div>
    );
  }

  return (
      <div className="flex flex-col">
          <Header userName="Admin" header="Students" showFilter={true}/>
          <div className="flex justify-end mb-2">
            <Link href='/dashboard/admin/create_admin'><Button variant='default'>Create Admin</Button></Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
              <DataTable columns={columns} data={data.data} />
          </div>
      </div>
  );
}