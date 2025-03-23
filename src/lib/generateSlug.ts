import { Replace } from "lucide-react";

export function generateSlug(title: string) {
    const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^\-+/, "")
    .replace(/\-+$/, "")
    
    return slug;
}   