import React, { useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
    ClipboardDocumentListIcon,
    PlusCircleIcon,
    Cog6ToothIcon,
    CheckCircleIcon,
    BellIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


export const Navbar = ({ setSidebarOpen }) => {
    return (
        <>
            <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
                <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
                    <Bars3Icon className="h-6 w-6" />
                </button> 
                <div className="flex items-center gap-4">
                    <button className="relative text-gray-600 hover:text-sky-600">
                        <BellIcon className="h-6 w-6" />
                         <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    </button>

                    <div className="flex items-center gap-2 text-gray-700">
                        <UserCircleIcon className="h-7 w-7 text-sky-600" />
                        <span className="text-sm font-medium">Hello, User</span>
                    </div>
                </div>
            </header>
        </>
    )
}