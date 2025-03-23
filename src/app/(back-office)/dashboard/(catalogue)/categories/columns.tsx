"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Checkbox } from "@/components/ui/checkbox"


import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";


export interface Category {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    uploadedFiles: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

export const columns: ColumnDef<Category>[] = [
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
        header: "Category Image",
        cell: ({ row }) => (<ImageColumn row={row} />),
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
        header: "Active",
        cell: ({ row }) => {
            return <span>{row.original.isActive ? "Active" : "Inactive"}</span>;
        },
    },
    {
            accessorKey: "createdAt",
            header: "Date Created",
            cell: ({ row }) => <DateColumn row={row as { original: Category }} accessorKey="createdAt" />,
          },
    {
        id: "actions",
        cell: ({ row }) => (
        <ActionColumn
           row={row}
           title="Category" 
           endpoint={`categories/${row.original.id}`}
           editEndpoint = {`categories/update/${row.original.id}`}
           />)
    },
]
