"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Cards";
import { Header } from "@/app/components/ui/Header";
import { Link } from "@/app/components/ui/Link";
import { DataTable } from "@/app/components/ui/Table";
import { faBookOpen, faCircleUser, faClipboardList, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";

export default function StudentDetailsPage() {

    interface Session {
        name: string;
        id: string;
        date: string;
        time: string;
        location: string;
        status: string;
    }

    const sessionColumns: ColumnDef<Session>[] = [
        { header: 'Name', accessorKey: 'name' },
        { header: 'ID', accessorKey: 'id' },
        { header: 'Date', accessorKey: 'date' },
        { header: 'Time', accessorKey: 'time' },
        { header: 'Location', accessorKey: 'location' },
        { header: 'Status', accessorKey: 'status' },
    ];

    const sessionData = new Array(5).fill(0).map(() => ({
        name: "Graphic Design Fundamentals",
        id: "ART101",
        date: "Jan 25, 2024",
        time: "10:00 AM",
        location: "Library",
        status: "Completed"
    }));
    return (
        <div className="flex flex-col">
            <Header userName="Admin" header="Students" />

            {/* Two main columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-start gap-6">
                                <FontAwesomeIcon 
                                    icon={faCircleUser} 
                                    className="text-6xl text-gray-400 flex-shrink-0" 
                                />
                                <div>
                                    <h2 className="text-2xl font-bold">James Wangai</h2>
                                    <p className="text-gray-500">Profile ID: S9VH847</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sessions Enrolled Card */}
                    <Card>
                        <CardContent className="flex flex-col">
                            {/* Header Section */}
                            <div className="flex justify-between items-center w-full mb-6">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faBookOpen} className="text-gray-500" />
                                    <h2 className="text-lg font-semibold">Sessions Enrolled</h2>
                                </div>
                                <Link href="#" className="text-blue-500 hover:underline text-sm font-medium whitespace-nowrap">View all</Link>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-3">
                                <Card className="bg-light-green">
                                    <CardContent className="flex flex-col">
                                        <h3 className="font-medium text-gray-900 mb-2">Graphic Fundamentals</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>Dr. Johnson</p>
                                            <p>Tuesday & Thursday</p>
                                            <p>1:30 PM - 3:00 PM</p>
                                            <p className="text-blue-500">Online</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-light-green">
                                    <CardContent className="flex flex-col">
                                        <h3 className="font-medium text-gray-900 mb-2">Advanced Web Design</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>Dr. Johnson</p>
                                            <p>Tuesday & Thursday</p>
                                            <p>1:30 PM - 3:00 PM</p>
                                            <p className="text-blue-500">Computer Lab 3</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-light-green">
                                    <CardContent className="flex flex-col">
                                        <h3 className="font-medium text-gray-900 mb-2">User Experience Research</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>Dr. Johnson</p>
                                            <p>Tuesday & Thursday</p>
                                            <p>1:30 PM - 3:00 PM</p>
                                            <p className="text-blue-500">Online</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-light-green">
                                    <CardContent className="flex flex-col">
                                        <h3 className="font-medium text-gray-900 mb-2">Mastering Chess</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>Dr. Johnson</p>
                                            <p>Tuesday & Thursday</p>
                                            <p>1:30 PM - 3:00 PM</p>
                                            <p className="text-blue-500">Online</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>                                
                        </CardContent>
                    </Card>


                    <Card>
                        <CardContent className="flex flex-col space-y-2 w-full">
                            <div className="flex justify-between items-center w-full mb-6">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faClockRotateLeft} className="text-gray-500" />
                                    <h2 className="text-lg font-semibold">Sessions History</h2>
                                </div>
                                <Link href="#" className="text-blue-500 hover:underline text-sm font-medium whitespace-nowrap">View all</Link>
                            </div>

                            <DataTable columns={sessionColumns} data={sessionData} />
                            
                            
                        </CardContent>
                    </Card>
                </div>

                <Card className="border border-gray-200">
                {/* Header section at the very top */}
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faClipboardList} className="text-gray-500" />
                            <CardTitle className="text-lg font-semibold">Reviews Submitted</CardTitle>
                        </div>
                        <Link href="#" className="text-blue-500 hover:underline text-sm font-medium whitespace-nowrap">
                        View all
                        </Link>
                    </CardHeader>

                    {/* Reviews list inside the card */}
                    <CardContent className="flex flex-col gap-4 p-4 pt-0">
                        {/* Each small review as a Card */}
                        <Card className="border border-2 border-color-orange">
                            <CardContent className="flex flex-col items-start gap-2 p-4">
                                <h3 className="font-medium text-gray-900">Graphic Fundamentals</h3>
                                <p className="text-sm text-gray-500">Session ID: GFJ553FD</p>
                                <p className="text-gray-700">
                                I really enjoyed learning with Tutor J. His explanations were clear, and made the subject very interesting.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-2 border-color-orange">
                            <CardContent className="flex flex-col items-start gap-2 p-4">
                                <h3 className="font-medium text-gray-900">Graphic Fundamentals</h3>
                                <p className="text-sm text-gray-500">Session ID: GFJ553FD</p>
                                <p className="text-gray-700">
                                I really enjoyed learning with Tutor J. His explanations were clear, and made the subject very interesting.
                                </p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}