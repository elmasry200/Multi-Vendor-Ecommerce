import React from 'react'
import { Button } from '../ui/button';
import { Loader, Plus } from 'lucide-react';

interface SubmitButtonProps {
    isLoading: boolean;
    buttonTitle: string;
    loadingButtonTitle: string;
}

export default function SubmitButton({
    isLoading=false,
    buttonTitle,
    loadingButtonTitle
}: SubmitButtonProps) {
  return (
    <div>
      {isLoading ? (
        <Button 
        type='submit' 
        className='mt-4 text-white bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 inline-flex items-center'
        >
         <span className="flex items-center space-x-2">
            <Loader className="animate-spin" />
            <span>{loadingButtonTitle}</span>
          </span>
        </Button>
      ):(
        <Button 
        type='submit'
        className=' dark:bg-lime-500'
        >
        <span className="flex items-center space-x-2">
            <Plus />
            <span className='font-medium text-base'>{buttonTitle}</span>
          </span>
        </Button>
      )}
    </div>
  )
}
