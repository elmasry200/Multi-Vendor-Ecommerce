import Link from 'next/link'
import React from 'react'

export default function CartSubTotalCard({subTotal}: {subTotal: number}) {
    const shipping = 10.0;
    const tax = 0.0;
    const totalPrice = (Number(subTotal) + Number(shipping) + Number(tax)).toFixed(2);
  return (
    <div className="md:col-span-4 col-span-full  sm:block bg-white dark:bg-gray-800 border border-gray-300  rounded-lg dark:border-gray-700 text-slate-800 overflow-hidden p-5 dark:text-slate-100 font-bold">
    <h2 className='text-2xl pb-3'>Cart total</h2>
    <div className='flex items-center justify-between border-b border-slate-500 pb-6'>
      <span>Subtotal</span>
      <span>UGX {subTotal}</span>
    </div>
    <div className='flex items-center justify-between pb-4 mt-2'>
      <span>Tax</span>
      <span>UGX {tax}</span>
    </div>
    <div className='flex items-center justify-between pb-4'>
      <span>Shipping</span>
      <span>UGX {shipping}</span>
    </div>
    <p className='border-b border-slate-500 pb-6 text-slate-400 font-normal'>We only charge for shipping when you have over 2kg items</p>
    <div className='flex items-center justify-between py-4 font-bold'>
      <span>Total</span>
      <span>UGX {totalPrice}</span>
    </div>
    <Link href="#" className='bg-slate-200 text-slate-900 rounded-lg px-4 py-2 font-normal'>Continue to Payment</Link>
  </div>
  )
}
