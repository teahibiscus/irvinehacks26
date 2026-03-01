import { Geist, Geist_Mono } from "next/font/google";
import { Courgette } from "next/font/google";
import { Lato } from "next/font/google";

import "./globals.css";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lato",
});

const courgette = Courgette({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-courgette",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Papertrail - send a feeling, not just a message",
  description: "All with love, from your heart to theirs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
