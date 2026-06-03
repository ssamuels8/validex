import type { Metadata, Viewport } from 'next';
import { Syne, Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-condensed',
  display: 'swap',
});

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0A0B0A"/><text x="5" y="24" font-family="serif" font-size="20" font-weight="700" fill="#ECE7DD">V</text><circle cx="26" cy="10" r="4" fill="#4FAE7E"/></svg>`;

export const viewport: Viewport = {
  themeColor: '#0A0B0A',
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
    <html
      lang="en"
      className={`${syne.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
