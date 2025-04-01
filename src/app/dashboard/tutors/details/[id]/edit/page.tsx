'use client'

import React, { useState } from 'react';
import { Card, CardContent } from "@/app/components/ui/Cards";
import { Header } from "@/app/components/ui/Header";
import { Button } from "@/app/components/ui/Buttons";
import Image from "next/image";
import CustomStepper from '@/app/components/ui/CustomStepper';
import { ColumnDef } from '@tanstack/react-table';
import { Input } from '@/app/components/ui/Input';
import { DataTable } from '@/app/components/ui/Table';
import { DocumentIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { TutorProfileResponse } from "@/app/types/api" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faStar } from "@fortawesome/free-solid-svg-icons"
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/app/lib/apiClient';
import { AboutStepSkeleton, DocumentsStepSkeleton, ReportStepSkeleton, StepperSkeleton, TutorEditProfileSkeleton, TutorEditSkeleton } from '@/app/components/skeletons/TutorEditProfileSkeleton';

type Document = {
    name: string;
    documentUrl: string;
};

type TableInstance = {
    getIsAllRowsSelected: () => boolean;
    getIsSomeRowsSelected: () => boolean;
    getToggleAllRowsSelectedHandler: () => (event: unknown) => void;
  };
  
  type RowInstance = {
    getIsSelected: () => boolean;
    getToggleSelectedHandler: () => (event: unknown) => void;
    original: Document;
  };


export default function TutorEditPage() {
    const [activeStep, setActiveStep] = useState(0);
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, [])

    const { id } = useParams();
    const {data: tutorProfile, isLoading: profileLoading } = useQuery<TutorProfileResponse>({
        queryKey: ['tutorProfile', id],
        queryFn: async () => {
            const response = await apiClient.get(`/api/Admin/tutorProfile/${id}`);
            return response.data;
        }
    });

    if(profileLoading) return <TutorEditSkeleton />

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleStepClick = (step: number) => {
        setActiveStep(step);
    };

    const steps = [
        { label: 'About' },
        { label: 'Documents' },
        { label: 'Report' }
    ];

    const documents: Document[] = [
        {
            name: 'National ID',
            documentUrl: tutorProfile?.data.documents.nationalId || '',
        },
        {
            name: 'Certificate of Good Conduct',
            documentUrl: tutorProfile?.data.documents.goodConduct || '',
        },
        {
            name: 'KRA PIN',
            documentUrl: tutorProfile?.data.documents.kraPin || '',
        },
        {
            name: 'CPP',
            documentUrl: tutorProfile?.data.documents.birthCertificate || '',
        },
        {
            name: 'Passport Photo',
            documentUrl: tutorProfile?.data.documents.birthCertificate || '',
        },
    ];
    
    const columns: ColumnDef<Document>[] = [
        {
            id: 'select',
            header: ({ table }: { table: TableInstance }) => {
                const isAllSelected = table.getIsAllRowsSelected();
                const isSomeSelected = table.getIsSomeRowsSelected();
                
                return (
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300"
                        checked={isAllSelected}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        ref={input => {
                            if (input) {
                                input.indeterminate = isSomeSelected && !isAllSelected;
                            }
                        }}
                    />
                );
            },
            cell: ({ row }: { row: RowInstance }) => {
                const isSelected = row.getIsSelected();
                return (
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300"
                        checked={isSelected}
                        onChange={row.getToggleSelectedHandler()}
                    />
                );
            }
        },
        {
            accessorKey: 'name',
            header: 'Attachment',
            cell: ({ row }: { row: RowInstance }) => (
                <div className="flex items-center gap-2">
                    <DocumentIcon className="w-5 h-5 text-gray-500"/>
                    <span>{row.original.name}</span>
                </div>
            ),
        },
        {
            id: 'status',
            header: 'Status',
            cell: ({ row }: { row: RowInstance }) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    row.original.documentUrl 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {row.original.documentUrl ? 'Uploaded' : 'Missing'}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Action',
            cell: ({ row }: { row: RowInstance }) => (
                <div className="flex items-center gap-2">
                    {row.original.documentUrl ? (
                        <a 
                            href={row.original.documentUrl} 
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Download
                        </a>
                    ) : (
                        <span className="text-gray-400">Not available</span>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <EllipsisVerticalIcon className="w-5 h-5 text-dark-gray"/>
                    </button>
                </div>
            ),
        },
    ];

    const renderStepContent = (step: number) => {
        if (profileLoading) {
            switch (step) {
                case 0: return <AboutStepSkeleton />;
                case 1: return <DocumentsStepSkeleton />;
                case 2: return <ReportStepSkeleton />;
                default: return null;
            }
        }

        switch (step) {
            case 0:
                return (
                    <div className="p-6 flex flex-col h-full w-full">
                        <div className="flex-l">
                            <h2 className="text-xl font-semibold text-dark-gray mb-8">About</h2>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm text-dark-gray mb-2">Full Name</label>
                                    <Input
                                        type="text"
                                        className="w-full p-3 border-input-gray rounded-md"
                                        placeholder="Kane"
                                        value={tutorProfile?.data.about.fullName || ''}
                                        // onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className=" block text-sm text-dark-gray mb-2">Phone</label>
                                    <Input
                                        type="text"
                                        className="w-full p-3 border-input-gray rounded-md"
                                        placeholder="Williamson"
                                        value={tutorProfile?.data.about.phoneNumber || ''}
                                        //onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-dark-gray mb-2">Email</label>
                                    <Input
                                        type="email"
                                        className="w-full p-3 border-input-gray rounded-md"
                                        placeholder="tg@gmail.com"
                                        value={tutorProfile?.data.about.emailAddress || ''}
                                        //onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-dark-gray mb-2">Date of Birth</label>
                                    <Input
                                        type="text"
                                        className="w-full p-3 border-input-gray rounded-md"
                                        placeholder="25/01/2001"
                                        value={tutorProfile?.data.about.dateOfBirth || ''}
                                        //onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-dark-gray mb-2">Nationality</label>
                                    <Input
                                        type="text"
                                        className="w-full p-3 border-input-gray rounded-md"
                                        placeholder="Kenyan"
                                        value={tutorProfile?.data.about.nationality || ""}
                                        //onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-dark-gray mb-2">Gender</label>
                                    <Input
                                        type="text"
                                        className="w-full p-3 border-input-gray rounded-md"
                                        placeholder="Male"
                                        value={tutorProfile?.data.about.gender || ""}
                                        //onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                        readOnly
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm text-gray-500 mb-2">Description</label>
                                    <textarea
                                        className="w-full p-3 bg-input border-0 rounded-md h-32"
                                        placeholder="Enter description"
                                        value={tutorProfile?.data.about.description || ""}
                                        //onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        readOnly
                                    />
                                </div>
                            </div> 
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button onClick={handleNext} className="w-24">Next</Button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="p-6 flex flex-col h-full w-full">
                        <div className="flex-l">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl text-dark-gray font-semibold">Documents</h2>
                                {/* <Button variant="default">Bulk Action</Button> */}
                            </div>
                            <p className="text-sm text-light-gray mb-6">Documents submitted will be deleted after 30 days.</p>
                            <DataTable columns={columns} data={documents} />
                        </div>
                        <div className="flex justify-end space-x-4 mt-8">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <Button onClick={handleNext}>Next</Button>
                        </div>
                    </div>
                );
                case 2:
                return (
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-6">Report</h2>
                            
                            {tutorProfile?.data.sessions && tutorProfile.data.sessions.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to 2 columns on medium screens and up */}
                                    {tutorProfile.data.sessions.map((session, index) => (
                                        <Card key={index} className="border border-gray-200 rounded-lg overflow-hidden h-full"> {/* Added h-full for equal height */}
                                            <CardContent className="p-6 h-full flex flex-col"> {/* Added flex layout */}
                                                <div className="flex gap-6 flex-1"> {/* Added flex-1 */}
                                                    {/* Image on the left */}
                                                    {session.thumbnailImage ? (
                                                        <div className="w-32 h-32 flex-shrink-0 relative rounded-md overflow-hidden">
                                                            <Image
                                                                src={session.thumbnailImage}
                                                                alt={session.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Content on the right */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                                session.totalRatings > 0 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {session.totalRatings > 0 ? 'Approved' : 'Pending'}
                                                            </span>
                                                        </div>
                                                        
                                                        <h3 className="text-lg font-semibold mb-3 line-clamp-2">{session.title}</h3> {/* Added line clamp */}
                                                        
                                                        <div className="mb-4">
                                                            <h4 className="text-sm font-medium mb-1">About</h4>
                                                            <p className="text-sm text-gray-600 line-clamp-3">{session.about}</p> {/* Added line clamp */}
                                                        </div>
                                                        
                                                        <div className="mt-auto"> {/* Pushes rating to bottom */}
                                                            <h4 className="text-sm font-medium mb-1">Rating</h4>
                                                            {session.totalRatings > 0 ? (
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <FontAwesomeIcon 
                                                                            key={i}
                                                                            icon={faStar} 
                                                                            className={`text-sm ${
                                                                                i < session.totalRatings 
                                                                                    ? 'text-yellow-400' 
                                                                                    : 'text-gray-300'
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                    <span className="text-xs text-gray-500 ml-1">
                                                                        ({session.totalRatings})
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-400">No ratings yet</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No sessions available for this tutor</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                        </div>
                    </div>
                );
            default:
                return null;
                    }
                };

    return (
        <div className="flex flex-col">
            <Header 
            userName="Admin" 
            header="Tutor Details" 
            backButton={{
                show: true,
                customRoute: `/dashboard/tutors/details/${id}`
            }}/>
            
            <div className="grid grid-cols-4 gap-6 p-6 items-start">
                {profileLoading ? (
                    <div className="col-span-1">
                        <TutorEditProfileSkeleton />
                    </div>
                ) : (
                    <Card className="col-span-1 shadow-lg h-fit">
                    <CardContent className="flex flex-col items-center p-6">
                        {/* Profile Picture */}
                        <div className="relative mb-4">
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

                        <h2 className="text-xl font-semibold mb-2">{tutorProfile?.data.profile.fullName}</h2>

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
                        <div className="w-full mt-6 space-y-4">
                            <div>
                                <p className="text-sm text-dark-gray">Name</p>
                                <p className="font-medium">{tutorProfile?.data.profile.fullName || ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-gray">Date of Birth</p>
                                <p className="font-medium">{tutorProfile?.data.profile.dateOfBirth || ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-gray">Phone</p>
                                <p className="font-medium">{tutorProfile?.data.profile.phoneNumber || ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-gray">Email</p>
                                <p className="font-medium">{tutorProfile?.data.profile.emailAddress || ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-gray">Location</p>
                                <p className="font-medium">{tutorProfile?.data.profile.location || ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-gray">Gender</p>
                                <p className="font-medium">{tutorProfile?.data.profile.gender || ""}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-gray">Ongoing Lessons</p>
                                <p className="font-medium">{tutorProfile?.data.profile.ongoingLessons || ""}</p>
                            </div>
                        </div>

                        {/* Generate Report Button */}
                        <Button className="w-full mt-6 text-white" variant="default">
                            Generate Report
                        </Button>
                    </CardContent>
                </Card>
                )}

                {/* Card Stepper */}
                <div className="col-span-3">
                    {profileLoading ? (
                        <StepperSkeleton />
                    ) : (
                        <div className="mb-6 px-6">
                            <CustomStepper steps={steps} activeStep={activeStep} onStepClick={handleStepClick}/>
                        </div>
                    )}
                    
                    <Card className="min-h-[600px] ">
                        <CardContent className="p-0">
                            {renderStepContent(activeStep)}

                            {/* <div className="flex justify-end space-x-4 px-6 pb-6">
                                {activeStep > 0 && (
                                    <Button variant="outline" onClick={handleBack}>
                                        Back
                                    </Button>
                                )}
                                {activeStep < 2 && (
                                    <Button onClick={handleNext}>
                                        Next
                                    </Button>
                                )}
                            </div> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};