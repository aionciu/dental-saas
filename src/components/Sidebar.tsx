import {
  FaCalendarAlt,
  FaUserFriends,
  FaFileInvoice,
  FaChartBar,
  FaCog,
  FaTachometerAlt 
} from "react-icons/fa";
import { SidebarItem } from "./ui/sidebar-item";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`h-screen bg-white dark:bg-gray-800 border-r shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col justify-between`}
    >
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-blue-500 text-2xl">🦷</span>
          {isOpen && (
            <span className="text-xl font-bold text-gray-800 dark:text-white">DentalSaaS</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <SidebarItem icon={<FaTachometerAlt  />} label="Dashboard" href="/dashboard" isOpen={isOpen} />
          <SidebarItem icon={<FaCalendarAlt />} label="Appointments" href="/appointments" isOpen={isOpen} />
          <SidebarItem icon={<FaUserFriends />} label="Patients" href="/patients" isOpen={isOpen} />
          <SidebarItem icon={<FaFileInvoice />} label="Billing" href="/billing" isOpen={isOpen} />
          <SidebarItem icon={<FaChartBar />} label="Reports" href="/reports" isOpen={isOpen} />
          <SidebarItem icon={<FaCog />} label="Settings" href="/settings" isOpen={isOpen} />
        </nav>
      </div>
    </aside>
  );
}


