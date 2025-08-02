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

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
            >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-md font-bold text-sky-600">TaskManager</h2>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <nav className="p-6 space-y-4 text-gray-700 text-sm">
                    <a href="dashboard" className="flex items-center gap-2 hover:text-sky-600">
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                        Dashboard
                    </a>
                    <a href="priority" className="flex items-center gap-2 hover:text-sky-600">
                        <BellIcon className="h-5 w-5" />
                        Priority
                    </a>

                    <a href="status" className="flex items-center gap-2 hover:text-sky-600">
                        <UserCircleIcon className="h-5 w-5" />
                        status
                    </a>
                    
                    <a href="add-task" className="flex items-center gap-2 hover:text-sky-600">
                        <PlusCircleIcon className="h-5 w-5" />
                        Add Task
                    </a>
                    <a href="all-tasks" className="flex items-center gap-2 hover:text-sky-600">
                        <CheckCircleIcon className="h-5 w-5" />
                        All Tasks
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-sky-600">
                        <Cog6ToothIcon className="h-5 w-5" />
                        Settings
                    </a>
                </nav>
            </aside>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-25 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>

    );
}

export default Sidebar;