import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * DashboardLayout
 * Shell that wraps every protected page.
 * Structure:
 *   Navbar (top, sticky)
 *   ├── Sidebar (left, fixed width)
 *   └── Main content area (flex-1, scrollable)
 *   Footer (bottom)
 */
export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
