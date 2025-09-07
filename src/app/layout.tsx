// src/app/layout.tsx
import "@/app/globals.css";
import ProfileLoader from "@/components/ProfileLoader";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ProfileLoader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
