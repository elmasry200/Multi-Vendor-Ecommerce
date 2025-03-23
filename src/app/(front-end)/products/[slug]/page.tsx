import Breadcrumb from '@/components/frontend/Breadcrumb';
import CategoryCarousel from '@/components/frontend/CategoryCarousel';
import { getData } from '@/lib/getData';
import { BaggageClaim, Minus, Plus, Send, Share2, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ProductDetailedProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailedProps) {

    const { slug } = await params;

    const category = await getData("categories/67c8d5af2ede46d028e88abe");

    return (
        <div>
            <Breadcrumb />
            <div className="grid grid-cols-12 gap-8">
                <div className='col-span-3'>
                    <Image src='/Butter.webp' alt='Butter' width={556} height={556} className='w-ful' />
                </div>
                <div className='col-span-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl lg:text-3xl font-semibold'>Calabaza Squash product</h2>
                        <button>
                            <Share2 />
                        </button>
                    </div>
                    <div className='border-b border-gray-500'>
                        <p className='py-2'>To keep basil fresh, trim the stems and place them in a glass or jar of water To keep basil fresh, trim the stems and place them in a glass or jar of water</p>
                        <div className='flex items-center gap-8 mb-4'>
                            <p>SKU: 46546546</p>
                            <p className='bg-lime-200 text-slate-900 py-1.5 px-4 rounded-full'><b>Stock</b>: 230</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-4 pt-4 border-b border-gray-500 pb-4'>
                        <div className="flex items-center gap-4">
                            <h4 className='text-2xl'>UGX4000</h4>
                            <del className='text-slate-400 text-sm'>UGX10000</del>
                        </div>
                        <p className='flex items-center'>
                            <Tag className='text-slate-400 w-5 h-5 me-2' />
                            <span>Save 50% right now</span>
                        </p>
                    </div>
                    <div className='flex items-center justify-between py-6'>
                        <div className='flex items-center gap-3 rounded-xl border border-gray-400'>
                            <button className='border-r border-gray-400 py-2 px-4'>
                                <Minus />
                            </button>
                            <p className='flex-grow py-2 px-4'>1</p>
                            <button className='border-l border-gray-400 py-2 px-4'>
                                <Plus />
                            </button>
                        </div>
                        <button className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md">
                            <BaggageClaim />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
                <div className='col-span-3 hidden sm:block bg-white dark:bg-gray-800 border border-gray-300  rounded-lg dark:border-gray-700 text-slate-800 overflow-hidden'>
                    <h2 className='bg-slate-100 dark:bg-gray-800 dark:border-gray-600 text-slate-800 dark:text-slate-100 py-3 px-6 font-semibold border-b border-gray-300'>
                        DELIVERY & RETURNS
                    </h2>

                    <div className="p-4">
                        <div className='flex rounded-lg py-2 px-4 bg-orange-400 text-slate-50 items-center gap-3'>
                            <span>Limi Express</span>
                            <Send />
                        </div>
                        <div className='py-3 text-slate-100 border-b border-gray-500'>
                            Eligible for Free Delivery.
                            <Link href="#">
                                View Details
                            </Link>
                        </div>
                        <h2 className='text-slate-200 py-2 font-normal'>Choose your Location</h2>
                        <div className='pb-3'>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className='pb-3'>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className='pb-3'>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div className='bg-white dark:bg-slate-700 my-8 rounded-lg p-4'>
                <h2 className='mb-4 text-xl font-semibold text-slate-200 ml-3'>Simillar Products</h2>
                <CategoryCarousel products={category.products} />
            </div>
        </div>
    )
}
