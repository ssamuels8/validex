import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-main',
  display: 'swap',
});

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#F8F6F1"/><text x="5" y="24" font-family="sans-serif" font-size="20" font-weight="700" fill="#0D0D0D">V</text><circle cx="26" cy="10" r="4" fill="#2A6B4A"/></svg>`;

export const viewport: Viewport = {
  themeColor: '#F8F6F1',
};

export const metadata: Metadata = {
  title: 'Validex — Verified Sustainability Scores',
  description:
    'Validex is the independent measurement layer for sustainability. Anchored to ESRS. Built for the sceptic.',
  metadataBase: new URL('https://validex.vercel.app'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Validex — Verified Sustainability Scores',
    description:
      'Validex is the independent measurement layer for sustainability. Anchored to ESRS. Built for the sceptic.',
    url: 'https://validex.vercel.app',
    siteName: 'Validex',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Validex' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validex — Verified Sustainability Scores',
    description:
      'Validex is the independent measurement layer for sustainability. Anchored to ESRS. Built for the sceptic.',
    images: ['/og'],
  },
  icons: {
    icon: `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
