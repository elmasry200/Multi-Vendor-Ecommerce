export function generateUserCode(prefix: string, fullname: string): string {
    // Take the first letter of each word in the fullname and capitalize it
    const formattedFullname = fullname
      .split(' ') // Split the full name into individual words
      .map((word) => word.charAt(0).toUpperCase()) // Get the first letter and capitalize it
      .join(''); // Join the letters without any separator
    
    // Get the current date in DDMMYYYY format
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();
    const formattedDate = `${day}${month}${year}`;
    
    // Generate the unique code
    const userCode = `${prefix}-${formattedFullname}-${formattedDate}`;
    
    return userCode;
  }
  
  // Example usage:
//  const code = generateUserCode("LFF", "ahmed masry");
 // console.log(code); // Output: "LFF-AM-31012025"
  