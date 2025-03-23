import { format } from "date-fns";

export function generateCouponCode(title: string, expireDate: string): string {
  const formattedTitle = title.toUpperCase().replace(/\s+/g, ""); // Trim spaces and convert to uppercase
  const dateObject = new Date(expireDate);
  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date:", expireDate);
    return `${formattedTitle}-INVALIDDATE`;
  }

  const formattedDate = format(dateObject, "ddMMyyyy");
  return `${formattedTitle}-${formattedDate}`;
}

// Example usage
// const title = " blackfriday "; // Notice the spaces
// const expireDate = new Date("2025-01-31");
// const couponCode = generateCouponCode(title, expireDate);

// console.log(couponCode); // Output: BLACKFRIDAY-31012025
