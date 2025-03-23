"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
    id: string;
    title: string;
    uploadedFiles: string[];
    description: string;
    isActive: boolean;
    createdAt: Date;
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "uploadedFiles",
        header: "Category Image",
        cell: ({ row }) => {
            const images = row.original.uploadedFiles;
            const firstImage = images?.[0] || "/placeholder.jpg"; // Fallback image

            return (
                <div className="w-16 h-16 relative">
                    <Image
                        src={firstImage}
                        alt="Category Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
            );
        },
    },
    // {
    //     accessorKey: "description",
    //     header: "Description",
    //     cell: ({ row }) => {
    //         const description: string = row.getValue("description");
    //         return (
    //         <div className="line-clamp-1">
    //           {description}
    //         </div>
    //         );    
    //     },
    // },
    {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ row }) => {
            return <span>{row.original.isActive ? "Active" : "Inactive"}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);

            // Function to format the date as "11th Dec 2023"
            const formatDate = (date: Date) => {
                const day = date.getDate();
                const month = date.toLocaleString("en-US", { month: "short" });
                const year = date.getFullYear();

                // Function to add ordinal suffix (st, nd, rd, th)
                const getOrdinal = (num: number) => {
                    if (num > 3 && num < 21) return "th"; // Covers 11th, 12th, 13th, etc.
                    switch (num % 10) {
                        case 1:
                            return "st";
                        case 2:
                            return "nd";
                        case 3:
                            return "rd";
                        default:
                            return "th";
                    }
                };

                return `${day}${getOrdinal(day)} ${month} ${year}`;
            };

            return <span>{formatDate(date)}</span>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy the status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete Category</DropdownMenuItem>
                        <DropdownMenuItem>Edit Category</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
