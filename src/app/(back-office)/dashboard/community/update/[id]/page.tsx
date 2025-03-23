import FormHeader from '@/components/backoffice/FormHeader';
import NewTrainingForm from '@/components/backoffice/NewTrainingForm';
import { getData } from '@/lib/getData'
import { Prisma } from '@prisma/client';
import React from 'react'

interface TrainingProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateTraining({ params }: TrainingProps) {
  const { id } = await params;
  const training = await getData(`trainings/${id}`);

   const categoriesData = await getData("categories");
    
        const categories = categoriesData.map((category: Prisma.CategoryGetPayload<{}>)=> {
           return {
             id: category.id,
             title: category.title,
           }
         })
  return (
    <div>
      <FormHeader title="Update Training" />
      <NewTrainingForm categories={categories} updateData={training} /> 
    </div>
  )
}
