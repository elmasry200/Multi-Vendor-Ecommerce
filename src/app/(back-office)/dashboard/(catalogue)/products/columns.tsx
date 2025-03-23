"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Checkbox } from "@/components/ui/checkbox"


import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

export interface Product {
    id: string;
    title: string;
    description: string;
    slug: string;
    uploadedFiles: string[];
    sku: string;
    barcode: string;
    productPrice: number;
    salePrice: number;
    categoryId: string;
    farmerId: string;
    tags: string[] | null;
    isActive: boolean;
    isWholesale: boolean;
    wholesalePrice: number;
    wholesaleQty: number;
    productCode: string;
    productStock: number;
    unit: string;
    qty: number;
    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<Product>[] = [
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
        header: "Product Image",
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
        cell: ({ row }) => <DateColumn row={row as { original: Product }} accessorKey="createdAt" />,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionColumn
                row={row}
                title="Product"
                endpoint={`products/${row.original.id}`}
                editEndpoint={`products/update/${row.original.id}`}
            />)
    },
]
