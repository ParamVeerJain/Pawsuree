import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/content';
import DogCursor from '@/components/DogCursor';
import PawTrail from '@/components/PawTrail';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4A87C8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DogCursor />
        <PawTrail />
        {children}
      </body>
    </html>
  );
}
