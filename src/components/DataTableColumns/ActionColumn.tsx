import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Row } from "@tanstack/react-table";
import DeleteBtn from '../Actions/DeleteBtn'
import EditBtn from '../Actions/EditBtn'

export default function ActionColumn<T extends { id: string }>({ row, title, endpoint, editEndpoint }: { row: Row<T>; title: string; endpoint: string; editEndpoint: string; }) {
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DeleteBtn title={title} endpoint={endpoint} />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <EditBtn title={title} editEndpoint={editEndpoint} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
}
