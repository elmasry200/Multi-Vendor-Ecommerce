"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from "../../../public/dark-logo.png"
import { Boxes, Building2, ChevronDown, ChevronRight, CircleDollarSign, ExternalLink, LayoutGrid, LayoutList, LogOut, MonitorPlay, ScanSearch, SendToBack, Slack, Truck, User, Users2, UserSquare2, Warehouse } from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"


import { usePathname } from 'next/navigation'

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({showSidebar, setShowSidebar}: SidebarProps) {

    const pathname = usePathname();

    const sidebarLinks = [
        {
            title: "Customers",
            icon: Users2,
            href: "/dashboard/customers"
        },
        {
            title: "Markets",
            icon: Warehouse,
            href: "/dashboard/markets"
        },
        {
            title: "Farmers",
            icon: UserSquare2,
            href: "/dashboard/farmers"
        },
        {
            title: "Orders",
            icon: Truck,
            href: "/dashboard/orders"
        },
        {
            title: "Our Staff",
            icon: User,
            href: "/dashboard/staff"
        },
        {
            title: "Limi Community",
            icon: Building2,
            href: "/dashboard/community"
        },
        {
            title: "Wallet",
            icon: CircleDollarSign,
            href: "/dashboard/wallet"
        },
        {
            title: "Settings",
            icon: LayoutGrid,
            href: "/dashboard/settings"
        },
        {
            title: "Online Store",
            icon: ExternalLink,
            href: "/"
        }
    ];

    const catalogueLinks = [
        {
            title: "Products",
            icon: Boxes,
            href: "/dashboard/products"
        },
        {
            title: "Categories",
            icon: LayoutList,
            href: "/dashboard/categories"
        },
        {
            title: "Coupons",
            icon: ScanSearch,
            href: "/dashboard/coupons"
        },
        {
            title: "Store Banners",
            icon: MonitorPlay,
            href: "/dashboard/banners"
        }
    ];

const [openMenu,setOpenMenu] = useState(false);

    return (
        <div className={showSidebar ? "sm:block mt-20 sm:mt-0 dark:bg-slate-800 bg-white space-y-6 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll":"hidden mt-20 sm:mt-0 dark:bg-slate-800 bg-white space-y-6 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll"}>
            <Link href="/dashboard" className='px-6 py-4'>
                <Image
                    src={logo}
                    alt='limifood logo'
                    className='h-15 w-full px-3'
                    width={441}
                    height={114}
                />
            </Link>
            <div className='space-y-3 flex flex-col'>

                <Link href="/dashboard"
                    className={pathname === '/dashboard' ?
                        "flex items-center space-x-3 px-6 py-2 border-l-8 border-lime-500 text-lime-500" : "flex items-center space-x-3 px-6 py-2"
                    }>
                    <LayoutGrid />
                    <span>Dashboard</span>
                </Link>

                <Collapsible className='px-6 py-2'>
                    <CollapsibleTrigger className='' onClick={()=> setOpenMenu(!openMenu)}>
                        <div
                            className='flex items-center space-x-6 py-2'>
                            <div className='flex items-center space-x-3'>
                                <Slack />
                                <span>Catalogue</span>
                            </div>
                          {openMenu ? <ChevronDown /> : <ChevronRight />  }
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='py-3 px-3 pl-6 bg-slate-800 rounded-lg'>
                        {
                            catalogueLinks.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                    key={i}
                                    onClick={()=> setShowSidebar(false)}
                                     href={item.href}
                                        className={pathname === item.href ?
                                            "flex items-center space-x-3 py-1 text-sm text-lime-500" : "flex items-center space-x-3 py-1"
                                        }>
                                        <Icon className='h-4 w-4' />
                                        <span>{item.title}</span>
                                    </Link>
                                )
                            })
                        }
                    </CollapsibleContent>
                </Collapsible>

                {
                    sidebarLinks.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={i}
                                onClick={()=> setShowSidebar(false)}
                                href={item.href}
                                className={item.href == pathname ?
                                    "flex items-center space-x-3 px-6 py-2 border-l-8 border-lime-500 text-lime-500" : "flex items-center space-x-3 px-6 py-2"
                                }>
                                <Icon />
                                <span>{item.title}</span>
                            </Link>
                        )
                    })
                }

                <div className='px-6 py-2'>
                    <button className='bg-lime-600 rounded-md flex items-center space-x-3 px-6 py-3'>
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
