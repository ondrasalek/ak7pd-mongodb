import type { Metadata } from 'next';
import './globals.css';

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
            <body>{children}</body>
        </html>
    );
}
