import Navbar from '@/components/backoffice/Navbar';
import Sidebar from '@/components/backoffice/Sidebar';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Body */}
      <div className='w-full'>
        {/* Header */}
        <Navbar />
        {/* Main */}
        <main className='ml-60 p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen mt-16'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
