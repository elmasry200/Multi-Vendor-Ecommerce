import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/Forms/NewProductForm";
import { getData } from "@/lib/getData";
import { Prisma } from "@prisma/client"; 

export default async function NewProduct() {
  
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
  //console.log(farmers);
  return (    
    <div>
      <FormHeader title='New Product' />
      <NewProductForm categories={categories} farmers={farmers} />
    </div>
     
  )
}
