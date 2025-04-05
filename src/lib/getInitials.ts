export function getInitials(name: string): string {
    const words = name.trim().split(/\s+/); // Split by spaces and remove extra whitespace
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()); // Get first letter of first two words
    return initials.join(""); // Join initials into a string
}


