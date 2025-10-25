import { Fustat } from 'next/font/google';

import { Providers } from '@/providers/providers';
import '@/styles/globals.css';

const fustat = Fustat({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body
        className={`${fustat.className} background-linear relative antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
