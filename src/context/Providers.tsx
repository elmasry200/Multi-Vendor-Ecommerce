"use client";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast";
import React from 'react'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Set the mounted state to true once the component is mounted on the client
        setIsMounted(true);
    }, []);

    // If the component hasn't mounted yet, don't render the ThemeProvider yet
    if (!isMounted) {
        return
        <>
            {children}
        </>;
    }

    return (
        <>
            {/* ThemeProvider to handle themes */}
            <ThemeProvider attribute="class" defaultTheme="dark">
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}
        />
                {/* Toaster for react-hot-toast */}
            <Toaster
                position="top-center" // Customize the position of the toast
                toastOptions={{
                    duration: 3000, // Default toast duration
                }}
            />
                <Provider store={store}>
                   {children}
                </Provider>
            </ThemeProvider>            
        </>
    )
}
