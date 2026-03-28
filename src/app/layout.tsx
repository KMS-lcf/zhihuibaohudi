import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "石花洞风景名胜区智慧监管系统",
  description: "房山区石花洞风景名胜区智慧监管系统，实现保护地概况、生物多样性、巡护监管、地质监测、环境监测、生态监测等一体化管理。",
  keywords: ["石花洞", "风景名胜区", "智慧监管", "生态保护", "生物多样性", "地质监测"],
  authors: [{ name: "房山区园林绿化局" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "石花洞风景名胜区智慧监管系统",
    description: "房山区石花洞风景名胜区智慧监管系统",
    siteName: "石花洞风景名胜区智慧监管系统",
    type: "website",
  },
  other: {
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *; script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *; style-src 'self' 'unsafe-inline' https: http: data: *; img-src 'self' data: blob: https: http: *; font-src 'self' data: https: http: *; connect-src 'self' data: blob: https: http: ws: wss: *; worker-src 'self' blob: *; frame-src 'self' https: http: *; object-src 'none';"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *; script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *; style-src 'self' 'unsafe-inline' https: http: data: *; img-src 'self' data: blob: https: http: *; font-src 'self' data: https: http: *; connect-src 'self' data: blob: https: http: ws: wss: *; worker-src 'self' blob: *; frame-src 'self' https: http: *; object-src 'none';" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
