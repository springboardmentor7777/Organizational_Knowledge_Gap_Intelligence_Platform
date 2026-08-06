import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <div className="flex flex-col flex-1">
                <Navbar />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
