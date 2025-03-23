import Image from 'next/image';
import React from 'react'

export default function ImageColumn({ row }: { row: { original: { uploadedFiles: string[] } } }) {
   const images = row.original.uploadedFiles;
              const firstImage = images?.[0] || "/placeholder.jpg"; // Fallback image
  
              return (
                  <div className="w-16 h-16 relative">
                      <Image
                          src={firstImage}
                          alt="Category Image"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                      />
                  </div>
              );
}
