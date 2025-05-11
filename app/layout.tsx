import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter     = Inter({ subsets: ['latin'], variable: '--font-sans',  display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}