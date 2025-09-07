

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaBell, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

import { useProfileStore } from '@/store/useProfileStore'


export default function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {

  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const profile = useProfileStore((state) => state.profile)

  const fullName = profile?.full_name || "Guest"
  const avatarUrl = profile?.avatar_url || null
  const avatarInitial = fullName.charAt(0).toUpperCase()


  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored === "dark";
    setDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  };

  const handleSignOut = async () => {
    
    router.push("/api/logout");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b shadow-sm flex items-center justify-between px-4 md:px-6">
      {/* Left: Sidebar toggle + title */}
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300">
            <FaBars className="text-xl" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-blue-600 dark:text-blue-400">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <button className="relative text-gray-600 dark:text-gray-300">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>

        {/* Avatar + Name + Dropdown */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          tabIndex={0}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold overflow-hidden transition-transform duration-200 hover:ring-2 hover:ring-blue-400 hover:scale-105">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <span>{avatarInitial}</span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-white">{fullName}</span>
          <FaChevronDown
            className={`text-sm transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            } text-gray-600 dark:text-gray-300`}
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 top-14 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-50
            transition-all duration-200 origin-top-right
            ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                View Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
