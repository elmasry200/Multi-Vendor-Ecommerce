import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import Heading from './Heading'

interface PageHeaderProps {
    headingTitle: string;
    pageHref: string;
    linkTitle: string;
}

export default function PageHeader({headingTitle, pageHref, linkTitle}: PageHeaderProps) {
  return (
    <div className="flex justify-between py-4 mb-4">
    <Heading title={headingTitle}/>
    <Link href={pageHref} className="text-white bg-lime-600 hover:bg-lime-600/90 focus:ring-4 focus:outline-none focus:ring-lime-600/50 font-medium rounded-lg text-base px-5 py-3 text-center inline-flex items-center dark:focus:ring-lime-600/50 me-2 mb-2 space-x-3">
    <Plus />
    <span>{linkTitle}</span>
    </Link>
  </div>

  )
}
