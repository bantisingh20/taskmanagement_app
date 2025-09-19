import React, { useEffect, useState } from 'react';
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
import MenuService from '../service/menu'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {


    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [menulist, setMenuList] = useState([
        // { name: 'Dashboard', path: 'dashboard', icon: 'fas fa-clipboard-list' },
        // { name: 'Priority', path: 'priority', icon: 'fas fa-bell' },
        // { name: 'Status', path: 'status', icon: 'fas fa-user-circle' },
        // { name: 'Add Task', path: 'add-task', icon: 'fas fa-plus-circle' },
        // { name: 'All Tasks', path: 'all-tasks', icon: 'fas fa-check-circle' },
        // { name: 'Settings', path: '#', icon: 'fas fa-cog' },
        // { name: 'Dashboard', path: 'dashboard', icon: 'fas fa-tachometer-alt' },
        // { name: 'Priority', path: 'priority', icon: 'fas fa-exclamation-circle' },
        // { name: 'Status', path: 'status', icon: 'fas fa-flag' },
        // { name: 'Add Task', path: 'add-task', icon: 'fas fa-plus' },
        // { name: 'All Tasks', path: 'all-tasks', icon: 'fas fa-tasks' },
        // { name: 'Settings', path: '#', icon: 'fas fa-cog' },
    ]);

      const fetch = async () => {
        const response = await MenuService.getStatus();
        if (response?.error) {
          showSnackbar('Something went wrong');
          return;
        }
       setMenuList(response.data)
        console.log('Fetched menu:', response);
         console.log(menulist)
      };

      useEffect(() => {
        fetch();
      },[]);

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
                    {menulist.map((menu, index) => {
                        return (
                            <Link to={menu.path} key={index} className="flex items-center gap-2 hover:text-primary">
                                <i class={menu.icon}></i>
                                {/* <menu.icon className="h-5 w-5" />  */}
                                {menu.menuname}
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