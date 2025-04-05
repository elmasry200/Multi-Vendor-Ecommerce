import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name ?? "Guest";
    return (
    <div>
     <h2> Welcome {name}</h2>
    </div>
  )
}
