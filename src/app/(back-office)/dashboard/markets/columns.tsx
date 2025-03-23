"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";

interface Market {
    id: string;
    title: string;
    slug: string;
    uploadedFiles: string[]; // Optional array of file paths or URLs
    description?: string | null;
    isActive: boolean;

    categoryIds: string[];

    createdAt: Date;
    updatedAt: Date;
}



export const columns: ColumnDef<Market>[] = [
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
        header: ({ column }) => (<SortableColumn column={column} title="Title" />),
    },
    {
        accessorKey: "uploadedFiles",
        header: "Market Image",
        cell: ({ row }) => (<ImageColumn row={row} />),
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            return <span>{row.original.isActive ? "Active" : "Inactive"}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: ({ row }) => <DateColumn row={row as { original: Market }} accessorKey="createdAt" />,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionColumn
                row={row}
                title="Market"
                endpoint={`markets/${row.original.id}`}
                editEndpoint={`markets/update/${row.original.id}`}
            />),
    },
]
