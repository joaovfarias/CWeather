import { Geist, Geist_Mono, Tomorrow } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "CWeather",
  description: "Get real time weather data with visuals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={tomorrow.className}>{children}</body>
    </html>
  );
}
