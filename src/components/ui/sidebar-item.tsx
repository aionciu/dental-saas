"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SidebarItem({
  icon,
  label,
  href,
  isOpen,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isOpen: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-semibold"
            : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
        }`}
      >
        <span className="text-lg">{icon}</span>
        {isOpen && <span className="text-sm font-medium">{label}</span>}
      </a>

      {/* Tooltip */}
      {!isOpen && hovered && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50">
          {label}
        </div>
      )}
    </div>
  );
}
