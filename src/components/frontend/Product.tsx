"use client";
import { addToCart } from '@/redux/slices/cartSlice';
import { Prisma } from '@prisma/client'
import { BaggageClaim } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Product({product}: {product: Prisma.ProductGetPayload<{}>}) {
const dispatch = useDispatch();
function handleAddToCart(){
 // Dispatch the reducer
   dispatch(addToCart(product));
   toast.success(`${product.title} added Successfully`);
}

  return (
    <div 
     className="rounded-lg min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] overflow-hidden bg-white dark:bg-slate-900 mx-1">
    <Link href={`/products/${product.slug}`}>
        <Image
            src={product.uploadedFiles[0]}
            alt={product.title}
            width={556}
            height={556}
            className="w-full h-56 object-cover rounded-lg bg-red-400"
        />
    </Link>
    <div className="px-4">
        <Link href={`/products/${product.slug}`}>
            <h2 className="font-semibold text-center dark:text-slate-200 text-slate-800 my-2">
                {product.title}
            </h2>
        </Link>
        <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-100">
            <p>UGX {product.salePrice}</p>
            <button onClick={()=>handleAddToCart()} className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md">
                <BaggageClaim />
                <span>Add</span>
            </button>
        </div>
    </div>
</div>
  )
}
