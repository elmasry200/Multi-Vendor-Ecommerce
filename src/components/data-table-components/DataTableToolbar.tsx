"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table-components/DataTableViewOptions"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterKeys?: string[]
}

export function DataTableToolbar<TData>({
  table,
  filterKeys = ["title"],
}: DataTableToolbarProps<TData>) {
  const isFiltered = filterKeys.some(
    (key) => (table.getColumn(key)?.getFilterValue() as string)?.length > 0
  )

  const handleInputChange = (key: string, value: string) => {
    table.getColumn(key)?.setFilterValue(value)
  }

  const handleResetClick = () => {
    filterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue("")
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterKeys.map((key) => (
          <Input
            key={key}
            placeholder={`Filter ${key}...`}
            value={(table.getColumn(key)?.getFilterValue() as string) ?? ""}
            onChange={(event) => handleInputChange(key, event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
