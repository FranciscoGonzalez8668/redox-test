// src/app/layout.tsx (sin cambios)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import MainLayoutClient from '../components/MainLayoutClient'; // Ajusta la ruta si es necesario

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
      </body>
    </html>
  );
}