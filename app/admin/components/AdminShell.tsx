"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Loader2 } from "lucide-react";

export default function AdminShell({
  children,
  title = "Dashboard",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Unauthorized");
      })
      .then((data) => {
        if (data.authenticated && data.user) {
          setAuthorized(true);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white px-4 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#dc2626] mb-3" />
        <p className="text-xs uppercase font-mono tracking-widest text-slate-400">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-slate-100 antialiased selection:bg-[#dc2626] selection:text-white">
      {/* Sidebar with Desktop and Mobile Drawer modes */}
      <AdminSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <AdminHeader
          title={title}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="p-3 sm:p-5 md:p-6 flex-1 overflow-y-auto w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

