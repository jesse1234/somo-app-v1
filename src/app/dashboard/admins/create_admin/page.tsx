'use client';

import { Button } from "@/app/components/ui/Buttons";
import { Card, CardContent } from "@/app/components/ui/Cards";
import { Header } from "@/app/components/ui/Header";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { useCreateAdmin } from "@/store/useCreateAdmin";
import { useState } from "react";

export default function CreateAdminPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });

    const { createAdmin, isLoading, error, isSuccess, reset } = useCreateAdmin();
    const [validationError, setValidationError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (error) reset();
    if (validationError) setValidationError(null);

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            return false;
        }
        
        if (formData.password.length < 8) {
            setValidationError('Password must be at least 8 characters');
            return false;
        }
        
        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setValidationError('Please enter a valid email address');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            await createAdmin(formData);
            
            // Reset form on success
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: ''
            });
        } catch (err) {
            // Error is already handled in the hook
            console.error("Create admin failed", err);
        }
    }

    return (
        <div className="flex flex-col">
            <Header
            userName="Admin" 
            header="Create Admin" 
            backButton={{
                show: true,
                customRoute:'/dashboard/admins/'
            }}/>

            <Card className="w-full"> 
                <CardContent className="p-0 w-full">
                    <form onSubmit={handleSubmit} className='w-full'>
                    <div className="p-6 flex flex-col h-full w-full">
                        <div className="flex-l">

                            {(error || validationError) && (
                                <div className="mb-4 p-2 text-red-500 bg-red-50 rounded">
                                    {error || validationError}
                                </div>
                            )}

                            {isSuccess && (
                                <div className="mb-4 p-2 text-green-500 bg-green-50 rounded">
                                    Admin Created Successfully!
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <Label className="block text-sm text-dark-gray mb-2" htmlFor="fullName">Full Name</Label>
                                        <Input
                                            name="fullName"
                                            type="text"
                                            className="w-full p-3 border-input-gray rounded-md"
                                            placeholder="Enter Full Name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className=" block text-sm text-dark-gray mb-2" htmlFor="phoneNumber">Phone</Label>
                                            <Input
                                                name="phoneNumber"
                                                type="text"
                                                className="w-full p-3 border-input-gray rounded-md"
                                                placeholder="Enter Phone Number"
                                                onChange={handleChange}
                                                value={formData.phoneNumber}
                                                required
                                            />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm text-dark-gray mb-2" htmlFor="email">Email</Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                className="w-full p-3 border-input-gray rounded-md"
                                                placeholder="Enter Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
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
                                            <Label className="text-sm text-dark-gray mb-2" htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm text-dark-gray mb-2" htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div> 
                                </div>
                                <div className="flex justify-end mt-8">
                                    <Button 
                                        className="w-24"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Creating...' : 'Create'}
                                    </Button>
                                </div>
                        </div>
                    </form>               
                </CardContent>
            </Card>
        </div>
    )
}