import FormHeader from '@/components/backoffice/FormHeader'
import NewCategoryForm from '@/components/backoffice/Forms/NewCategoryForm'
import { getData } from '@/lib/getData';
import React from 'react'

interface CategoryProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateCategory({ params }: CategoryProps) {
  const { id } = await params;
  const category = await getData(`categories/${id}`);
  console.log(category);
  return (
    <div>
      <FormHeader title='Update Category' />

      <NewCategoryForm updateData={category} />
    </div>
  )
}
