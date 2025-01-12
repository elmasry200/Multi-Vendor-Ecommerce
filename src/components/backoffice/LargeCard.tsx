import { Layers } from 'lucide-react'
import React from 'react'

interface LargeCardProps {
    data: {
        period: string;
        sales: number;
        color: string;
    }
}


export default function LargeCard({ data }: LargeCardProps) {

    return (
        <div className={`rounded-lg text-white shadow-md p-8 flex flex-col items-center gap-2 ${data.color}`}>
            <Layers />
            <h4>{data.period}</h4>
            <h2 className='text-2xl lg:text-3xl'>UGX.{data.sales}.k</h2>

        </div>
    )
}
