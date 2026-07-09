import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://suzu-comms.vercel.app'),
  title: 'Pesona Suzu Art Studio - Anime & Chibi Illustration',
  description:
    'Soft anime and chibi illustration portfolio, commission pricing, and open creative collaboration hub by Pesona Suzu.',
  keywords: [
    'Pesona Suzu',
    'Suzu',
    'anime commission',
    'chibi commission',
    'illustration',
    'VTuber asset',
    'cover art',
    'collab art',
  ],
  openGraph: {
    title: 'Pesona Suzu — Pastel Bell Atelier',
    description: 'Anime & chibi commissions, portfolio story, pricing, and open collab.',
    url: 'https://suzu-comms.vercel.app',
    siteName: 'Pesona Suzu',
    images: [
      {
        url: '/suzu/portfolio/webp/shemmi.webp',
        width: 1200,
        height: 1600,
        alt: 'Pesona Suzu featured artwork',
      },
    ],
  },
  twitter: { card: 'summary_large_image', creator: '@ssuzudayo' },
};

export const viewport: Viewport = {
  themeColor: '#fff7f1',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${body.variable} font-body antialiased text-ink`}>
        {children}
      </body>
    </html>
  );
}
