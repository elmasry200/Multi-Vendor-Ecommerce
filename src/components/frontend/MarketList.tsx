import React from 'react'
import MarketCarousel from '@/components/frontend/MarketCarousel'
import { getData } from '@/lib/getData'

export default async function MarketList() {
    const markets = await getData('markets');
    return (
        <div className='py-6 dark:text-white'>
           
            {/* Maraket Slider */}
            <div className="bg-slate-50 dark:bg-lime-900 rouded-lg px-4 py-2 rounded-lg">
            <h2 className='py-2 text-center text-2xl text-slate-900 dark:text-slate-50 mb-4'>Shop by Market</h2>
                <MarketCarousel markets={markets} />
            </div>
        </div>
    )
}
