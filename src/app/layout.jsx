import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "800"],
});

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://hero-kidz-o0chunzvh-nur-mohammed.vercel.app"),

  title: {
    default: "Hero Kidz | Fun Learning for Kids",
    template: "%s | Hero Kidz",
  },

  description:
    "Hero Kidz is a fun and engaging platform where children can explore products, learn through exciting activities, and enjoy a safe and interactive experience.",

  keywords: [
    "Hero Kidz",
    "kids",
    "kids learning",
    "kids education",
    "children activities",
    "educational activities",
    "kids products",
    "learning for children",
  ],

  authors: [
    {
      name: "Nur Mohammed",
    },
  ],

  creator: "Nur Mohammed",
  publisher: "Hero Kidz",

  applicationName: "Hero Kidz",

  category: "education",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "https://i.ibb.co.com/0j9J36s4/logo.png",
      },
    ],
    shortcut: [
      {
        url: "https://i.ibb.co.com/0j9J36s4/logo.png",
      },
    ],
    apple: [
      {
        url: "https://i.ibb.co.com/0j9J36s4/logo.png",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hero-kidz-o0chunzvh-nur-mohammed.vercel.app/",
    siteName: "Hero Kidz",

    title: "Hero Kidz | Fun Learning for Kids",

    description:
      "Explore Hero Kidz — a fun and engaging platform designed for children to learn, explore, and enjoy exciting experiences.",

    images: [
      {
        url: "https://i.ibb.co.com/ynLnBHjr/Fire-Shot-Capture-001-Hero-Kidz-hero-kidz-lemon-vercel-app.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz homepage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Hero Kidz | Fun Learning for Kids",

    description:
      "Explore Hero Kidz — a fun and engaging platform designed for children to learn, explore, and enjoy exciting experiences.",

    images: [
      "https://i.ibb.co.com/ynLnBHjr/Fire-Shot-Capture-001-Hero-Kidz-hero-kidz-lemon-vercel-app.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="flex flex-col min-h-screen bg-background text-foreground container mx-auto px-6  pt-4">
        <NextAuthProvider>
          {/* Header / Navigation */}
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
            <Navbar />
          </header>

          {/* Main Content (flex-1 ensures footer stays at the bottom gracefully) */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="mt-16">
            <Footer />
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
