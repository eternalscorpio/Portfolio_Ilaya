import './globals.css';

export const metadata = {
  title: 'Ilayabharathi — Full Stack Developer | MERN & Python',
  description: 'Portfolio of Ilayabharathi Murugan — Full Stack Developer specializing in MERN Stack & Python. Building high-performance web apps, AI agents, and scalable digital products for clients worldwide.',
  keywords: 'Full Stack Developer, MERN, Python, React, Node.js, Next.js, AWS, AI Agents, Portfolio, Ilayabharathi, Tamil Nadu',
  authors: [{ name: 'Ilayabharathi Murugan' }],
  metadataBase: new URL('https://ilayabharathi.dev'),
  openGraph: {
    title: 'Ilayabharathi — Full Stack Developer | MERN & Python',
    description: 'Building high-performance web apps, AI agents, and scalable digital products for clients worldwide.',
    type: 'website',
    locale: 'en_US',
    url: 'https://ilayabharathi.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ilayabharathi — Full Stack Developer',
    description: 'MERN & Python Developer. Building scalable digital products worldwide.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
