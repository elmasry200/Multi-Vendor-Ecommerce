import Link from 'next/link'
import React from 'react'

export default function EmptyCart() {
    return (
        <div className='md:text-2xl flex justify-center items-center min-h-screen'>
            <p>
                Your Cart is empty {"  "}
                <Link
                    href="/"
                    className='text-slate-800 dark:text-lime-500'>
                    Start Shopping
                </Link>
            </p>
        </div>
    )
}
