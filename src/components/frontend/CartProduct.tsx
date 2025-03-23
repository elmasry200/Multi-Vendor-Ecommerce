"use client";
import { decrementQty, incrementQty, removeFromCart } from '@/redux/slices/cartSlice'
import { Product } from '@prisma/client'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'

export default function CartProduct({ cartItem }: { cartItem: Product }) {

  const dispatch = useDispatch();

  function handleCartItemDelete(cartId: string) {
    // dispatch the RemoveFormCart Reducer
    dispatch(removeFromCart(cartId));
    toast.success(`${cartItem.title} removed Successfully`);
  }
  function handleQtyIncrement(cartId: string) {
    // dispatch the incrementQty Reducer
    dispatch(incrementQty(cartId));
  }
  function handleQtyDecrement(cartId: string) {
    // dispatch the decrementQty Reducer
    dispatch(decrementQty(cartId));
  }

  return (
    <div className="flex items-center justify-between gap-24 border-b border-slate-400 pb-3 font-semibold text-sm mb-4">
      <div className='flex items-center gap-3 flex-1'>
        <Image
          src={cartItem.uploadedFiles[0]}
          width={249}
          height={249}
          alt={cartItem.title}
          className='rounded-xl w-20 h-20'
        />
        <h2>{cartItem.title}</h2>
      </div>
      <div className='flex items-center gap-3 rounded-xl border border-gray-400'>
        <button
          onClick={() => handleQtyDecrement(cartItem.id)}
          className='border-r border-gray-400 py-2 px-4'>
          <Minus />
        </button>
        <p className='flex-grow py-2 px-4'>{cartItem.qty}</p>
        <button
          onClick={() => handleQtyIncrement(cartItem.id)}
          className='border-l border-gray-400 py-2 px-4'>
          <Plus />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <h4>UGX {cartItem.salePrice}</h4>
        <button onClick={() => handleCartItemDelete(cartItem.id)}>
          <Trash2 className='text-red-600 h-5 w-5' />
        </button>
      </div>
    </div>
  )
}
