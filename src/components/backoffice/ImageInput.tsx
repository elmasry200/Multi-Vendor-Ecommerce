"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { type OurFileRouter } from "@/app/api/uploadthing/core";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Pencil } from "lucide-react";
import Image from "next/image";

import React from "react";
import toast from "react-hot-toast";

interface ImageInputProps {
    label: string;
    uploadedFiles: string[];
    setUploadedFiles: (url: string[]) => void; // Corrected type for setImageUrl
    className?: string; // Made optional
    endpoint: keyof OurFileRouter; // Matches the endpoint key
}

export default function ImageInput({
    label,
    uploadedFiles = [],
    setUploadedFiles,
    className = "col-span-full",
    endpoint = "imageUploader"
}: ImageInputProps) {

    return (
        <div className={className}>
            <div className="flex justify-between items-center mb-4">
                <Label
                    //htmlFor="course-image"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
                >
                    {label}
                </Label>
                {uploadedFiles.length > 0 && (
                    <button
                        onClick={() => setUploadedFiles([])}
                        type="button"
                        className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
                    >
                        <Pencil className="w-5 h-5" />
                        <span>Change Images</span>
                    </button>
                )}
            </div>
            {uploadedFiles.length > 0 ? (
                <Image
                    src={uploadedFiles[0]}
                    alt="Item Image"
                    width={1000}
                    height={667}
                    className="w-full h-64 object-contain"
                />
            ) : (
                <UploadDropzone
                    endpoint={endpoint}
                    onClientUploadComplete={(res) => {
                        if (res) {
                            setUploadedFiles(res.map((file) => file.url));
                            console.log("Uploaded Files:", res);
                          }
                        }}
                    //     if (res && res[0]?.url) {
                    //         setImageUrl(res[0].url); // Set the file URL to state

                    //         toast.success("Image Upload complete");                            
                    //         console.log("Upload successful:", res);
                    //       }
                    // }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        console.log(`ERROR! ${error.message}`);
                        toast.error("Image Upload Failed, Try Again");
                    }}
                  
                />
            )}
        </div>
    )
}
