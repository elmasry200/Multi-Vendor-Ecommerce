import React from 'react'
import CartProduct from './CartProduct'
import { Product } from '@prisma/client'
import EmptyCart from './EmptyCart'

export default function CartItems({ cartItems }: { cartItems: Product[] }) {
    return (
        <div className="md:col-span-8 col-span-full">
            {cartItems.length > 0 && (
                <>
                    <h2 className='py-2 mb-6 text-2xl'>Your Cart</h2>
                    <div className="flex items-center justify-between gap-48 border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
                        <h2 className="uppercase flex-1">Product</h2>
                        <h2 className="uppercase">Quantity</h2>
                        <h2 className="uppercase">Price</h2>
                    </div>
                </>
            )}
            <div className=''>
                {cartItems.length > 0 ? (
                    cartItems.map((item: Product, i: number) => {
                        return <CartProduct cartItem={item} key={i} />
                    })
                ) : (
                    <EmptyCart />
                )}
            </div>
            {/* COUPON FORM */}
            <div className="flex items-center gap-2 py-8">
                <input type="text" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" placeholder="Enter Coupon" />
                <button className='px-4 py-2.5 rounded-lg bg-lime-600 shrink-0'>Apply Coupon</button>
            </div>
        </div>
    )
}
