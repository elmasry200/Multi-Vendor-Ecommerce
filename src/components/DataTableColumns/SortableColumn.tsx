import React from "react";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table"; // Import Column type

export default function SortableColumn<T>({ column, title }: { column: Column<T>; title: string }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
