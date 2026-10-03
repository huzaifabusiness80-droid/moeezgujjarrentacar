import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CurrencyProvider } from "./components/CurrencyContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moeez Gujjar Rent A Car | Premium Car Rental in Lahore",
  description: "Official website of Moeez Gujjar Rent A Car in Lahore. We offer luxury cars, SUVs, and economy car rentals for weddings, tours, and corporate needs at the best prices.",
  keywords: [
    "rent a car lahore", 
    "car rental lahore", 
    "rent a car in lahore with driver", 
    "rent a car in lahore without driver", 
    "luxury rent a car lahore", 
    "wedding car rental lahore", 
    "prado rent a car lahore", 
    "v8 for rent in lahore", 
    "audi for rent in lahore", 
    "mercedes for rent in lahore", 
    "cheap rent a car lahore", 
    "rent a car lahore airport", 
    "best rent a car in lahore", 
    "rent a car pakistan",
    "Moeez Gujjar Rent A Car"
  ],
  authors: [{ name: "Moeez Gujjar Rent A Car" }],
  openGraph: {
    title: "Moeez Gujjar Rent A Car | Premium Car Rental in Lahore",
    description: "Looking for a reliable car rental in Lahore? Moeez Gujjar Rent A Car provides top-quality luxury sedans, SUVs, and economy cars with professional drivers.",
    url: "https://moeezgujjarrentacar.com",
    siteName: "Moeez Gujjar Rent A Car",
    images: [
      {
        url: "/fleet/mercedes-s-class.jpg",
        width: 1200,
        height: 630,
        alt: "Moeez Gujjar Rent A Car Fleet",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moeez Gujjar Rent A Car | Premium Car Rental in Lahore",
    description: "Rent luxury cars, SUVs, and economy sedans in Lahore. Best rates guaranteed.",
    images: ["/fleet/mercedes-s-class.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className={`${poppins.className} min-h-full flex flex-col bg-slate-100`}>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
