import { ShoppingCart } from 'lucide-react'
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface SmallCardProps {
    data: {
      title: string; // The period (e.g., "Today")
      number: number;  // The sales amount
      iconBg: string;  // Background color for the card
      icon: LucideIcon; // The Lucide icon component
    };
  }

export default function SmallCard({data}: SmallCardProps) {

    const { title, number, iconBg, icon: Icon } = data; 

  return (
    <div className='rounded-lg shadow-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-50 p-4'>
      <div className='flex space-x-4'>
        <div className={`w-12 h-12 ${iconBg} rounded-full flex justify-center items-center`}>
           <Icon className='dark:text-slate-50 text-slate-50'/>
        </div>
         
         <div className=''>
            <p>{title}</p>
            <h3 className='text-2xl font-bold'>{number}</h3>
         </div>
      </div>
    </div>
  )
}
