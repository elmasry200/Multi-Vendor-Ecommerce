"use client"
import { AlignJustify, Bell, LayoutDashboard, LogOut, Settings, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ThemeSwitcherBtn from "@/components/ThemeSwitcherBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import UserAvatar from './UserAvatar';
import { useSession } from 'next-auth/react';

interface NavbarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ showSidebar, setShowSidebar }: NavbarProps) {
  const {data: session, status} = useSession();
  if(status === "loading") {
    return <p>Loading...</p>
  }
  return (
    <div className={showSidebar ? "flex items-center justify-between dark:bg-slate-800 bg-white text-slate-50 h-20 py-8 fixed top-0 w-full px-8 z-50 sm:pr-[18rem]" : "flex items-center justify-between dark:bg-slate-800 bg-white text-slate-50 h-20 py-8 fixed top-0 w-full px-8 z-50"} >

      <Link href={"/dashboard"} className='sm:hidden'>
        Limi
      </Link>

      {/* Icon */}
      <button onClick={() => setShowSidebar(!showSidebar)} className='text-lime-700 dark:text-lime-500'>
        <AlignJustify />
      </button>
      {/* 3 Icons */}
      <div className='flex space-x-4'>
        <ThemeSwitcherBtn />
        <DropdownMenu>
          <DropdownMenuTrigger className='outline-none'>
            <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg">
              <Bell className='text-lime-700 dark:text-lime-500' />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-6 dark:border-gray-900">20</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='px-4 py-2 pr-8'>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <div className='flex items-center space-x-2'>
                <Image
                  src='/profile.jpg'
                  alt='User Profile'
                  width={275}
                  height={183}
                  className='w-8 h-8 rounded-full'
                />
                <div className="flex flex-col space-y-1">
                  <p>Yellow Sweet CornStock out, </p>
                  <div className='flex items-center space-x-2'>
                    <p className='px-3 py-0.5 bg-red-700 text-white rounded-full text-sm'>Stock Out</p>
                    <p>Dec 12 2021 - 12:40PM</p>
                  </div>
                </div>
                <div>
                  <X />
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex items-center space-x-2'>
                <Image
                  src='/profile.jpg'
                  alt='User Profile'
                  width={275}
                  height={183}
                  className='w-8 h-8 rounded-full'
                />
                <div className="flex flex-col space-y-1">
                  <p>Yellow Sweet CornStock out, </p>
                  <div className='flex items-center space-x-2'>
                    <p className='px-3 py-0.5 bg-red-700 text-white rounded-full text-sm'>Stock Out</p>
                    <p>Dec 12 2021 - 12:40PM</p>
                  </div>
                </div>
                <div>
                  <X />
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex items-center space-x-2'>
                <Image
                  src='/profile.jpg'
                  alt='User Profile'
                  width={275}
                  height={183}
                  className='w-8 h-8 rounded-full'
                />
                <div className="flex flex-col space-y-1">
                  <p>Yellow Sweet CornStock out, </p>
                  <div className='flex items-center space-x-2'>
                    <p className='px-3 py-0.5 bg-red-700 text-white rounded-full text-sm'>Stock Out</p>
                    <p>Dec 12 2021 - 12:40PM</p>
                  </div>
                </div>
                <div>
                  <X />
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        {status === "authenticated" && <UserAvatar user={session?.user} />}
      
      </div>
    </div>
  )
}
