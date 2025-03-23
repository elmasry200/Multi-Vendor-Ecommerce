"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface dateProps {
  date: Date;
  setDate: (date: Date) => void;
  label?: string;
}

export default function DatePickerDemo({date, setDate, label = "Select Date"}: dateProps) {


  return (
    <div className="w-full flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-100">{label}</label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => setDate(selectedDate as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}
