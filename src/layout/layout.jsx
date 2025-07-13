import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { Navbar } from "./navbar";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen flex bg-sky-50">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>

            </div>

        </>
    );
}

export default Layout;