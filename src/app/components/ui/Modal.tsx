'use client';

import { useEffect } from 'react';
import { Button } from './Buttons';

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export function Modal({ isOpen, onClose, children}: ModalProps) {
    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    if(!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <Button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">&times;</Button>
                {children}
            </div>
        </div>
    )
}