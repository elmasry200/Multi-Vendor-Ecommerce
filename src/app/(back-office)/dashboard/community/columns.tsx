"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Checkbox } from "@/components/ui/checkbox"


import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

interface Training {
    id: string;
    title: string;
    slug: string;
    uploadedFiles: string[];
    description?: string | null;
    content: any; // JSON type, can be refined if needed
    isActive: boolean;

    categoryId?: string | null;

    createdAt: Date;
    updatedAt: Date;
}


export const columns: ColumnDef<Training>[] = [
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
        header: "Thumbnail",
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
        cell: ({ row }) => <DateColumn row={row as { original: Training }} accessorKey="createdAt" />,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionColumn
                row={row}
                title="Training"
                endpoint={`trainings/${row.original.id}`}
                editEndpoint={`community/update/${row.original.id}`}
            />)
    },
]
