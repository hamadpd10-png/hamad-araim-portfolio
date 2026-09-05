import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: { default: 'Hamad Araim | Mechanical Engineering & Management', template: '%s | Hamad Araim' },
  description: 'Mechanical engineering portfolio of Hamad Araim at McMaster University. Explore CAD, robotic mechanisms, assistive design, prototyping, and testing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main">Skip to content</a>{children}
      </body>
    </html>
  );
}
