export function convertIsoDateToNormal(isoDate: string) {
    const dateObject = new Date(isoDate);
    if (isNaN(dateObject.getTime())) return "Invalid Date";

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}