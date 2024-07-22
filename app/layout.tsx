import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './_components/header';
import Footer from './_components/footer';
import { ContextProvider } from '@/context';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Momento',
  description: 'Momento',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="flex flex-col mx-auto px-6 py-10 relative min-h-[100vh] border-4 border-blue-600">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ContextProvider>
  );
}
