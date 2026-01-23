import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/sonner";
import ErrorReporter from "@/components/ErrorReporter";
import KeyboardManager from "@/components/KeyboardManager";

export const metadata: Metadata = {
  title: "Ayla - Kişisel Astrolojik Rehberin",
  description: "Ayla ile gökyüzünün rehberliğini keşfet, kaderinin fısıltılarını dinle.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ayla",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload Happiness Emojis */}
        <link rel="preload" href="/assets/moods/very-unhappy.png" as="image" />
        <link rel="preload" href="/assets/moods/unhappy.png" as="image" />
        <link rel="preload" href="/assets/moods/neutral.png" as="image" />
        <link rel="preload" href="/assets/moods/happy.png" as="image" />
        <link rel="preload" href="/assets/moods/very-happy.png" as="image" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <KeyboardManager />
        <Script
          id="orchids-browser-logs"
          src="/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="10ffc7c6-8647-41be-802f-4947f0a893e9"
        />
        <ProfileProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ProfileProvider>
        <Toaster position="top-center" theme="dark" toastOptions={{ style: { marginTop: 'calc(env(safe-area-inset-top) + 1rem)' } }} />
        <ErrorReporter />
        <Script
          src="/scripts/route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
      </body>
    </html>
  );
}
