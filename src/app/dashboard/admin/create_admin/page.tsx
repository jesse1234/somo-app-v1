'use client';

import { Button } from "@/app/components/ui/Buttons";
import { Card, CardContent } from "@/app/components/ui/Cards";
import { Header } from "@/app/components/ui/Header";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";

export default function CreateAdminPage() {
    return (
        <div className="flex flex-col">
            <Header
            userName="Admin" 
            header="Create Admin" 
            backButton={{
                show: true,
                customRoute:'/dashboard/admin/'
            }}/>

            <Card className="">
                <CardContent className="p-0">
                <div className="p-6 flex flex-col h-full w-full">
                        <div className="flex-l">
                            <h2 className="text-xl font-semibold text-dark-gray mb-8">About</h2>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <Label className="block text-sm text-dark-gray mb-2" htmlFor="full name">Full Name</Label>
                                        <Input
                                            type="text"
                                            className="w-full p-3 border-input-gray rounded-md"
                                            placeholder="Enter Your Full Name"
                                            
                                            // onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                            //required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className=" block text-sm text-dark-gray mb-2">Phone</Label>
                                            <Input
                                                type="text"
                                                className="w-full p-3 border-input-gray rounded-md"
                                                placeholder="Enter Your Phone Number"
                                                
                                                //onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                //required
                                            />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm text-dark-gray mb-2">Email</Label>
                                            <Input
                                                type="email"
                                                className="w-full p-3 border-input-gray rounded-md"
                                                placeholder="Enter Your Email"
                                                
                                                //onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                //required
                                            />
                                        </div>
                                        {/* <div className="space-y-2">
                                            <Label className="text-sm text-dark-gray mb-2">Date of Birth</Label>
                                            <Input
                                                type="text"
                                                className="w-full p-3 border-input-gray rounded-md"
                                                placeholder="Enter Your Date of Birth"
                                                
                                                //onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                                //required
                                            />
                                        </div> */}
                                        <div className="space-y-2">
                                            <Label className="text-sm text-dark-gray mb-2">Password</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                //required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm text-dark-gray mb-2">Confirm Password</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                //required
                                            />
                                        </div>
                                    </div> 
                                </div>
                                <div className="flex justify-end mt-8">
                                    <Button className="w-24">Create</Button>
                                </div>
                            </div>               
                </CardContent>
            </Card>
        </div>
    )
}