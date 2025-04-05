"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Header } from "@/components/frontend/auth/header";
import { Social } from "@/components/frontend/auth/social";
import { BackButton } from "@/components/frontend/auth/back-button";


interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerHeading: string;
    backButtonLabel: string;
    backButtonHref: string;
    vendorbuttonLabel: string;
    vendorButtonHref: string;
    showBackButton: boolean;
    showSocial: boolean;
}

export default function CardWrapper({
    children,
    headerLabel,
    headerHeading,
    backButtonLabel,
    backButtonHref,
    vendorbuttonLabel,
    vendorButtonHref,
    showBackButton = false,
    showSocial
}: CardWrapperProps) {

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} heading={headerHeading} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter className="-mt-6 flex justify-center items-center">
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
                {showBackButton &&
                    <BackButton
                        label={vendorbuttonLabel}
                        href={vendorButtonHref}
                    />

                }
            </CardFooter>
        </Card>


    )
}
