"use client";

import { useState, useEffect } from "react";
import { FaBars, FaBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import Image from "next/image";

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    // Simulate profile image fetch
    setProfileImage(null); // Replace with actual logic
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b shadow-sm flex items-center justify-between px-4 md:px-6">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 dark:text-gray-300"
        >
          <FaBars className="text-xl" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-blue-600 dark:text-blue-400"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <button className="relative text-gray-600 dark:text-gray-300">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          {profileImage ? (
            <Image
              src={profileImage || "/default-avatar.png"} // fallback if profileImage is null
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-2xl text-gray-500 dark:text-gray-300" />
          )}
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              Dr. Alexandru
            </p>
            <a
              href="/profile"
              className="text-xs text-blue-500 hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
