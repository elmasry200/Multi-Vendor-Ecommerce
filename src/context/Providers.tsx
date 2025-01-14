"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes"

import React from 'react'

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <div>
            <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
            </ThemeProvider>
        </div>
    )
}
