'use client';

import { Card, CardContent } from '@/app/components/ui/Cards';
import { Button } from '@/app/components/ui/Buttons';
import { Header } from '@/app/components/ui/Header';
import Image from 'next/image';
import { Input } from '@/app/components/ui/Input';
//import { StudentProfileResponse } from '@/app/types/api';
//import { useQuery } from '@tanstack/react-query';
//import apiClient from '@/app/lib/apiClient';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { StudentProfileSkeleton } from '@/app/components/skeletons/ProfileSkeletons';
import { useStudentProfile } from '@/store/useGetStudentProfile';

export default function StudentProfilePage() {
  const { id } = useParams();
  
  const { data: studentProfile, isLoading, error } = useStudentProfile(id as string);

  if (isLoading) return <StudentProfileSkeleton />;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="flex flex-col">
      <Header 
            userName="Admin" 
            header="Students" 
            backButton={{
                show: true,
                customRoute: `/dashboard/students/`
            }}
        />

      <div className="grid grid-cols-4 gap-6 p-6 items-start">
        {/* Left Sidebar - Parent Account */}
        <Card className="col-span-1 shadow-lg self-start h-fit">
          <CardContent className="flex flex-col items-center p-6">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 mb-4">
              {studentProfile?.data.parentAccount.profilePicture ? (
                <Image
                  src={studentProfile.data.parentAccount.profilePicture}
                  alt="Profile Picture"
                  className="rounded-full"
                  width={128}
                  height={128}
                />
              ) : (
                <FontAwesomeIcon 
                  icon={faCircleUser}
                  className="text-gray-400 fa-8x" 
                />
              )}
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {studentProfile?.data.parentAccount.fullName}
            </h2>

            {/* Profile Completion */}
            <div className="w-full mb-4 px-2 mt-2">
              <span className="text-gray-500">Profile Completion</span>
                  <div className="flex items-center gap-3"> 
                    <span className="font-medium text-primary">
                      {studentProfile?.data.parentAccount.profileCompletionPercentage}%
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${studentProfile?.data.parentAccount.profileCompletionPercentage}%` }}
                      ></div>
                  </div>
                </div>
              </div>

            {/* Profile Details */}
            <div className="w-full mt-6 space-y-4">
              <div>
                <p className="text-sm text-dark-gray">Name</p>
                <p className="font-medium">{studentProfile?.data.parentAccount.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">Phone</p>
                <p className="font-medium">{studentProfile?.data.parentAccount.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">Email</p>
                <p className="font-medium">{studentProfile?.data.parentAccount.emailAddress}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">Gender</p>
                <p className="font-medium">
                  {studentProfile?.data.parentAccount.gender || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">Ongoing Lessons</p>
                <p className="font-medium">
                  {studentProfile?.data.parentAccount.ongoingLessons}
                </p>
              </div>
            </div>

            {/* Generate Report Button */}
            <Button className="w-full mt-6 text-white" variant="default">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Right Content - Child Accounts */}
        <div className="col-span-3 space-y-6">
          {studentProfile?.data.childAccounts && studentProfile.data.childAccounts.length > 0 ? (
            studentProfile.data.childAccounts.map((child, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6 flex items-center">
                  {/* Child Header - Updated Image Container */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
                      {child.profilePicture ? (
                        <Image
                          src={child.profilePicture}
                          alt={child.fullName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <FontAwesomeIcon 
                            icon={faCircleUser} 
                            className="text-gray-400 text-3xl" 
                          />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{child.fullName}</h3>
                  </div>
                  <div className="flex space-x-3 ml-auto">
                    <Button variant="outline">Save</Button>
                    <Button>Generate Report</Button>
                  </div>
                </CardContent>

                {/* Child Details */}
                <CardContent className="p-6 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-dark-gray mb-2">Full Names</p>
                    <Input
                      type="text"
                      className="w-full"
                      value={child.fullName}
                      readOnly
                    />
                  </div>
                  <div>
                    <p className="text-sm text-dark-gray mb-2">Phone</p>
                    <Input
                      type="text"
                      className="w-full"
                      value={child.phoneNumber}
                      readOnly
                    />
                  </div>
                  <div>
                    <p className="text-sm text-dark-gray mb-2">Email Address</p>
                    <Input
                      type="email"
                      className="w-full"
                      value={child.emailAddress}
                      readOnly
                    />
                  </div>
                  <div>
                    <p className="text-sm text-dark-gray mb-2">Date of Birth</p>
                    <Input
                      type="text"
                      className="w-full"
                      value={child.dateOfBirth}
                      readOnly
                    />
                  </div>
                  <div>
                    <p className="text-sm text-dark-gray mb-2">Gender</p>
                    <Input
                      type="text"
                      className="w-full"
                      value={child.gender}
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No child accounts found</p>
              </CardContent>
            </Card>
          )}
        </div>
              </div>
            </div>
          );
}