
import { getData } from "@/lib/getData"
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";

export default async function SidebarCategories() {
    const categories = await getData('categories');
  return (
    <div className="hidden sm:block sm:col-span-3 bg-white dark:bg-gray-800 border border-gray-300  rounded-lg dark:border-gray-700 text-slate-800 overflow-hidden">
    <h2 className='bg-slate-100 dark:bg-gray-800 dark:border-gray-600 text-slate-800 dark:text-slate-100 py-3 px-6 font-semibold border-b border-gray-300'>
        Shop by Category ({categories.length})
    </h2>
    <div className='py-3 px-6 h-[240px] overflow-y-scroll flex flex-col gap-2'>
        {
            categories.map((category: Prisma.CategoryGetPayload<{}>, i: number) => {
                return (
                    <Link key={i} href="#" className='flex items-center gap-3 hover:bg-slate-50 duration-300 transition-all dark:text-slate-300 dark:hover:bg-slate-600 rounded-md'>
                        <Image src={category.uploadedFiles[0]} width={556} height={556} className='w-10 h-10 rounded-full object-cover border border-lime-300' alt={category.title} />
                        <span className='text-sm'>{category.title}</span>
                    </Link>
                )
            })
        }

    </div>
</div>
  )
}
