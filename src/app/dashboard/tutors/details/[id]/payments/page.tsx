'use client';

import { Button } from "@/app/components/ui/Buttons";
import { Card, CardContent } from "@/app/components/ui/Cards";
import { Header } from "@/app/components/ui/Header";
import { DataTable } from "@/app/components/ui/Table";
// import { Dropdown } from "@/app/components/ui/Dropdown";

export default function PaymentsPage() {
    const columns = [
        {
            header: 'Date',
            accessorKey: 'date'
        },
        {
            header: 'Payment ID',
            accessorKey: 'paymentId'
        },
        {
            header: 'Amount',
            accessorKey: 'amount'
        },
        {
            header: 'Status',
            accessorKey: 'status'
        },
        {
            header: 'Actions',
            accessorKey: 'actions'
        }
    ];

    const data = [
        { date: "12/11/2024", paymentId: "#10421", amount: "3,000", status: "Approved" },
        { date: "12/11/2024", paymentId: "#10422", amount: "3,000", status: "Declined" },
        { date: "12/11/2024", paymentId: "#10423", amount: "3,000", status: "Pending" },
        { date: "12/11/2024", paymentId: "#10424", amount: "3,000", status: "Approved" },
        { date: "12/11/2024", paymentId: "#10425", amount: "3,000", status: "Approved" },
        { date: "12/11/2024", paymentId: "#10426", amount: "3,000", status: "Declined" },
    ];

    return (
        <div className="flex flex-col">
            <Header userName="Admin" header="Tutors"/>

            <div className="p-6 space-y-6">
                <div className="flex space-x-4 bg-white p-3 rounded-md">
                    <Button variant="default">Overview</Button>
                    <Button variant="outline">Payment Information</Button>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <p className="text-sm text-light-gray mb-4">Pending Payments</p>
                            <div className="flex items-center">
                                <p className="text-4xl text-dark-gray font-bold">Kes. 8000</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <p className="text-sm text-light-gray mb-4">Payment Withdrawn</p>
                            <div className="flex items-center">
                                <p className="text-4xl text-dark-gray font-bold">Kes. 32,008</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <p className="text-sm text-light-gray mb-4">Amount Since Joining</p>
                            <div className="flex items-center">
                                <p className="text-4xl text-dark-gray font-bold">Ksh. 40,000</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="p-6 bg-white rounded-lg shadow ">
                    <div className="flex justify-start gap-4">
                        <Button variant="outline">Time Range</Button>
                        <Button variant="outline">Status</Button>
                    </div>
                    <hr className="mt-4 border-b-2 border-t-2 border-input-gray"/>

                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}