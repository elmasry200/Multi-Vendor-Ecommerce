"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

interface Coupon {
    id: string;
    title: string;
    couponCode: string;
    expiryDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};


export const columns: ColumnDef<Coupon>[] = [
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
        accessorKey: "couponCode",
        header: "coupon Code",
    },
    {
        accessorKey: "expiryDate",
        header: "Expiry Date",
        cell: ({ row }) => {
            console.log(typeof (row.original.expiryDate));
            const expiryDate = new Date(row.original.expiryDate);
            return <DateColumn row={{ original: { expiryDate } }} accessorKey="expiryDate" />
        }
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
        cell: ({ row }) => <DateColumn row={row as { original: Coupon }} accessorKey="createdAt" />,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionColumn
                row={row}
                title="Coupon"
                endpoint={`coupons/${row.original.id}`}
                editEndpoint={`coupons/update/${row.original.id}`}
            />)
    },
]
