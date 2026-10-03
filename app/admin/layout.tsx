import React from "react";

export const metadata = {
  title: "Admin Portal | Moeez Gujjar Rent A Car",
  description: "Moeez Gujjar Rent A Car Management Portal",
  icons: {
    icon: "/navbarlogo.png",
    shortcut: "/navbarlogo.png",
    apple: "/navbarlogo.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
      {children}
    </div>
  );
}
