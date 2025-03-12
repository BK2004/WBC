import * as React from "react";
import { Albert_Sans as Font } from "next/font/google"
import 'app/globals.css';

const font = Font({ subsets: ['latin'] })

export default function RootLayout({
    children
}: {
    children: React.ReactNode[],
}) {
    return (<html lang="en">
        <body className={font.className}>
            {children}
        </body>
    </html>)
}