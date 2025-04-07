'use client'

import { Card, CardContent } from "@/app/components/ui/Cards"
import { Header } from "@/app/components/ui/Header"
import Image from "next/image"
import { Button } from "@/app/components/ui/Buttons"
import UsersIcon from "@/app/assets/icons/users.png"
import { useQuery } from "@tanstack/react-query"
import { TutorDetailsResponse, TutorProfileResponse } from "@/app/types/api"
import apiClient from "@/app/lib/apiClient"
import { useParams } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import BarChart from "@/app/components/ui/Barchart"
import { DatePickerDropdown } from "@/app/components/ui/DateDropdown"
import { useState } from "react"
import WeeklySchedule from "@/app/components/ui/WeeklySchedule"
import { TutorDetailsSkeleton } from "@/app/components/skeletons/TutorDetailsSkeleton"


export default function TutorDetailsPage() {
    const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date }>({
        startDate: new Date(),
        endDate: new Date()
      });

    const { id } = useParams();
    const { data: summaryData, isLoading } = useQuery<TutorDetailsResponse>({
        queryKey: ['tutorDetails', id],
        queryFn: async () => {
            const response = await apiClient.get(`/api/Admin/tutor/${id}/summary`);
            return response.data;
        }
    });

    const {data: tutorProfile, isLoading: profileLoading } = useQuery<TutorProfileResponse>({
        queryKey: ['tutorProfile', id],
        queryFn: async () => {
            const response = await apiClient.get(`/api/Admin/tutorProfile/${id}`);
            return response.data;
        }
    });

    if(isLoading || profileLoading) {
        return <TutorDetailsSkeleton />
    }
 
    return (
        <div className="flex flex-col">
            <Header 
            userName="Admin" 
            header="Tutor Details" 
            backButton={{
                show: true,
                customRoute: `/dashboard/tutors/`
            }}/>

            <div className="p-6 space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-4 flex flex-col">
                        <p className="text-sm text-light-gray mb-2">Total Lessons Conducted</p>
                        <div className="flex items-center">
                            <p className="text-4xl text-dark-gray font-bold">{summaryData?.data.totalLessonsConducted}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col">
                        <p className="text-sm text-light-gray mb-2">Active Students</p>
                        <div className="flex items-center">
                            <p className="text-4xl text-dark-gray font-bold">{summaryData?.data.totalActiveStudents}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col">
                        <p className="text-sm text-light-gray mb-2">Approved Lessons to Teach</p>
                        <div className="flex items-center">
                            <p className="text-4xl text-dark-gray font-bold">{summaryData?.data.approvedSessionsToTeach}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col">
                        <p className="text-sm text-light-gray mb-2">Average Rating</p>
                        <div className="flex items-center">
                            <p className="text-4xl text-dark-gray font-bold">{summaryData?.data.averageRating}</p>
                            <div className="flex ml-2">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FontAwesomeIcon 
                                        key={index}
                                        icon={index < (summaryData?.data.averageRating ?? 0) ? faStar : faStarHalfAlt}
                                        className="text-yellow-500"
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-3 gap-6 items-start">
                    {/* Left Profile Section */}
                    <Card className="col-span-1 w-full shadow-lg self-start h-fit"> 
                        <CardContent className="flex flex-col items-center p-4 w-full"> {/* Reduced side padding */}
                            <div className="flex flex-col w-full">
                                {/* Profile Header - unchanged */}
<div className="flex items-center justify-between mb-4 w-full px-2">
    <h2 className="text-lg font-semibold">Profile</h2>
    <a href={`/dashboard/tutors/details/${id}/edit`}>
        <Image
            src={UsersIcon}
            alt="Users Icon"
            width={24}
            height={24}
            className="hover:opacity-80 transition-opacity"
        />
    </a>  
</div>

{/* Centered Profile Picture with perfect circle */}
<div className="flex justify-center mb-3">
    {tutorProfile?.data.profile.profilePicture ? (
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
                src={tutorProfile.data.profile.profilePicture}
                alt="Profile Image"
                width={128}
                height={128}
                className="w-full h-full object-cover"
            />
        </div>
    ) : (
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <FontAwesomeIcon 
                icon={faCircleUser}
                className="text-gray-400 text-7xl" 
            />
        </div>
    )}
</div>

{/* Centered Name */}
<h3 className="text-xl font-semibold mb-6 text-center w-full">
    {tutorProfile?.data.profile.fullName}
</h3>

{/* Profile Completion */}
<div className="w-full mb-4 px-2 mt-2">
                        <span className="text-gray-500">Profile Completion</span>
                            <div className="flex items-center gap-3"> 
                                <span className="font-medium text-primary">
                                {tutorProfile?.data.profile.profileCompletionPercentage}%
                                </span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                <div 
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{ width: `${tutorProfile?.data.profile.profileCompletionPercentage}%` }}
                                ></div>
                                </div>
                            </div>
                        </div>

                                {/* Profile Details */}
                                <div className="w-full space-y-3 px-2"> 
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.fullName || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.dateOfBirth || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.phoneNumber || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.emailAddress || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.location || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.gender || ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Ongoing Lessons</p>
                                        <p className="font-medium">{tutorProfile?.data.profile.ongoingLessons || ""}</p>
                                    </div>
                                </div>

                                {/* <Button className="w-full mt-4 max-w-sm mx-auto"> 
                                    Generate Report
                                </Button> */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Content Section */}
                    <div className="col-span-2 space-y-4">
                    {/* First Row - Full width schedule */}
                    
                    <div className="col-span-2">
                        <WeeklySchedule tutorId={id as string} />
                    </div>

                    {/* Second Row - Split view */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="h-full w-full flex flex-col">
                            {/* Header */}
                            <h3 className="font-semibold p-4 text-left">For My Actions</h3>
                            
                            {/* Content Area */}
                            <CardContent className="flex-1 flex flex-col justify-between p-4">
                            <div className="flex-1 flex flex-col justify-between space-y-4">
                                <div className="flex items-center justify-between w-full gap-35">
                                <span className="text-dark-gray text-left">Review Certifications</span>
                                <span className="text-primary text-xs font-medium">3</span>
                                </div>
                                
                                <div className="flex items-center justify-between w-full gap-35">
                                <span className="text-dark-gray text-left">Approve Subjects</span>
                                <span className="text-primary text-xs font-medium">1</span>
                                </div>
                                
                                <div className="flex items-center justify-between w-full gap-35">
                                <span className="text-dark-gray text-left">Incomplete Lessons</span>
                                <span className="text-primary text-xs font-medium">2</span>
                                </div>
                                
                                <div className="flex items-center justify-between w-full gap-35">
                                <span className="text-dark-gray text-left">Pending Invoices</span>
                                <span className="text-primary text-xs font-medium">16</span>
                                </div>
                            </div>
                            </CardContent>
                        </Card>



                            <Card>
                            <div className="flex flex-col space-y-2 p-4">
                                <div className="flex justify-between items-center">
                                <h3 className="font-semibold">Number of Classes</h3>
                                <DatePickerDropdown onChange={(range) => setDateRange(range)} />
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="h-64 w-full">
                                <BarChart dateRange={dateRange} />
                                </div>
                            </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}