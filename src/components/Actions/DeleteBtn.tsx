"use client";
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Swal from "sweetalert2";

export default function DeleteBtn({ endpoint, title }: { endpoint: string; title: string; }) {
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    async function handleDelete() {
        setLoading(true);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {            
            if (result.isConfirmed) {
                console.log("Yes have been Clicked");
                const res = await fetch(`${baseUrl}/api/${endpoint}`, {
                    method: "DELETE",
                });
                console.log(res);
                if(res.ok) {
                    router.refresh();
                    setLoading(false);
                    toast.success(`${title} Deleted Successfully`);
                }             
            } else {
                console.log("No has been Clicked");
                setLoading(false);
            }
        });
    }
    return (
        <>
            {loading ? (
                <button
                    disabled
                    type="button"
                    className='mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[0.5rem] px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center'
                >
                    <Trash2 className='w-4 h-4' />
                    Deleting Please wait...
                </button>
            ) : (
                <button
                    onClick={handleDelete}
                    className='font-medium text-red-600 dark:text-red-500 flex items-center space-x-1'
                >
                    <Trash2 className='w-4 h-4' />
                    <span>Delete {title}</span>
                </button>
            )}
        </>
    )
}
