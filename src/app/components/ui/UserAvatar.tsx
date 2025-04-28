'use client';

import React, { useState, useRef, useEffect } from 'react';

import useAuthStore from '@/store/useAuthHook';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

interface UserAvatarProps {
    name: string;
}

export function UserAvatar({ name }: UserAvatarProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const logout = useAuthStore(state => state.logout);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try{
            await logout();
            router.push('/');
        } finally {
            setIsLoggingOut(false)
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className="relative">
                    <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 fa-3x" />
                    {/* <Image
                        src={DefaultAvatar}
                        alt={name}
                        width={40}
                        height={40}
                        className="w-12 h-12 rounded-full"
                    /> */}
                    <div className="absolute bottom-0 right-0 bg-primary p-1 rounded-full">
                        <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 20h9"
                            />
                            <path 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"
                            />
                        </svg>
                    </div>           
                </div>
                <span className="text-dark-gray text-semibold">{name}</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="py-1">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoggingOut ? 'Logging Out...' : 'Log Out'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}