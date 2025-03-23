import FormHeader from '@/components/backoffice/FormHeader';
import NewProductForm from '@/components/backoffice/Forms/NewProductForm';
import { getData } from '@/lib/getData';
import { Prisma } from '@prisma/client';
import React from 'react'

interface ProductProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateProduct({ params }: ProductProps) {
  const { id } = await params;
  const product = await getData(`products/${id}`);

  // Categories and Farmers
   const categoriesData = await getData("categories");
    const userData = await getData("users");
    const farmerData = userData.filter((user: Prisma.UserGetPayload<{}>)=> user.role === "FARMER")
  
    const farmers = farmerData.map((farmer: Prisma.UserGetPayload<{}>)=> {
      return {
        id: farmer.id,
        title: farmer.name,
      }
    })
  
    const categories = categoriesData.map((category: Prisma.CategoryGetPayload<{}>)=> {
      return {
        id: category.id,
        title: category.title,
      }
    })

  return (
    <div>
      <FormHeader title='Update Product' />
      <NewProductForm
        updateData={product}
        categories={categories}
        farmers={farmers} />
    </div>
  )
}
