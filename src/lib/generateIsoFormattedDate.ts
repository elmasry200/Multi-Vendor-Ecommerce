export function generateIsoFormattedDate(normalDate: string): string{

    const dataObject = new Date(normalDate);

    if (isNaN(dataObject.getTime())) {
        console.error("Invalid date received:", normalDate);
        return ""; // Return empty string instead of crashing
      }
    

      return dataObject.toISOString();
    }