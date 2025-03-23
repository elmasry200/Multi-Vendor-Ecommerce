import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CornerDownLeft, Headphones, HelpCircle, MessageSquare, Truck } from 'lucide-react'
import Link from 'next/link'

export default function HelpModal() {
    return (
        <Dialog>
            <DialogTrigger className="flex items-center space-x-1 text-lime-600">

                <HelpCircle />
                <span>Help</span>

            </DialogTrigger>
            <DialogContent className="top-20 mx-auto translate-y-0 dark:bg-slate-700">
                <DialogHeader>
                    <DialogTitle>Need Help with Shopping, Talk to our Help Desk</DialogTitle>
                    <DialogDescription>
                        <div className="grid grid-cols-2 mt-4 gap-6">
                            <Link href="el:02574854546" className='flex items-center space-x-2 text-gray-100'>
                                <div className='flex items-center justify-center w-10 h-10 bg-lime-100 rounded-full'>
                                <Headphones className='w-6 h-6 text-lime-800'/>
                                </div>
                                <span>Call: 02574854546</span>
                            </Link>
                            <Link href="/track" className='flex items-center space-x-2 text-gray-100'>
                                <div className='flex items-center justify-center w-10 h-10 bg-lime-100 rounded-full'>
                                <Truck className='w-6 h-6 text-lime-800'/>
                                </div>
                                <span>Track your Order</span>
                            </Link>
                            <Link href="el:02574854546" className='flex items-center space-x-2 text-gray-100'>
                                <div className='flex items-center justify-center w-10 h-10 bg-lime-100 rounded-full'>
                                <CornerDownLeft className='w-6 h-6 text-lime-800'/>
                                </div>
                                <span>Returns and Refunds</span>
                            </Link>
                            <Link href="el:02574854546" className='flex items-center space-x-2 text-gray-100'>
                                <div className='flex items-center justify-center w-10 h-10 bg-lime-100 rounded-full'>
                                <MessageSquare className='w-6 h-6 text-lime-800'/>
                                </div>
                                <span>Chat with Us</span>
                            </Link>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
