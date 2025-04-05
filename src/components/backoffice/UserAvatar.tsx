"use client";
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image'
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react'

import { Session } from 'next-auth'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { getInitials } from '@/lib/getInitials';

export default function UserAvatar({ user }: { user?: Session["user"] }) {
    const { name, image } = user ?? {};
    const initials = getInitials(name || "");
    const role = user?.role;
    const router = useRouter();
    async function handleLogout() {
        await signOut();
        router.push("/");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt="User Profile"
                            width={40}
                            height={40}
                            className="w-8 h-8 rounded-full"
                        />
                    ) : (
                        <div className='flex items-center justify-center p-4 w-8 h-8 rounded-full bg-slate-800 text-white shadow-md border border-slate-600'>{initials}</div>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='px-4 py-2 pr-8'>
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/dashboard" className='flex items-center space-x-2'>
                        <LayoutDashboard className="mr-2 w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard/profile" className='flex items-center space-x-2'>
                        <Settings className="mr-2 w-4 h-4" />
                        <span>Edit Profile</span>
                    </Link>
                </DropdownMenuItem>
                {role === "USER" && (
                    <DropdownMenuItem>
                        <Link
                            href="/dashboard/orders"
                            className='flex items-center space-x-2'>
                            <Settings className="mr-2 w-4 h-4" />
                            <span>My Orders</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                    <div onClick={handleLogout} className='flex items-center space-x-2'>
                        <LogOut className="mr-2 w-4 h-4" />
                        <span>Logout</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
