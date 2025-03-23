import React from "react";

export default function DateColumn<T extends Record<string, any>>({
  row,
  accessorKey,
}: { 
  row: { original: T }; 
  accessorKey: keyof T;
}) {
  const rawDate = row.original[accessorKey];

  console.log("Raw date value:", rawDate); // Debugging log

  if (!rawDate) return <span>Invalid Date</span>;

  // Ensure it's converted into a Date object
  const date = new Date(rawDate);
  if (isNaN(date.getTime())) return <span>Invalid Date</span>;

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const getOrdinal = (num: number) => {
      if (num > 3 && num < 21) return "th";
      switch (num % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  };

  return <span>{formatDate(date)}</span>;
}
