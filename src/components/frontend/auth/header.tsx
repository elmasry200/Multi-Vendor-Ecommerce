import { Poppins } from "next/font/google"; 

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
    heading: string;
} ;

export const Header = ({
    label,
    heading
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-2 items-center justify-center ">
            <h1 className={cn("text-xl font-semibold",
                font.className,
            )}>
             🔐 {heading}
            </h1>
            <p className="text-muted-foreground text-sm">
                { label }
            </p>
        </div>
    )
}