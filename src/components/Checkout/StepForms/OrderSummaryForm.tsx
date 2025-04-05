"use client";
import { Product } from '@prisma/client';
import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import NavButtons from '../NavButtons';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function OrderSummaryForm() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkoutFormData = useSelector((store: any) => store.checkout.checkoutFormData);

  const cartItems: Product[] = useSelector((store: any) => store.cart);
  const subTotal = cartItems.reduce((acc: number, currentItem: Product) => {
    return acc + (currentItem.salePrice * currentItem.qty)
  }, 0).toFixed(2) ?? 0;

  async function submitData() {
    const data = {
      orderItems: cartItems,
      checkoutFormData
    };
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if(response.ok) {
        setLoading(false);
        toast.success("Order created Successfully");
        router.push(`/order-confirmation/${responseData.id}`);
      } else {
        setLoading(false);
        toast.error("Something went wrong, Please try again");        
      }
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }

  return (
    <div className='my-6'>
      <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>Order Summary</h2>
      {cartItems.map((cartItem, i: number) => {
        return (
          <div key={i} className="flex items-center justify-between gap-24 border-b border-slate-400 pb-3 font-semibold text-sm mb-4">
            <div className='flex items-center gap-3 flex-1'>
              <Image
                src={cartItem.uploadedFiles[0]}
                width={249}
                height={249}
                alt={cartItem.title}
                className='rounded-xl w-14 h-14'
              />
              <h2>{cartItem.title}</h2>
            </div>
            <div className='flex items-center gap-3 rounded-xl border border-gray-400'>

              <p className='flex-grow py-2 px-4'>{cartItem.qty}</p>

            </div>
            <div className="flex items-center gap-2">
              <h4>UGX {cartItem.salePrice}</h4>

            </div>
          </div>
        )
      })
      }
      <div className='flex justify-between items-center mt-4'>
        <NavButtons />
      {loading? (
        <button
        disabled
        className='inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-xl focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700'
        >
          Processing Please wait...
        </button>
      ):(
          <button
          onClick={submitData}
          className='inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-xl focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700'>
          Proceed to Payment
        </button>
      )}
      </div>
    </div>
  )
}
