import './globals.css';

export const metadata = {
    title: 'KINETIK STUDIO — We Craft Culture for the Hyper-Digital',
    description: 'KINETIK is a next-generation creative, digital & cultural agency specializing in 3D brand systems, viral social campaigns, high-performance web, and CGI productions.',
    icons: {
        icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&auto=format&fit=crop&q=80',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@400..700&family=Syne:wght@600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
