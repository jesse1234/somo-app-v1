'use client';

import React from 'react';
import Image from 'next/image';
import HomeIcon from '@/app/assets/icons/home1.png';
import LogoImage from '@/app/assets/images/Group 394.png';
import { Link } from './Link';
import TutorsIcon from '@/app/assets/icons/tutors.png';
import StudentIcon from '@/app/assets/icons/student1.png';
import { SidebarSkeleton } from '../skeletons/DashboardSkeleton';
import { useGetSidebarMenu } from '@/store/useGetSidebarMenu';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const { data: menuData, isLoading, isError } = useGetSidebarMenu();
    const pathname = usePathname();

    if (isLoading) return <SidebarSkeleton />;
    if (isError) return <div className="flex flex-col w-64 h-screen bg-white shadow-lg p-4 text-red-500">Error loading menu</div>;

    return (
        <div className="flex flex-col w-64 h-screen bg-white shadow-lg">
            <div className="flex items-center justify-center h-20 pt-10">
                <Image
                    src={LogoImage}
                    alt="Somo Logo"
                    width={150}
                    height={150}
                    priority
                />
            </div>
            <nav className="flex-1 px-4 py-15 space-y-2">
                {menuData?.data.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                        <Link 
                            key={item.name} 
                            href={item.url} 
                            className={`flex items-center p-2 text-base rounded-lg group transition-colors duration-200 ${
                                isActive 
                                    ? 'text-primary bg-blue-100' 
                                    : 'text-dark-gray hover:text-primary hover:bg-blue-100'
                            }`}
                        >
                            <Image
                                src={item.name === "Home" ? HomeIcon : item.name === "Students" ? StudentIcon : TutorsIcon}
                                alt={`${item.name} Icon`}
                                className={`w-5 h-5 mr-3 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                width={20}
                                height={20}
                            />
                            <span className={isActive ? "font-medium" : "group-hover:font-medium"}>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}