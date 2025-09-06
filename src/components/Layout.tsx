"use client";

import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-4 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dental SaaS</h2>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/appointments" className="hover:text-blue-600">
              Appointments
            </Link>
            <Link href="/patients" className="hover:text-blue-600">
              Patients
            </Link>
            <Link href="/billing" className="hover:text-blue-600">
              Billing
            </Link>
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
