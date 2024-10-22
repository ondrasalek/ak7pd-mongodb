import type { Metadata } from 'next';
import './globals.css';
import { CookiesProvider } from 'next-client-cookies/server';
import Header from '@/components/layout/header/Header';

export const metadata: Metadata = {
    title: 'AK7PD MongoDB',
    description: 'AK7PD MongoDB',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <CookiesProvider>
                <body>
                    <Header />
                    <main>{children}</main>
                </body>
            </CookiesProvider>
        </html>
    );
}
