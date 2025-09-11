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

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [menulist, setMenuList] = useState([
        { name: 'Dashboard', path: 'dashboard', icon: ClipboardDocumentListIcon },
        { name: 'Priority', path: 'priority', icon: BellIcon },
        { name: 'Status', path: 'status', icon: UserCircleIcon },
        { name: 'Add Task', path: 'add-task', icon: PlusCircleIcon },
        { name: 'All Tasks', path: 'all-tasks', icon: CheckCircleIcon },
        { name: 'Settings', path: '#', icon: Cog6ToothIcon },
    ])

    return (
        <>
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
            >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-md font-bold text-primary">TaskManager</h2>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <nav className="p-6 space-y-4 text-gray-700 text-sm">
                    {menulist.map((menu,index) => {
                        return (
                            <Link to={menu.path} key={index} className="flex items-center gap-2 hover:text-primary">
                                <menu.icon className="h-5 w-5" />
                                {menu.name}
                            </Link>
                        )
                    })}
                   
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