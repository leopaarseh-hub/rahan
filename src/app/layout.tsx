import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Kian Markt | Premium Iranian & Afghan Supermarket in Köln',
  description: 'Kian Markt — premium Iranian and Afghan supermarket in Köln offering fresh groceries, traditional ingredients, saffron, spices, rice, tea, dairy and everyday essentials. Luxemburger Str. 12, 50674 Köln.',
  keywords: ['Kian Markt', 'Iranischer Supermarkt Köln', 'Afghan Supermarket', 'Persische Lebensmittel', 'Premium Supermarkt Köln', 'کیان مارکت', 'کلن'],
  openGraph: {
    title: 'Kian Markt | Premium Iranian & Afghan Supermarket in Köln',
    description: 'Premium Iranian and Afghan groceries in Köln — Luxemburger Str. 12',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#131513" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
