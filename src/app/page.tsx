import * as React from "react";
import type { Metadata } from "next";
import Header from "components/Header";

export const metadata: Metadata = {
    title: 'WBC - Whiteboard Camera',
    description: 'Live camera feed on your whiteboard with the ability to crop and scan.'
}

export default function Page() {
    return (<Header />)
}