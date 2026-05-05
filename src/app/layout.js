import './globals.css';

export const metadata = {
  title: 'Ilayabharathi — Full Stack Developer | MERN & Python',
  description: 'Portfolio of Ilayabharathi — Full Stack Developer specializing in MERN Stack & Python. Building high-performance digital products, DSC services, and government registration platforms across Tamil Nadu.',
  keywords: 'Full Stack Developer, MERN, Python, React, Node.js, Next.js, Portfolio, Ilayabharathi, Tamil Nadu',
  authors: [{ name: 'Ilayabharathi' }],
  openGraph: {
    title: 'Ilayabharathi — Full Stack Developer',
    description: 'NextGen 3D Portfolio — MERN & Python Developer from Tamil Nadu',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
