import React from 'react';
import { SearchBar } from '../ui/SearchBar';
import { UserAvatar } from './UserAvatar';
import FilterIcon from '@/app/assets/icons/filter.png';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    userName: string;
    header: string;
    showFilter?: boolean;
    backButton?: {
      show: boolean;
      customRoute?: string;
    }
}

export function Header({ userName, header, showFilter = false, backButton }: HeaderProps) {
  const router = useRouter();
  
  const handleBack = () => {
     if (backButton?.customRoute) {
      router.push(backButton.customRoute);
    } else {
      router.back();
    }
  };

    return (
      <div className="fixed top-0 left-65 right-5 z-50 bg-gray-100">
        <div className="flex items-center p-4 max-w-full">
          {/* Back Button */}
          {backButton?.show && (
            <button 
              onClick={handleBack}
              className="flex items-center mr-3 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600 hover:text-primary" />
            </button>
          )}

          <h2 className="text-3xl font-bold text-primary">{header}</h2>
          <div className="flex-l ml-40">
              <SearchBar />
          </div>
          <div className="flex items-center space-x-95 ml-auto">
            {showFilter && (
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-200">
                <Image
                  src={FilterIcon}
                  alt="Filter"
                  width={20}
                  height={20}
                />
                   <span>Apply Filter</span>
              </button>
            )}
            <UserAvatar name={userName} />
          </div>
        </div>
      </div>
    );
  }