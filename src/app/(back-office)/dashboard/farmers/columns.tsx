"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Checkbox } from "@/components/ui/checkbox"


import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

interface Farmer {
    id: string;
    code: string;
    contactPerson?: string | null;
    contactPersonPhone?: string | null;
    uploadedFiles: string[];
    email: string;
    name: string;
    notes?: string | null;
    phone: string;
    physicalAddress?: string | null;
    terms?: string | null;
    isActive: boolean;
    landSize: number;
    mainCrop: string;

    products: string[];

    userId: string;

    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<Farmer>[] = [
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
        accessorKey: "name",
        header: ({ column }) => (<SortableColumn column={column} title="Name" />),
    },
    {
        accessorKey: "uploadedFiles",
        header: "Farmer Image",
        cell: ({ row }) => (<ImageColumn row={row} />),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => { return (<div>{row.original.email}</div>) },
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
        cell: ({ row }) => <DateColumn row={row as { original: Farmer }} accessorKey="createdAt" />,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionColumn
                row={row}
                title="Farmer"
                endpoint={`farmers/${row.original.id}`}
                editEndpoint={`farmers/update/${row.original.id}`}
            />)
    },
]
