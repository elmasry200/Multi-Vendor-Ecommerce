"use client";
import Navbar from '@/components/backoffice/Navbar';
import Sidebar from '@/components/backoffice/Sidebar';
import React, { ReactNode, useState } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* Main Body */}
      <div className={showSidebar ? "sm:ml-64 ml-0 flex-1 bg-slate-100 min-h-screen" : "ml-0 flex-1 bg-slate-100 min-h-screen"}>
        {/* Header */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {/* Main */}
        <main className='p-8 bg-slate-100 dark:bg-slate-900 min-h-screen
                         mt-16'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
