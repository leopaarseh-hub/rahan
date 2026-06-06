import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Rahan Markt | Iranian & Afghan Supermarket in Düsseldorf',
  description: 'Premium Iranian and Afghan supermarket in Düsseldorf offering fresh groceries, traditional ingredients, spices, rice, tea, dairy and everyday essentials. Kölner Str. 49, 40211 Düsseldorf.',
  keywords: ['Rahan Markt', 'Iranischer Supermarkt Düsseldorf', 'Afghan Supermarket', 'Persische Lebensmittel', 'راهان مارکت', 'دوسلدورف'],
  openGraph: {
    title: 'Rahan Markt | Iranian & Afghan Supermarket in Düsseldorf',
    description: 'Fresh Iranian and Afghan groceries in Düsseldorf — Kölner Str. 49',
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
        <meta name="theme-color" content="#3B5249" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
