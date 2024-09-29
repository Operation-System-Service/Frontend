import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookiesProvider } from 'next-client-cookies/server';
import ClientLayout from "./clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat System",
  description: "Operation System For C.A.T Consulting",
  icons: {
    icon: '/catlogo.png', // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}> 
        <CookiesProvider>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}