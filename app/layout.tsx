import type { Metadata, Viewport } from 'next';
import { Playfair_Display, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const ibmSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0A0B0A"/><text x="6" y="23" font-family="serif" font-size="18" font-weight="700" fill="#ECE7DD">V</text><circle cx="26" cy="10" r="4" fill="#4FAE7E"/></svg>`;

export const viewport: Viewport = {
  themeColor: '#0A0B0A',
};

export const metadata: Metadata = {
  title: 'Validex — Verified Sustainability Scores',
  description:
    'Validex is the independent measurement layer for sustainability. Anchored to ESRS. Built for the sceptic.',
  metadataBase: new URL('https://validex.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Validex — Verified Sustainability Scores',
    description:
      'Validex is the independent measurement layer for sustainability. Anchored to ESRS. Built for the sceptic.',
    url: 'https://validex.vercel.app',
    siteName: 'Validex',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Validex — Verified Sustainability Scores',
      },
    ],
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
      className={`${playfair.variable} ${ibmSans.variable} ${ibmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
