import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Skills Passport — Your AI skills, everywhere you work",
    template: "%s · Skills Passport",
  },
  description:
    "One URL represents how you work. Paste it into any AI tool and it instantly knows your skills, preferences, and working style. An open protocol.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://skillspassport.io"),
  openGraph: {
    title: "Skills Passport",
    description: "Your AI skills, everywhere you work.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
