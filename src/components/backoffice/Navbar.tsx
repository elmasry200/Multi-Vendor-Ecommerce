import { AlignJustify, Bell, LayoutDashboard, LogOut, Settings, Sun, X } from 'lucide-react'
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
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
  return (
    <div className='flex items-center justify-between dark:bg-slate-800 bg-white text-slate-50
                    h-20 px-8 py-4 fixed z-50 top-0 max-w-full left-60 right-0'>
      {/* Icon */}
      <button className='text-lime-700 dark:text-lime-500'>
        <AlignJustify />
      </button>
      {/* 3 Icons */}
      <div className='flex space-x-4'>
        <ThemeSwitcherBtn />
        <DropdownMenu>
          <DropdownMenuTrigger>
          <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg">
          <Bell className='text-lime-700 dark:text-lime-500' />
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-6 dark:border-gray-900">20</div>
        </button>
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
              <button>
                <X />
              </button>
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
              <button>
                <X />
              </button>
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
              <button>
                <X />
              </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>
              <Image
                src='/profile.jpg'
                alt='User Profile'
                width={275}
                height={183}
                className='w-8 h-8 rounded-full'
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='px-4 py-2 pr-8'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className='flex items-center space-x-2'>
                <LayoutDashboard className="mr-2 w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className='flex items-center space-x-2'>
                <Settings className="mr-2 w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className='flex items-center space-x-2'>
                <LogOut className="mr-2 w-4 h-4" />
                <span>Logout</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


      </div>
    </div>
  )
}
