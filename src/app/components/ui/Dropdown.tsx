'use client'

import { useState, useRef, useEffect } from "react"

interface DropdownItem {
    label: string
    onClick: () => void
    icon?: React.ReactNode
    className?: string
    disabled?: boolean
}

interface DropdownProps {
    trigger: React.ReactNode
    items: DropdownItem[]
    align?: 'left' | 'right'
    className?: string
    menuClassName?: string
}

export function Dropdown({ 
    trigger, 
    items,
    align = 'right',
    className="",
    menuClassName=""
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }, [])

    const alignmentClass = align === 'right' ? 'right-0' : 'left-0'

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <button 
            onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
            }}
            className="focus:outline-none"
            aria-expanded={isOpen}
            aria-haspopup="true"
            >
                {trigger}
            </button>

            {isOpen && (
                <div 
                    className={`absolute ${alignmentClass} mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100 ${menuClassName}`}
                    role="menu"
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (!item.disabled) {
                                    item.onClick()
                                    setIsOpen(false)
                                }
                            }}
                            disabled={item.disabled}
                            className={`block w-full text-left px-4 py-2 text-sm ${item.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'} flex items-center gap-2 ${item.className || 'text-gray-700'}`}
                            role="menuitem"
                        >
                            {item.icon && <span className="w-5">{item.icon}</span>}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

